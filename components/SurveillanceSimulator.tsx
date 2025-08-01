import React, { useState, useCallback } from 'react';
import { getSurveillanceAnalysis } from '../services/geminiService';
import { EyeIcon } from './icons';

// Data for simulation using royalty-free stock photos
const targets = [
    { id: 1, name: 'Person A', imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
    { id: 2, name: 'Person B', imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
    { id: 3, name: 'Person C', imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
];

const database = [
    { id: 101, name: 'Citizen 101', imageUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
    { id: 1, name: 'Citizen 102', imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' }, // Match for Person A
    { id: 103, name: 'Citizen 103', imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
    { id: 104, name: 'Citizen 104', imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
    { id: 2, name: 'Citizen 105', imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' }, // Match for Person B
    { id: 106, name: 'Citizen 106', imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
    { id: 3, name: 'Citizen 107', imageUrl: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' }, // Match for Person C
    { id: 108, name: 'Citizen 108', imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1' },
];

type Target = typeof targets[0];
type SimulationResult = {
    target: Target;
    match: Target;
    confidence: number;
    analysis: string;
};

type SimulationState = 'idle' | 'running' | 'complete';

const SurveillanceSimulator: React.FC = () => {
    const [simulationState, setSimulationState] = useState<SimulationState>('idle');
    const [result, setResult] = useState<SimulationResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const runSimulation = useCallback(async (target: Target) => {
        setSimulationState('running');
        setLoading(true);
        setError(null);
        setResult(null);

        // Simulate a delay for the "search"
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            const match = database.find(p => p.id === target.id);
            if (!match) throw new Error("Could not find a match in the database for simulation.");

            const confidence = 92 + Math.random() * 6; // e.g., 92.0 - 98.0
            const scenario = `A facial recognition system was used to identify '${target.name}'. It found a match with '${match.name}' from a citizen database with ${confidence.toFixed(1)}% confidence.`;

            const analysis = await getSurveillanceAnalysis(scenario);

            setResult({
                target,
                match,
                confidence,
                analysis,
            });
            setSimulationState('complete');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred during simulation.');
            setSimulationState('idle');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleReset = () => {
        setSimulationState('idle');
        setResult(null);
        setError(null);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <EyeIcon className="text-sky-400" />
                Surveillance Simulator
            </h2>
            <p className="text-slate-400 mb-8 max-w-3xl">
                This tool demonstrates the power and perils of facial recognition. Select a target to simulate a search against a citizen database. The system will find a match and generate an expert analysis of the technology's implications. 
                <span className="block mt-2 font-semibold text-amber-300">Note: This simulator uses royalty-free stock photos and does not use your camera or any real data.</span>
            </p>
            <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50 min-h-[400px]">
                {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md mb-4">{error}</div>}
                
                {simulationState === 'idle' && <TargetSelectionView onSelectTarget={runSimulation} />}
                {simulationState === 'running' && <LoadingState />}
                {simulationState === 'complete' && result && <ResultView result={result} onReset={handleReset} />}
            </div>
        </div>
    );
};

const TargetSelectionView: React.FC<{onSelectTarget: (target: Target) => void}> = ({ onSelectTarget }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-4">Step 1: Select a Target Individual</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {targets.map(target => (
                <button 
                    key={target.id}
                    onClick={() => onSelectTarget(target)}
                    className="bg-slate-800 p-2 rounded-lg border-2 border-slate-700 hover:border-sky-500 focus:border-sky-500 transition-all text-center group"
                >
                    <img src={target.imageUrl} alt={target.name} className="rounded-md w-full h-auto aspect-square object-cover" />
                    <p className="text-sm text-slate-300 mt-2 font-semibold group-hover:text-sky-400">{target.name}</p>
                </button>
            ))}
        </div>
    </div>
);

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-16">
        <svg className="animate-spin h-10 w-10 text-sky-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-semibold">Running surveillance search...</p>
        <p>Analyzing constitutional implications...</p>
    </div>
);

const ResultView: React.FC<{result: SimulationResult, onReset: () => void}> = ({ result, onReset }) => (
    <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Simulation Complete</h3>
            <button onClick={onReset} className="text-sky-400 hover:text-sky-300 font-semibold">
                &larr; Run New Simulation
            </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div>
                <h4 className="font-semibold text-slate-300 mb-4 text-center">Match Found</h4>
                <div className="flex gap-4 items-center justify-center">
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-400 mb-2">TARGET</p>
                        <img src={result.target.imageUrl} alt={result.target.name} className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover border-4 border-sky-500"/>
                    </div>
                    <div className="text-center text-2xl text-slate-500">&rarr;</div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-400 mb-2">MATCH</p>
                        <img src={result.match.imageUrl} alt={result.match.name} className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover border-4 border-green-500"/>
                    </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg text-center mt-6">
                    <p className="text-sm text-slate-400">Confidence Score</p>
                    <p className="text-3xl font-bold text-green-400">{result.confidence.toFixed(2)}%</p>
                </div>
            </div>
            <div className="prose prose-slate prose-invert max-w-none text-slate-300 leading-relaxed bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                <h4 className="text-lg font-bold !text-sky-400 !mt-0 !mb-4">Expert Analysis</h4>
                <div className="whitespace-pre-wrap">{result.analysis}</div>
            </div>
        </div>
    </div>
);

export default SurveillanceSimulator;