
import React, { useState, useEffect, useCallback } from 'react';
import { getSimulationResponse } from '../services/geminiService';
import type { SimulationStep } from '../types';
import { ShieldIcon } from './icons';

type HistoryItem = { user: string, model: string };

const BackdoorSimulator: React.FC = () => {
    const [step, setStep] = useState<SimulationStep | null>(null);
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const startSimulation = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            setHistory([]);
            const initialStep = await getSimulationResponse([], "Let's begin.");
            setStep(initialStep);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        startSimulation();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChoice = async (choice: string) => {
        try {
            setLoading(true);
            setError(null);
            if(step) {
                const newHistory: HistoryItem[] = [...history, { user: choice, model: step.narrative }];
                setHistory(newHistory);
            }
            const nextStep = await getSimulationResponse(history, choice);
            setStep(nextStep);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <ShieldIcon className="text-sky-400" />
                Backdoor Simulation Framework
            </h2>
            <p className="text-slate-400 mb-8">
                An interactive narrative demonstrating how encryption backdoors can be exploited. Make choices and see the consequences unfold, making abstract crypto concepts tangible.
            </p>

            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50 min-h-[300px] flex flex-col justify-between">
                <div>
                    {loading && !step && <LoadingSkeleton />}
                    {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>}
                    {step && <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{step.narrative}</p>}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                    {loading && step ? (
                         <div className="text-center text-slate-400">Generating consequences...</div>
                    ) : step && step.choices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {step.choices.map((choice, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleChoice(choice)}
                                    disabled={loading}
                                    className="bg-slate-700 text-white font-semibold py-3 px-4 rounded-md text-left hover:bg-sky-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                    ) : (
                         <button
                            onClick={startSimulation}
                            disabled={loading}
                            className="bg-sky-600 text-white font-bold py-2 px-6 rounded-md hover:bg-sky-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            Restart Simulation
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


const LoadingSkeleton: React.FC = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4"></div>
    </div>
);


export default BackdoorSimulator;
