
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getDraftingAdvice } from '../services/geminiService';
import type { DraftingInteraction } from '../types';
import { PenToolIcon } from './icons';

const LegislativeDrafter: React.FC = () => {
    const [history, setHistory] = useState<DraftingInteraction[]>([]);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleSendQuery = useCallback(async () => {
        if (!query.trim()) return;

        const newHistory: DraftingInteraction[] = [...history, { role: 'user', text: query }];
        setHistory(newHistory);
        setQuery('');
        setLoading(true);
        setError(null);

        try {
            const response = await getDraftingAdvice(newHistory, query);
            setHistory(prev => [...prev, { role: 'model', text: response }]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [query, history]);

    return (
        <div className="animate-fade-in h-full flex flex-col">
            <header className="mb-6 flex-shrink-0">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <PenToolIcon className="text-sky-400" />
                    Legislative Drafter's Assistant
                </h2>
                <p className="text-slate-400 mt-2 max-w-3xl">
                    Instead of analyzing bad bills, let's draft better ones. State your policy goal, and the AI will act as an expert counsel, asking critical questions to help you navigate technical and constitutional minefields.
                </p>
            </header>

            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 flex-grow flex flex-col overflow-hidden">
                <div className="flex-grow p-4 md:p-6 space-y-6 overflow-y-auto">
                    {history.length === 0 && (
                        <div className="text-center text-slate-400 p-8">
                            <p className="text-lg font-semibold">Ready to draft better tech policy?</p>
                            <p>Start by entering a goal below, like "Protect children from harmful content online" or "Create a data privacy law for our state."</p>
                        </div>
                    )}
                    {history.map((item, index) => (
                        <div key={index} className={`flex gap-3 ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {item.role === 'model' && <PenToolIcon className="w-8 h-8 flex-shrink-0 text-sky-400 bg-slate-700 p-1.5 rounded-full" />}
                            <div className={`max-w-xl p-4 rounded-xl ${item.role === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                                <p className="whitespace-pre-wrap">{item.text}</p>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-3 justify-start">
                             <PenToolIcon className="w-8 h-8 flex-shrink-0 text-sky-400 bg-slate-700 p-1.5 rounded-full" />
                            <div className="max-w-xl p-4 rounded-xl bg-slate-700 text-slate-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse delay-0"></div>
                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse delay-150"></div>
                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse delay-300"></div>
                                </div>
                            </div>
                        </div>
                    )}
                     {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>}
                    <div ref={chatEndRef} />
                </div>
                <div className="p-4 bg-slate-800 border-t border-slate-700 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSendQuery()}
                            placeholder="State your policy goal..."
                            className="w-full bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                            disabled={loading}
                        />
                        <button onClick={handleSendQuery} disabled={loading || !query.trim()} className="bg-sky-600 text-white font-bold py-3 px-6 rounded-md hover:bg-sky-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegislativeDrafter;
