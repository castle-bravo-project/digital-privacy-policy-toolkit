import React, { useState, useCallback } from 'react';
import { getAgeVerificationExploitAnalysis } from '../services/geminiService';
import { IdCardIcon } from './icons';
import { LightbulbIcon } from './icons';

const verificationMethods = [
    {
        id: 'AGE_GATE',
        name: 'Simple Age Gate',
        description: 'User enters a date of birth in a form.',
        exploits: [
            { id: 'FAKE_DOB', name: 'Enter a Fake Birthdate', description: 'The user simply provides a false date of birth that meets the age requirement.' },
            { id: 'CLIENT_SIDE_MANIPULATION', name: 'Manipulate Client-side Code', description: 'A technically skilled user modifies the website\'s code in their browser to bypass the check.' },
        ]
    },
    {
        id: 'ID_SCAN',
        name: 'ID Document Scan',
        description: 'User uploads a photo of a government-issued ID.',
        exploits: [
            { id: 'AI_FAKE_ID', name: 'Use AI-Generated Fake ID', description: 'The user employs an online service to create a realistic-looking but entirely fabricated ID image.' },
            { id: 'STOLEN_ID', name: 'Use a Real, Stolen ID', description: 'The user submits an image of a real ID belonging to someone else, obtained illicitly.' },
        ]
    },
    {
        id: 'FACIAL_ESTIMATION',
        name: 'Facial Age Estimation',
        description: 'User\'s face is scanned via camera to estimate age using AI.',
        exploits: [
            { id: 'PHOTO_OF_ADULT', name: 'Hold Up a Photo of an Adult', description: 'The user points their camera at a picture of an adult face instead of their own.' },
            { id: 'DEEPFAKE_VIDEO', name: 'Use a Deepfake Video', description: 'An advanced user leverages deepfake technology to present a realistic, animated video of an adult face.' },
        ]
    },
];

type Method = typeof verificationMethods[0];
type Exploit = Method['exploits'][0];

const AgeVerificationSimulator: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
    const [selectedExploit, setSelectedExploit] = useState<Exploit | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectMethod = (method: Method) => {
        setSelectedMethod(method);
        setSelectedExploit(null);
        setAnalysis(null);
        setError(null);
    };

    const handleSelectExploit = useCallback(async (exploit: Exploit) => {
        if (!selectedMethod) return;
        
        setSelectedExploit(exploit);
        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const result = await getAgeVerificationExploitAnalysis(selectedMethod.name, exploit.name);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [selectedMethod]);

    const handleReset = () => {
        setSelectedMethod(null);
        setSelectedExploit(null);
        setAnalysis(null);
        setError(null);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <IdCardIcon className="text-sky-400" />
                Age Verification Exploit Simulator
            </h2>
            <p className="text-slate-400 mb-8 max-w-3xl">
                This tool demonstrates common vulnerabilities in age verification systems. Select a verification method, then choose an exploit to see how it can be bypassed and read an AI-generated security analysis.
                 <span className="block mt-2 font-semibold text-amber-300">This is for educational purposes only. No real data is used or transmitted.</span>
            </p>

            <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50">
                {!selectedMethod ? (
                    <MethodSelectionView onSelect={handleSelectMethod} />
                ) : (
                    <div>
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="text-sm text-slate-400">Selected Method</p>
                                <h3 className="text-xl font-bold text-sky-400">{selectedMethod.name}</h3>
                            </div>
                            <button onClick={handleReset} className="text-sky-400 hover:text-sky-300 font-semibold text-sm">
                                &larr; Choose Different Method
                            </button>
                        </div>
                        <hr className="my-6 border-slate-700" />
                        
                        {!selectedExploit ? (
                             <ExploitSelectionView method={selectedMethod} onSelect={handleSelectExploit} />
                        ) : (
                            <AnalysisView exploit={selectedExploit} analysis={analysis} loading={loading} error={error} />
                        )}

                    </div>
                )}
            </div>
        </div>
    );
};

const MethodSelectionView: React.FC<{onSelect: (method: Method) => void}> = ({ onSelect }) => (
     <div>
        <h3 className="text-lg font-semibold text-white mb-1">Step 1: Choose an Age Verification Method to Test</h3>
        <p className="text-slate-400 mb-6">Each method has different security and privacy trade-offs.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {verificationMethods.map(method => (
                <button key={method.id} onClick={() => onSelect(method)} className="bg-slate-800 p-6 rounded-lg border-2 border-slate-700 hover:border-sky-500 hover:bg-slate-700/50 transition-all text-left flex flex-col h-full">
                    <h4 className="font-bold text-lg text-white mb-2">{method.name}</h4>
                    <p className="text-slate-400 text-sm flex-grow">{method.description}</p>
                </button>
            ))}
        </div>
    </div>
);

const ExploitSelectionView: React.FC<{method: Method, onSelect: (exploit: Exploit) => void}> = ({ method, onSelect }) => (
    <div className="animate-fade-in">
        <h3 className="text-lg font-semibold text-white mb-1">Step 2: Choose an Exploit to Simulate</h3>
        <p className="text-slate-400 mb-6">Select a technique to attempt to bypass the selected verification method.</p>
        <div className="space-y-3">
            {method.exploits.map(exploit => (
                <button key={exploit.id} onClick={() => onSelect(exploit)} className="w-full bg-slate-700/50 p-4 rounded-lg border border-slate-600 hover:border-sky-500 hover:bg-sky-900/20 transition-all text-left">
                     <h4 className="font-semibold text-sky-300">{exploit.name}</h4>
                     <p className="text-sm text-slate-400">{exploit.description}</p>
                </button>
            ))}
        </div>
    </div>
);

const AnalysisView: React.FC<{exploit: Exploit, analysis: string | null, loading: boolean, error: string | null}> = ({ exploit, analysis, loading, error }) => (
    <div className="animate-fade-in">
        <div>
            <p className="text-sm text-slate-400">Selected Exploit</p>
            <h3 className="text-xl font-bold text-amber-400">{exploit.name}</h3>
        </div>
        <div className="mt-6">
            {loading && <LoadingSpinner />}
            {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>}
            {analysis && (
                <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <LightbulbIcon className="text-sky-400" />
                        Security & Privacy Analysis
                    </h4>
                    <div 
                        className="prose prose-slate prose-invert max-w-none text-slate-300 leading-relaxed prose-headings:text-sky-300 prose-strong:text-slate-100" 
                        dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }}
                    />
                </div>
            )}
        </div>
    </div>
);


const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-10">
        <svg className="animate-spin h-8 w-8 text-sky-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-semibold">Generating expert analysis...</p>
    </div>
);

export default AgeVerificationSimulator;