import React, { useState, useCallback } from 'react';
import { getPolicyComparison } from '../services/geminiService';
import type { PolicyComparison, PolicyComparisonSection } from '../types';
import { GlobeIcon, InfoIcon, UserIcon, BriefcaseIcon, GavelIcon } from './icons';

const scenarios = [
    { id: 'data_breach', title: 'A Company Data Breach', description: 'A social media company announces a major data breach affecting millions of users.' },
    { id: 'data_deletion', title: 'Data Deletion Request', description: 'A user requests that a company permanently delete all of their personal data.' },
    { id: 'user_signup', title: 'New User Signup', description: 'A user signs up for a new online service and is presented with a privacy policy.' },
    { id: 'data_portability', title: 'Data Portability Request', description: 'A user wants to move their data (e.g., photos, contacts) from one platform to another.' },
];

const PolicyComparator: React.FC = () => {
    const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
    const [comparison, setComparison] = useState<PolicyComparison | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectScenario = useCallback(async (scenarioTitle: string) => {
        setSelectedScenario(scenarioTitle);
        setLoading(true);
        setError(null);
        setComparison(null);

        try {
            const result = await getPolicyComparison(scenarioTitle);
            setComparison(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleReset = () => {
        setSelectedScenario(null);
        setComparison(null);
        setError(null);
    };

    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-6">
                <GlobeIcon className="text-sky-400" />
                GDPR vs. U.S. Policy Simulator
            </h2>
            <p className="text-slate-400 mb-8 max-w-3xl">
                Compare how different data privacy laws handle real-world situations. Select a scenario to see a side-by-side analysis of user rights, business obligations, and enforcement under the EU's GDPR and the U.S. sector-specific approach.
            </p>

            <div className="bg-slate-800/50 rounded-lg p-6 md:p-8 border border-slate-700/50">
                {loading ? (
                    <LoadingState scenario={selectedScenario} />
                ) : comparison ? (
                    <ResultView comparison={comparison} scenario={selectedScenario} onReset={handleReset} />
                ) : (
                    <ScenarioSelectionView onSelect={handleSelectScenario} />
                )}
                 {error && !loading && (
                    <div className="text-center mt-6">
                        <p className="text-red-400 bg-red-900/50 p-4 rounded-md mb-4">Error: {error}</p>
                        <button onClick={handleReset} className="text-sky-400 hover:text-sky-300 font-semibold">
                            &larr; Try Again
                        </button>
                    </div>
                 )}
            </div>
        </div>
    );
};

const ScenarioSelectionView: React.FC<{onSelect: (title: string) => void}> = ({ onSelect }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-1">Step 1: Choose a Privacy Scenario</h3>
        <p className="text-slate-400 mb-6">See how different legal frameworks apply to these common events.</p>
        <div className="grid md:grid-cols-2 gap-4">
            {scenarios.map(scenario => (
                <button
                    key={scenario.id}
                    onClick={() => onSelect(scenario.title)}
                    className="bg-slate-800 p-6 rounded-lg border-2 border-slate-700 hover:border-sky-500 hover:bg-slate-700/50 transition-all text-left flex flex-col h-full"
                >
                    <h4 className="font-bold text-lg text-white mb-2">{scenario.title}</h4>
                    <p className="text-slate-400 text-sm flex-grow">{scenario.description}</p>
                </button>
            ))}
        </div>
    </div>
);


const LoadingState: React.FC<{scenario: string | null}> = ({ scenario }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-16">
        <svg className="animate-spin h-10 w-10 text-sky-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-lg font-semibold">Generating comparative analysis for:</p>
        <p className="text-sky-300">{scenario}</p>
    </div>
);


const ResultView: React.FC<{comparison: PolicyComparison, scenario: string | null, onReset: () => void}> = ({ comparison, scenario, onReset }) => (
    <div className="animate-fade-in">
        <div className="flex justify-between items-start mb-6">
            <div>
                <p className="text-sm text-slate-400">Analysis For Scenario:</p>
                <h3 className="text-xl font-bold text-white">{scenario}</h3>
            </div>
            <button onClick={onReset} className="text-sky-400 hover:text-sky-300 font-semibold text-sm">
                &larr; Choose Different Scenario
            </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <PolicyColumn title="🇪🇺 GDPR" data={comparison.gdpr} />
            <PolicyColumn title="🇺🇸 U.S. Policy (CCPA Model)" data={comparison.usPolicy} />
        </div>
    </div>
);

const PolicyColumn: React.FC<{title: string, data: PolicyComparisonSection}> = ({ title, data }) => (
    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700/50 space-y-6">
        <h4 className="text-2xl font-bold text-sky-400 text-center mb-4">{title}</h4>
        <AnalysisItem icon={<InfoIcon className="text-blue-400" />} title="Core Principle" text={data.corePrinciple} />
        <AnalysisItem icon={<UserIcon className="text-green-400" />} title="User Rights" text={data.userRights} />
        <AnalysisItem icon={<BriefcaseIcon className="text-amber-400" />} title="Business Obligations" text={data.businessObligations} />
        <AnalysisItem icon={<GavelIcon className="text-red-400" />} title="Potential Enforcement" text={data.enforcement} />
    </div>
);

const AnalysisItem: React.FC<{icon: React.ReactElement<{ className?: string }>, title: string, text: string}> = ({ icon, title, text }) => (
    <div>
        <h5 className="font-semibold text-slate-200 flex items-center gap-2 mb-2">
            {React.cloneElement(icon, { className: `${icon.props.className || ''} w-5 h-5` })}
            {title}
        </h5>
        <p className="text-slate-400 text-sm pl-7 border-l-2 border-slate-700 ml-[10px]">{text}</p>
    </div>
);

export default PolicyComparator;