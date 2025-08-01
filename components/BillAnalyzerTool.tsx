
import React, { useState, useCallback } from 'react';
import { analyzeBill } from '../services/geminiService';
import type { BillAnalysis } from '../types';
import { FileTextIcon, LightbulbIcon, ScaleIcon } from './icons';

const BillAnalyzerTool: React.FC = () => {
    const [billText, setBillText] = useState<string>('');
    const [analysis, setAnalysis] = useState<BillAnalysis | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        if (!billText.trim()) {
            setError('Bill text cannot be empty.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setAnalysis(null);
            const result = await analyzeBill(billText);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [billText]);

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <FileTextIcon className="text-sky-400" />
                Legislative Tracking System
            </h2>
            <p className="text-slate-400 mb-8">
                Paste the text of a bill to receive an AI-powered analysis of its technical feasibility and potential constitutional issues. Helps identify problematic legislation early.
            </p>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 mb-8">
                <label htmlFor="bill-text" className="block text-sm font-medium text-slate-300 mb-2">Legislative Bill Text</label>
                <textarea
                    id="bill-text"
                    value={billText}
                    onChange={(e) => setBillText(e.target.value)}
                    className="w-full h-40 bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="Paste the full text of a bill here..."
                />
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="bg-sky-600 text-white font-bold py-2 px-6 rounded-md hover:bg-sky-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? <Spinner /> : 'Analyze Bill'}
                    </button>
                </div>
            </div>

            {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md mb-8">{error}</div>}
            {loading && <LoadingSkeleton />}
            {analysis && (
                <div className="space-y-6 animate-fade-in">
                    <AnalysisCard title="Summary">
                        <p className="text-slate-300">{analysis.summary}</p>
                    </AnalysisCard>

                    <AnalysisCard title="Technical Claims & Feasibility" icon={<LightbulbIcon className="h-5 w-5 text-amber-400"/>}>
                         <h4 className="font-semibold text-slate-100 mb-2">Key Claims:</h4>
                        <ul className="list-disc list-inside space-y-2 text-slate-300 mb-4">
                           {analysis.technicalClaims.map((claim, i) => <li key={i}>{claim}</li>)}
                        </ul>
                         <h4 className="font-semibold text-slate-100 mb-2">Feasibility Analysis:</h4>
                        <p className="text-slate-300">{analysis.feasibilityAnalysis}</p>
                    </AnalysisCard>
                    
                    <AnalysisCard title="Constitutional Concerns" icon={<ScaleIcon className="h-5 w-5 text-red-400"/>}>
                         <div className="space-y-4">
                            {analysis.constitutionalConcerns.map((concern, i) => (
                                <div key={i} className="border-l-2 border-red-500/50 pl-4">
                                    <h4 className="font-semibold text-slate-100">{concern.issue}</h4>
                                    <p className="text-slate-400">{concern.analysis}</p>
                                </div>
                            ))}
                        </div>
                    </AnalysisCard>
                </div>
            )}
        </div>
    );
};

interface AnalysisCardProps {
    title: string;
    icon?: React.ReactElement;
    children: React.ReactNode;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, icon, children }) => (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <h3 className="text-lg font-bold text-sky-400 mb-4 flex items-center gap-2">
            {icon}
            {title}
        </h3>
        {children}
    </div>
);

const Spinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-6">
        <div className="bg-slate-800/50 p-6 rounded-lg animate-pulse">
            <div className="h-5 w-1/3 bg-slate-700 rounded mb-4"></div>
            <div className="h-4 w-full bg-slate-700 rounded mb-2"></div>
            <div className="h-4 w-4/5 bg-slate-700 rounded"></div>
        </div>
         <div className="bg-slate-800/50 p-6 rounded-lg animate-pulse">
            <div className="h-5 w-1/3 bg-slate-700 rounded mb-4"></div>
            <div className="h-4 w-full bg-slate-700 rounded mb-2"></div>
            <div className="h-4 w-4/5 bg-slate-700 rounded"></div>
        </div>
    </div>
);

export default BillAnalyzerTool;
