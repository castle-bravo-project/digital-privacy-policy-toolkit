import React, { useState, useCallback } from 'react';
import { getMythBusterAnalysis } from '../services/geminiService';
import type { MythBusterAnalysis } from '../types';
import { BombIcon, LightbulbIcon, ScaleIcon, ShieldOffIcon, TimelineIcon } from './icons';

const myths = [
    "Only criminals and terrorists need end-to-end encryption.",
    "Lawful access backdoors won't be exploited by bad guys.",
    "Scanning everyone's messages for illicit content is harmless for the innocent.",
    "If you have nothing to hide, you have nothing to fear from surveillance.",
    "Mandatory age verification is a simple, effective way to protect children online.",
];

const PolicyMythbuster: React.FC = () => {
    const [selectedMyth, setSelectedMyth] = useState<string>(myths[0]);
    const [analysis, setAnalysis] = useState<MythBusterAnalysis | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDebunk = useCallback(async () => {
        setLoading(true);
        setError(null);
        setAnalysis(null);
        try {
            const result = await getMythBusterAnalysis(selectedMyth);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [selectedMyth]);

    const handleReset = () => {
        setAnalysis(null);
        setError(null);
    }

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <BombIcon className="text-sky-400" />
                Policy Mythbuster
            </h2>
            <p className="text-slate-400 mb-8 max-w-3xl">
                Misleading arguments are often used to justify policies that undermine privacy and security. Select a common myth to generate a forceful, evidence-based rebuttal.
            </p>

            {analysis ? (
                <ResultView analysis={analysis} onReset={handleReset} />
            ) : (
                <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50">
                    <label htmlFor="myth-select" className="block text-sm font-medium text-slate-300 mb-2">Select a Myth to Debunk</label>
                    <select
                        id="myth-select"
                        value={selectedMyth}
                        onChange={(e) => setSelectedMyth(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md p-3 text-white focus:ring-2 focus:ring-sky-500"
                    >
                        {myths.map(myth => <option key={myth}>{myth}</option>)}
                    </select>

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleDebunk}
                            disabled={loading}
                            className="bg-red-600 text-white font-bold py-3 px-8 rounded-md hover:bg-red-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-red-500/50"
                        >
                            {loading ? (
                                <>
                                    <Spinner /> Analyzing...
                                </>
                            ) : (
                                <>
                                <BombIcon className="w-5 h-5" />
                                <span>Debunk Myth</span>
                                </>
                            )}
                        </button>
                    </div>
                     {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md mt-6">{error}</div>}
                </div>
            )}
        </div>
    );
};

const ResultView: React.FC<{ analysis: MythBusterAnalysis, onReset: () => void }> = ({ analysis, onReset }) => (
    <div className="animate-fade-in">
        <div className="mb-8 p-6 bg-red-900/30 border border-red-500/50 rounded-lg">
             <p className="text-sm uppercase tracking-wider font-semibold text-red-400">The Myth:</p>
             <p className="text-lg text-slate-300 italic">"{analysis.myth}"</p>
        </div>

        <div className="space-y-6">
            <AnalysisCard icon={<LightbulbIcon className="text-sky-400"/>} title="The Reality">
                {analysis.reality}
            </AnalysisCard>
             <AnalysisCard icon={<ShieldOffIcon className="text-amber-400"/>} title="The Technical Breakdown">
                {analysis.technicalBreakdown}
            </AnalysisCard>
             <AnalysisCard icon={<ScaleIcon className="text-blue-400"/>} title="The Ethical & Legal Fallout">
                {analysis.ethicalFallout}
            </AnalysisCard>
             <AnalysisCard icon={<TimelineIcon className="text-purple-400"/>} title="The Historical Precedent">
                {analysis.precedent}
            </AnalysisCard>
        </div>
        
        <button onClick={onReset} className="mt-8 text-sky-400 hover:text-sky-300 font-semibold">
            &larr; Debunk another myth
        </button>
    </div>
);

const AnalysisCard: React.FC<{ icon: React.ReactElement<{ className?: string }>; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-sky-300 mb-4 flex items-center gap-3">
            {React.cloneElement(icon, { className: `${icon.props.className || ''} w-6 h-6` })}
            {title}
        </h3>
        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{children}</p>
    </div>
);

const Spinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default PolicyMythbuster;