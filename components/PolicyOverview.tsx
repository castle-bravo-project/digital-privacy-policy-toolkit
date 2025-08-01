import React from 'react';
import { ShieldOffIcon, AlertTriangleIcon, ScaleIcon } from './icons';

const PolicyOverview: React.FC = () => {
    return (
        <div className="animate-fade-in">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-3">Digital Integrity Dossier</h1>
                <p className="text-lg text-slate-400 max-w-4xl mx-auto">
                    An expert analysis of policies that threaten the security and liberty of the digital world.
                </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Column 1: Encryption Backdoors */}
                <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 border border-slate-700/50">
                    <h2 className="text-2xl font-bold text-sky-400 mb-8 text-center">The Assault on Encryption</h2>
                    <div className="space-y-8">
                        <AnalysisSection
                            icon={<AlertTriangleIcon className="text-amber-400 w-8 h-8"/>}
                            title="The Technical Flaw"
                            subtitle="A 'Golden Key' for One is a Golden Key for All"
                            text="Proposals for 'lawful access' or 'encryption backdoors' are based on a fundamental misunderstanding of cryptography. There is no way to build a special access mechanism that only 'good guys' can use. A key that can bypass encryption is a universal key, and its existence creates a single point of failure that is mathematically guaranteed to be discovered and exploited by adversaries."
                        />
                        <AnalysisSection
                            icon={<ShieldOffIcon className="text-red-500 w-8 h-8"/>}
                            title="The Security Catastrophe"
                            subtitle="Mandating Insecurity by Design"
                            text="Implementing a backdoor intentionally weakens the security of all communications for every citizen, business, and government agency. It turns secure platforms into high-value targets for hostile nation-states, organized crime, and terrorists, effectively handing them the tools to conduct mass surveillance and espionage on an unprecedented scale."
                        />
                         <AnalysisSection
                            icon={<ScaleIcon className="text-blue-400 w-8 h-8"/>}
                            title="The Constitutional Crisis"
                            subtitle="Gutting the Fourth and First Amendments"
                            text="Mandating backdoors enables general warrants, allowing for the search of anyone's digital life without specific cause, a direct violation of Fourth Amendment protections against unreasonable searches. It also creates a chilling effect on free speech, as whistleblowers, journalists, and activists can no longer rely on secure communications, undermining the principles of the First Amendment."
                        />
                    </div>
                </div>

                {/* Column 2: Mandatory Age Verification */}
                <div className="bg-slate-800/50 rounded-xl p-6 md:p-8 border border-slate-700/50">
                    <h2 className="text-2xl font-bold text-sky-400 mb-8 text-center">The Illusion of Age Verification</h2>
                     <div className="space-y-8">
                        <AnalysisSection
                            icon={<AlertTriangleIcon className="text-amber-400 w-8 h-8"/>}
                            title="The Technical Flaw"
                            subtitle="An Unsolvable and Easily Bypassed Problem"
                            text="There is no foolproof method to verify age online that isn't either trivially easy to bypass (e.g., lying on a form) or monstrously invasive. Proposed solutions require creating centralized databases of citizen data (e.g., ID scans, biometrics), which are themselves prime targets for data breaches. Determined users will always find ways around these systems using VPNs, fake IDs, or borrowed credentials."
                        />
                        <AnalysisSection
                            icon={<ShieldOffIcon className="text-red-500 w-8 h-8"/>}
                            title="The Security Catastrophe"
                            subtitle="Creating a Honeypot for Identity Thieves"
                            text="Mandating that every citizen submit identity documents to access parts of the internet would create the largest, most valuable repository of personal information in history. The security track record of both government and private entities proves that such a database would inevitably be breached, exposing millions to catastrophic identity theft, financial fraud, and personal blackmail."
                        />
                         <AnalysisSection
                            icon={<ScaleIcon className="text-blue-400 w-8 h-8"/>}
                            title="The Constitutional Crisis"
                            subtitle="Destroying Anonymity and Enabling Tracking"
                            text="Mandatory age verification systems destroy the right to anonymous speech, a cornerstone of political dissent and personal exploration online. By linking a real-world identity to every online action, these systems create a permanent, searchable record of a person's life, chilling expression and creating a powerful new tool for state surveillance and social control."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface AnalysisSectionProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    text: string;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ icon, title, subtitle, text }) => (
    <div className="flex gap-6">
        <div className="flex-shrink-0 pt-1">{icon}</div>
        <div>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
            <p className="font-semibold text-sky-400 mb-2">{subtitle}</p>
            <p className="text-slate-300 leading-relaxed">
                {text}
            </p>
        </div>
    </div>
);


export default PolicyOverview;