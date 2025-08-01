
import React from 'react';
import { Tool } from '../types';
import { 
    TimelineIcon, CodeIcon, FileTextIcon, ShieldIcon, WandIcon, EyeIcon, 
    IdCardIcon, GlobeIcon, BombIcon, BookOpenIcon, ScanLineIcon, 
    GitBranchIcon, PenToolIcon, ClipboardCheckIcon, SettingsIcon, ExternalLinkIcon
} from './icons';
import { CastleBravoLogo } from './CastleBravoLogo';

interface SidebarProps {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
}

const toolCategories = [
    {
        name: 'Simulations',
        tools: [
            { id: Tool.CSS_SIMULATOR, name: 'CSS Simulator', icon: ScanLineIcon },
            { id: Tool.AI_BIAS_SIMULATOR, name: 'AI Bias Simulator', icon: GitBranchIcon },
            { id: Tool.SIMULATOR, name: 'Backdoor Simulator', icon: ShieldIcon },
            { id: Tool.SURVEILLANCE_SIMULATOR, name: 'Surveillance Simulator', icon: EyeIcon },
            { id: Tool.AGE_VERIFICATION_SIMULATOR, name: 'Age Exploit Simulator', icon: IdCardIcon },
        ]
    },
    {
        name: 'Analysis & Drafting',
        tools: [
            { id: Tool.LEGISLATIVE_DRAFTER, name: 'Legislative Drafter', icon: PenToolIcon },
            { id: Tool.PRIVACY_POLICY_GRADER, name: 'Policy Grader', icon: ClipboardCheckIcon },
            { id: Tool.REPORT_GENERATOR, name: 'Analysis & Reports', icon: WandIcon },
            { id: Tool.BILL_ANALYZER, name: 'Bill Analyzer', icon: FileTextIcon },
            { id: Tool.TRANSLATOR, name: 'Tech Translator', icon: CodeIcon },
        ]
    },
    {
        name: 'Reference',
        tools: [
            { id: Tool.POLICY_DOSSIER, name: 'Policy Dossier', icon: BookOpenIcon },
            { id: Tool.POLICY_MYTHBUSTER, name: 'Policy Mythbuster', icon: BombIcon },
            { id: Tool.POLICY_COMPARATOR, name: 'GDPR vs. US Simulator', icon: GlobeIcon },
            { id: Tool.TIMELINE, name: 'Breach Timeline', icon: TimelineIcon },
        ]
    }
];

const referenceLinks = [
    { name: 'Take Action on EARN IT', href: 'https://act.eff.org/action/stop-the-earn-it-act', icon: ExternalLinkIcon },
    { name: 'Defend Digital Rights', href: 'https://www.eff.org/issues/privacy', icon: ExternalLinkIcon },
    { name: 'View on GitHub', href: 'https://github.com/castle-bravo-project', icon: ExternalLinkIcon },
];


const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
            <nav className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                {toolCategories.map((category) => (
                    <div key={category.name}>
                        <h2 className="px-3 text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{category.name}</h2>
                        {category.tools.map((tool) => (
                            <button
                                key={tool.id}
                                onClick={() => setActiveTool(tool.id)}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-left text-sm font-medium transition-all duration-150 w-full ${
                                    activeTool === tool.id
                                        ? 'bg-sky-500 text-white shadow-lg'
                                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                                }`}
                            >
                                <tool.icon className="h-5 w-5 flex-shrink-0" />
                                <span>{tool.name}</span>
                            </button>
                        ))}
                    </div>
                ))}
                
                 <div>
                    <h2 className="px-3 text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">External Resources</h2>
                    {referenceLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 px-3 py-2 rounded-md text-left text-sm font-medium transition-all duration-150 text-slate-300 hover:bg-slate-700/50 hover:text-white w-full"
                        >
                            <link.icon className="h-5 w-5 flex-shrink-0" />
                            <span>{link.name}</span>
                        </a>
                    ))}
                </div>

                 <div>
                    <h2 className="px-3 text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-2">Application</h2>
                    <button
                        key={Tool.SETTINGS}
                        onClick={() => setActiveTool(Tool.SETTINGS)}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-left text-sm font-medium transition-all duration-150 w-full ${
                            activeTool === Tool.SETTINGS
                                ? 'bg-sky-500 text-white shadow-lg'
                                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                    >
                        <SettingsIcon className="h-5 w-5 flex-shrink-0" />
                        <span>Settings</span>
                    </button>
                </div>
            </nav>
            <div className="mt-auto pt-4 border-t border-slate-700/50">
                <CastleBravoLogo />
            </div>
        </aside>
    );
};

export default Sidebar;