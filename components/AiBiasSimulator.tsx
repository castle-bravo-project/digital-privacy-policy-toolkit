import React, { useState, useCallback } from 'react';
import { getAiBiasAnalysis } from '../services/geminiService';
import type { AiBiasAnalysis } from '../types';
import { GitBranchIcon, AlertTriangleIcon, LightbulbIcon, ShieldIcon } from './icons';

const profiles = [
    { id: 1, name: 'Alex', history: 'Minor theft, 5 years ago.', demographic: 'From over-policed Neighborhood A' },
    { id: 2, name: 'Ben', history: 'Minor theft, 5 years ago.', demographic: 'From under-policed Neighborhood B' },
    { id: 3, name: 'Chris', history: 'No prior record.', demographic: 'From over-policed Neighborhood A' },
];

type SimulationState = 'idle' | 'running' | 'complete';
type DatasetChoice = 'skewed' | 'balanced';

const AiBiasSimulator: React.FC = () => {
    const [state, setState] = useState<SimulationState>('idle');
    const [dataset, setDataset] = useState<DatasetChoice | null>(null);
    const [analysis, setAnalysis] = useState<AiBiasAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRunSimulation = useCallback(async (choice: DatasetChoice) => {
        setState('running');
        setDataset(choice);
        setError(null);
        setAnalysis(null);

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI training

        try {
            const outcome = choice === 'skewed'
                ? "The AI flagged individuals from Neighborhood A as high-risk, regardless of their actual criminal history, because it learned to associate that location with arrests."
                : "The AI assessed individuals based primarily on their specific criminal history, leading to more equitable risk assessments across neighborhoods.";
            
            const result = await getAiBiasAnalysis(choice, outcome);
            setAnalysis(result);
            setState('complete');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setState('idle');
        }
    }, []);

    const handleReset = () => {
        setState('idle');
        setDataset(null);
        setAnalysis(null);
        setError(null);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <GitBranchIcon className="text-sky-400" />
                AI Governance & Bias Simulator
            </h2>
            <p className="text-slate-400 mb-8 max-w-3xl">
                This tool demonstrates how AI can inherit and amplify human biases. You are deploying an AI to predict recidivism risk. Choose a dataset to train it on and see how that choice leads to discriminatory outcomes.
            </p>

            <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50">
                {state === 'idle' && <DatasetSelection onSelect={handleRunSimulation} />}
                
                {state === 'running' && <LoadingState />}
                
                {state === 'complete' && dataset && analysis && (
                    <ResultView dataset={dataset} analysis={analysis} onReset={handleReset} />
                )}

                {error && (
                    <div className="mt-6 text-red-400 bg-red-900/50 p-4 rounded-md text-center">
                        <p className="font-bold">Analysis Failed</p>
                        <p>{error}</p>
                         <button onClick={handleReset} className="mt-2 text-sky-400 hover:text-sky-300 font-semibold">&larr; Reset</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const DatasetSelection: React.FC<{onSelect: (choice: DatasetChoice) => void}> = ({ onSelect }) => (
    <div className="animate-fade-in">
        <h3 className="text-lg font-semibold text-white mb-2">Step 1: Choose a Dataset to Train Your AI</h3>
        <p className="text-slate-400 mb-6">The data you feed the AI will determine its behavior.</p>
        <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => onSelect('skewed')} className="bg-slate-800 p-6 rounded-lg border-2 border-slate-700 hover:border-amber-500 hover:bg-slate-700/50 transition-all text-left">
                <h4 className="font-bold text-lg text-amber-400 mb-2">Skewed Dataset</h4>
                <p className="text-slate-400 text-sm">Contains historical arrest data primarily from one low-income, over-policed neighborhood. It lacks data on white-collar crime from other areas.</p>
                <div className="mt-4 text-xs text-amber-500/80 font-semibold">WARNING: This data reflects existing societal biases.</div>
            </button>
            <button onClick={() => onSelect('balanced')} className="bg-slate-800 p-6 rounded-lg border-2 border-slate-700 hover:border-green-500 hover:bg-slate-700/50 transition-all text-left">
                <h4 className="font-bold text-lg text-green-400 mb-2">Balanced Dataset</h4>
                <p className="text-slate-400 text-sm">Contains data that has been carefully audited and balanced to represent various crime types from all neighborhoods proportionally.</p>
                 <div className="mt-4 text-xs text-green-500/80 font-semibold">NOTE: This is an idealized dataset that is difficult to create in reality.</div>
            </button>
        </div>
    </div>
);

const LoadingState: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-slate-400 py-16">
        <svg className="animate-spin h-10 w-10 text-sky-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-semibold">Training AI model and running analysis...</p>
        <p>"Garbage in, garbage out."</p>
    </div>
);

const ResultView: React.FC<{ dataset: DatasetChoice, analysis: AiBiasAnalysis, onReset: () => void }> = ({ dataset, analysis, onReset }) => (
    <div className="animate-fade-in">
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white">Simulation Complete</h3>
            <button onClick={onReset} className="text-sky-400 hover:text-sky-300 font-semibold text-sm">
                &larr; Run New Simulation
            </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
            <div>
                 <h4 className="font-semibold text-white mb-2 text-center">AI Verdicts on Test Cases</h4>
                 <p className="text-sm text-slate-400 mb-4 text-center">Based on the <span className={`font-bold ${dataset === 'skewed' ? 'text-amber-400' : 'text-green-400'}`}>{dataset} dataset</span>.</p>
                <div className="space-y-3">
                    {profiles.map(p => (
                        <div key={p.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                             <div className="flex justify-between items-center">
                                 <div>
                                    <p className="font-bold text-slate-200">{p.name}</p>
                                    <p className="text-xs text-slate-400">{p.demographic}</p>
                                    <p className="text-xs text-slate-400">History: {p.history}</p>
                                </div>
                                <div className={`text-center px-3 py-1 rounded-md text-sm font-bold ${
                                    dataset === 'skewed' && p.demographic.includes('Neighborhood A') ? 'bg-red-500/80 text-white' : 'bg-green-500/80 text-white'
                                }`}>
                                    {dataset === 'skewed' && p.demographic.includes('Neighborhood A') ? 'High Risk' : 'Low Risk'}
                                </div>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="space-y-4">
                <AnalysisCard icon={<AlertTriangleIcon className="text-amber-400" />} title="Why This Happened" text={analysis.explanation} />
                <AnalysisCard icon={<LightbulbIcon className="text-blue-400" />} title="The Feedback Loop" text={analysis.feedbackLoop} />
                <AnalysisCard icon={<ShieldIcon className="text-green-400" />} title="A Better Approach" text={analysis.solution} />
            </div>
        </div>
    </div>
);

const AnalysisCard: React.FC<{ icon: React.ReactElement<{ className?: string }>, title: string, text: string }> = ({ icon, title, text }) => (
    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
        <div className="flex items-center gap-3 mb-2">
            {React.cloneElement(icon, { className: `${icon.props.className || ''} w-5 h-5 flex-shrink-0` })}
            <h4 className="text-md font-bold text-sky-300">{title}</h4>
        </div>
        <p className="text-slate-300 text-sm">{text}</p>
    </div>
);

export default AiBiasSimulator;