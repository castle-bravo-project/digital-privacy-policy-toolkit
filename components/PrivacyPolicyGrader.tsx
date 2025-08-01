
import React, { useState, useCallback } from 'react';
import { gradePrivacyPolicy } from '../services/geminiService';
import type { PrivacyPolicyGrade } from '../types';
import { ClipboardCheckIcon } from './icons';

const PrivacyPolicyGrader: React.FC = () => {
    const [policyText, setPolicyText] = useState<string>('');
    const [grade, setGrade] = useState<PrivacyPolicyGrade | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGradePolicy = useCallback(async () => {
        if (!policyText.trim()) {
            setError('Policy text cannot be empty.');
            return;
        }
        setLoading(true);
        setError(null);
        setGrade(null);
        try {
            const result = await gradePrivacyPolicy(policyText);
            setGrade(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [policyText]);

    const handleReset = () => {
        setPolicyText('');
        setGrade(null);
        setError(null);
    };
    
    const gradeColor = (g: string | undefined) => {
        switch(g) {
            case 'A': return 'text-green-400';
            case 'B': return 'text-lime-400';
            case 'C': return 'text-yellow-400';
            case 'D': return 'text-amber-400';
            case 'F': return 'text-red-400';
            default: return 'text-slate-400';
        }
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <ClipboardCheckIcon className="text-sky-400" />
                Privacy Policy Grader
            </h2>
            <p className="text-slate-400 mb-8 max-w-3xl">
                Privacy policies are designed to be unreadable. This tool fixes that. Paste a policy's text below to get an instant, AI-generated "nutrition label" that grades it on key privacy-respecting metrics.
            </p>

            {grade ? (
                <ResultView grade={grade} onReset={handleReset} gradeColor={gradeColor} />
            ) : (
                <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50">
                    <label htmlFor="policy-text" className="block text-sm font-medium text-slate-300 mb-2">Paste Privacy Policy Text Here</label>
                    <textarea
                        id="policy-text"
                        value={policyText}
                        onChange={(e) => setPolicyText(e.target.value)}
                        className="w-full h-64 bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                        placeholder="e.g., 'We collect your name, email, location, browsing history...'"
                        disabled={loading}
                    />
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleGradePolicy}
                            disabled={loading || !policyText.trim()}
                            className="bg-sky-600 text-white font-bold py-3 px-8 rounded-md hover:bg-sky-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <Spinner /> : 'Grade Policy'}
                        </button>
                    </div>
                     {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md mt-6">{error}</div>}
                </div>
            )}
        </div>
    );
};

const ResultView: React.FC<{ grade: PrivacyPolicyGrade, onReset: () => void, gradeColor: (g:string) => string }> = ({ grade, onReset, gradeColor }) => (
    <div className="animate-fade-in bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-white">Privacy Report Card</h3>
            <button onClick={onReset} className="text-sky-400 hover:text-sky-300 font-semibold text-sm">
                &larr; Grade Another Policy
            </button>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 text-center bg-slate-900/50 p-6 rounded-lg flex flex-col justify-center items-center">
                <p className="text-slate-400 text-lg">Overall Grade</p>
                <p className={`text-8xl font-bold ${gradeColor(grade.overallGrade)}`}>{grade.overallGrade}</p>
                <p className="text-slate-300 mt-4 text-sm">{grade.gradeReasoning}</p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {grade.sections.map(section => (
                    <div key={section.title} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <h4 className="font-semibold text-sky-300 mb-1">{section.title}</h4>
                        <div className="text-2xl font-bold text-slate-200 mb-2">{section.score}<span className="text-base text-slate-400">/10</span></div>
                        <p className="text-xs text-slate-400">{section.analysis}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Spinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default PrivacyPolicyGrader;
