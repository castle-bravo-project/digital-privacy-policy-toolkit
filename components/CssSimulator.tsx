import React, { useState, useCallback } from 'react';
import { getCssAnalysis } from '../services/geminiService';
import type { CssSimulationAnalysis } from '../types';
import { ScanLineIcon, AlertTriangleIcon, ShieldOffIcon, LightbulbIcon } from './icons';

const photos = [
    { id: 1, url: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', alt: 'Man smiling' },
    { id: 2, url: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', alt: 'Family at a table' },
    { id: 3, url: 'https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', alt: 'Person holding a book' },
    { id: 4, url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', alt: 'Portrait of a man' },
    { id: 5, url: 'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', alt: 'Man in a neon light' },
    { id: 6, url: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=1', alt: 'Man in a suit' },
];
const falsePositivePhotoId = 2; // The family photo will trigger the false positive

type SimulationState = 'idle' | 'scanning' | 'flagged' | 'analyzed';

const CssSimulator: React.FC = () => {
    const [state, setState] = useState<SimulationState>('idle');
    const [analysis, setAnalysis] = useState<CssSimulationAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRunScan = useCallback(async () => {
        setState('scanning');
        setError(null);
        setAnalysis(null);

        await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate scanning delay
        
        setState('flagged');
        
        try {
            const result = await getCssAnalysis();
            setAnalysis(result);
            setState('analyzed');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setState('flagged');
        }
    }, []);

    const handleReset = () => {
        setState('idle');
        setAnalysis(null);
        setError(null);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <ScanLineIcon className="text-sky-400" />
                Client-Side Scanning (CSS) Simulator
            </h2>
            <p className="text-slate-400 mb-8 max-w-3xl">
                This tool demonstrates how government-mandated client-side scanning works and why it's a catastrophic threat to privacy. It simulates scanning your "private" photos, finding a "false positive," and automatically reporting you to the authorities.
                <span className="block mt-2 font-semibold text-amber-300">Note: This is a simulation. No real scanning occurs, and no data leaves your browser.</span>
            </p>

            <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-white">Your "Private" Phone Photos</h3>
                    <p className="text-sm text-slate-400">This is a representation of personal photos stored securely on your device.</p>
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                    {photos.map(photo => (
                        <div key={photo.id} className="relative aspect-square">
                            <img src={photo.url} alt={photo.alt} className="w-full h-full object-cover rounded-md" />
                            {state === 'scanning' && <div className="absolute inset-0 bg-sky-500/30 animate-pulse"></div>}
                            {state === 'flagged' && photo.id === falsePositivePhotoId && <div className="absolute inset-0 bg-red-500/70 ring-4 ring-red-400 rounded-md flex items-center justify-center text-white font-bold">FLAGGED</div>}
                            {state === 'analyzed' && photo.id === falsePositivePhotoId && <div className="absolute inset-0 bg-red-500/70 ring-4 ring-red-400 rounded-md flex items-center justify-center text-white font-bold">REPORTED</div>}
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    {state === 'idle' && (
                        <button onClick={handleRunScan} className="bg-sky-600 text-white font-bold py-3 px-8 rounded-md hover:bg-sky-500 transition-colors shadow-lg hover:shadow-sky-500/50 flex items-center justify-center gap-2 mx-auto">
                            <ScanLineIcon />
                            Run Mandated Security Scan
                        </button>
                    )}

                    {state === 'scanning' && (
                        <div className="text-sky-300 animate-pulse">Scanning photos against secret government blocklist...</div>
                    )}

                    {state === 'flagged' && !analysis && (
                        <div className="text-amber-300">Generating expert analysis of the privacy violation...</div>
                    )}
                </div>

                {state === 'flagged' && !analysis && !error && (
                    <div className="mt-6 text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                        <p className="font-bold">FALSE POSITIVE DETECTED!</p>
                        <p>An innocent family photo has been algorithmically flagged. This photo, and your personal data, are being prepared for submission to a government server.</p>
                    </div>
                )}
                
                {state === 'analyzed' && analysis && (
                    <div className="animate-fade-in mt-6 space-y-6">
                         <div className="text-center text-red-400 bg-red-900/50 p-4 rounded-lg">
                            <p className="font-bold">REPORT SENT!</p>
                            <p>Your photo and metadata have been reported to the authorities without a warrant. You are now in a permanent government database.</p>
                        </div>
                        <h3 className="text-xl font-bold text-white text-center mt-8">Expert Analysis of the Incident</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <AnalysisCard icon={<AlertTriangleIcon className="text-red-400" />} title="The Privacy Failure" text={analysis.privacyFailure} />
                            <AnalysisCard icon={<ShieldOffIcon className="text-amber-400" />} title="The Technical Vulnerability" text={analysis.technicalVulnerability} />
                            <AnalysisCard icon={<LightbulbIcon className="text-blue-400" />} title="The Chilling Effect" text={analysis.chillingEffect} />
                        </div>
                        <div className="text-center mt-4">
                            <button onClick={handleReset} className="text-sky-400 hover:text-sky-300 font-semibold">&larr; Run Simulation Again</button>
                        </div>
                    </div>
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

const AnalysisCard: React.FC<{ icon: React.ReactElement<{ className?: string }>, title: string, text: string }> = ({ icon, title, text }) => (
    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
        <div className="flex items-center gap-3 mb-3">
            {React.cloneElement(icon, { className: `${icon.props.className || ''} w-6 h-6 flex-shrink-0` })}
            <h4 className="text-lg font-bold text-sky-300">{title}</h4>
        </div>
        <p className="text-slate-300 text-sm">{text}</p>
    </div>
);


export default CssSimulator;