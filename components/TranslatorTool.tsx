
import React, { useState, useCallback } from 'react';
import { translateText } from '../services/geminiService';
import { CodeIcon } from './icons';

const TranslatorTool: React.FC = () => {
    const [inputText, setInputText] = useState<string>(`In cryptography, "key escrow" is a system where the keys needed to decrypt encrypted data are held by a trusted third party. While intended for authorized access, it creates a single point of failure; if the escrow is compromised, all secured data becomes vulnerable. This is analogous to giving a copy of your house key to a security company—if they get robbed, your house is no longer secure.`);
    const [audience, setAudience] = useState<string>('Policymaker');
    const [translatedText, setTranslatedText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleTranslate = useCallback(async () => {
        if (!inputText.trim()) {
            setError('Input text cannot be empty.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setTranslatedText('');
            const result = await translateText(inputText, audience);
            setTranslatedText(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [inputText, audience]);

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <CodeIcon className="text-sky-400" />
                Technical Translation Engine
            </h2>
            <p className="text-slate-400 mb-8">
                Convert complex crypto/privacy concepts into clear language for different audiences. This tool helps bridge the communication gap between technical experts and decision-makers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                    <label htmlFor="input-text" className="block text-sm font-medium text-slate-300 mb-2">Technical Text</label>
                    <textarea
                        id="input-text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full h-48 bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                        placeholder="Paste technical text here..."
                    />
                    <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center">
                        <div>
                            <label htmlFor="audience" className="block text-sm font-medium text-slate-300 mb-1">Target Audience</label>
                             <select
                                id="audience"
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                                className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-sky-500"
                            >
                                <option>Policymaker</option>
                                <option>Journalist</option>
                                <option>High School Student</option>
                                <option>General Public</option>
                            </select>
                        </div>
                        <button
                            onClick={handleTranslate}
                            disabled={loading}
                            className="w-full sm:w-auto mt-4 sm:mt-0 ml-auto bg-sky-600 text-white font-bold py-2 px-6 rounded-md hover:bg-sky-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Spinner /> Translating...
                                </>
                            ) : 'Translate'}
                        </button>
                    </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-2">Translated Output</h3>
                    {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-md text-sm">{error}</div>}
                    {loading && (
                        <div className="space-y-3 animate-pulse mt-4">
                            <div className="h-4 bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                            <div className="h-4 bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                        </div>
                    )}
                    {translatedText && (
                        <div className="prose prose-invert prose-sm text-slate-300 max-w-none whitespace-pre-wrap">{translatedText}</div>
                    )}
                     {!loading && !translatedText && !error && <p className="text-slate-500">Translation will appear here.</p>}
                </div>
            </div>
        </div>
    );
};

const Spinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export default TranslatorTool;
