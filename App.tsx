
import React, { useState } from 'react';
import { Tool } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BreachTimeline from './components/BreachTimeline';
import TranslatorTool from './components/TranslatorTool';
import BillAnalyzerTool from './components/BillAnalyzerTool';
import BackdoorSimulator from './components/BackdoorSimulator';
import ReportGeneratorTool from './components/ReportGeneratorTool';
import SurveillanceSimulator from './components/SurveillanceSimulator';
import AgeVerificationSimulator from './components/AgeVerificationSimulator';
import PolicyComparator from './components/PolicyComparator';
import PolicyMythbuster from './components/PolicyMythbuster';
import PolicyOverview from './components/PolicyOverview';
import CssSimulator from './components/CssSimulator';
import AiBiasSimulator from './components/AiBiasSimulator';
import LegislativeDrafter from './components/LegislativeDrafter';
import PrivacyPolicyGrader from './components/PrivacyPolicyGrader';
import Settings from './components/Settings';

const App: React.FC = () => {
    const [activeTool, setActiveTool] = useState<Tool>(Tool.CSS_SIMULATOR);

    const renderTool = () => {
        switch (activeTool) {
            case Tool.POLICY_DOSSIER:
                return <PolicyOverview />;
            case Tool.REPORT_GENERATOR:
                return <ReportGeneratorTool />;
            case Tool.TIMELINE:
                return <BreachTimeline />;
            case Tool.TRANSLATOR:
                return <TranslatorTool />;
            case Tool.BILL_ANALYZER:
                return <BillAnalyzerTool />;
            case Tool.SIMULATOR:
                return <BackdoorSimulator />;
            case Tool.SURVEILLANCE_SIMULATOR:
                return <SurveillanceSimulator />;
            case Tool.AGE_VERIFICATION_SIMULATOR:
                return <AgeVerificationSimulator />;
            case Tool.POLICY_COMPARATOR:
                return <PolicyComparator />;
            case Tool.POLICY_MYTHBUSTER:
                return <PolicyMythbuster />;
            case Tool.CSS_SIMULATOR:
                return <CssSimulator />;
            case Tool.AI_BIAS_SIMULATOR:
                return <AiBiasSimulator />;
            case Tool.LEGISLATIVE_DRAFTER:
                return <LegislativeDrafter />;
            case Tool.PRIVACY_POLICY_GRADER:
                return <PrivacyPolicyGrader />;
            case Tool.SETTINGS:
                return <Settings />;
            default:
                return <CssSimulator />;
        }
    };

    return (
        <div className="h-screen bg-slate-900 text-slate-200 flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
                <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                    {renderTool()}
                </main>
            </div>
        </div>
    );
};

export default App;