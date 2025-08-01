import React, { useCallback, useState } from 'react';
import { exampleReportHtml } from '../data/exampleReport';
import { analyzeBill, translateAnalysisToStructuredReport } from '../services/geminiService';
import type { BillAnalysis, GeneratedReport } from '../types';
import { DownloadIcon, InfoIcon, LightbulbIcon, MarkdownIcon, ScaleIcon, ShieldOffIcon, WandIcon } from './icons';

declare global {
    interface Window {
        html2pdf: any;
    }
}

const ReportGeneratorTool: React.FC = () => {
    const [billText, setBillText] = useState<string>('');
    const [audience, setAudience] = useState<string>('Policymaker');
    const [report, setReport] = useState<GeneratedReport | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [showExample, setShowExample] = useState(false);


    const handleGenerateReport = useCallback(async () => {
        if (!billText.trim()) {
            setError('Bill text cannot be empty.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            setReport(null);

            // Step 1: Get the raw analysis
            const analysis: BillAnalysis = await analyzeBill(billText);
            
            // Step 2: Translate the raw analysis into a structured, audience-appropriate report
            const structuredReport = await translateAnalysisToStructuredReport(analysis, audience);

            // Step 3: Assemble the final report
            setReport({
                originalAnalysis: analysis,
                structuredReport,
                audience,
            });

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    }, [billText, audience]);
    
    const handleExportMD = () => {
        if (!report) return;

        const { structuredReport, originalAnalysis, audience } = report;

        const mdContent = `
# Policy Analysis Report for: ${audience}

## Executive Summary
${structuredReport.executiveSummary}

## The Bottom Line: An Analogy
> ${structuredReport.analogyForLayman}

---

## Technical Analysis

### What the Bill Requires
${structuredReport.technicalAnalysis.keyClaimsSimplified}

### Is it Technically Possible?
${structuredReport.technicalAnalysis.feasibilityAssessment}

### Security & Privacy Risks
${structuredReport.technicalAnalysis.risksAndFlaws}

---

## Constitutional Impact
${structuredReport.constitutionalImpact.map(concern => `
### ${concern.issue}
${concern.analysis}
`).join('\n')}

---

## Raw Data (For Expert Review)

### Original Summary
${originalAnalysis.summary}

### Original Technical Claims
${originalAnalysis.technicalClaims.map(claim => `- ${claim}`).join('\n')}

### Original Feasibility Analysis
${originalAnalysis.feasibilityAnalysis}

### Original Constitutional Concerns
${originalAnalysis.constitutionalConcerns.map(concern => `
#### ${concern.issue}
${concern.analysis}
`).join('\n')}
        `.trim();

        const blob = new Blob([mdContent.replace(/<br\s*\/?>/gi, '\n')], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Policy-Report-For-${audience}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleExport = async () => {
        setIsExporting(true);

        if (typeof window.html2pdf === 'undefined') {
            alert('PDF generation library is not available. It may have been blocked from loading. Please check your network connection or ad-blocker and refresh the page.');
            setIsExporting(false);
            return;
        }
        
        const element = document.getElementById('generated-report-content');
        if (!element) {
            alert('Could not export PDF. The content to export was not found.');
            setIsExporting(false);
            return;
        }

        try {
            const opt = {
                margin:       [0.5, 0.5, 0.5, 0.5], // top, right, bottom, left in inches
                filename:     `Policy-Report-For-${audience}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#0f172a' },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            const logoSvgString = `
                <svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="pdfFooterLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#ef4444" />
                            <stop offset="50%" style="stop-color:#f97316" />
                            <stop offset="100%" style="stop-color:#eab308" />
                        </linearGradient>
                    </defs>
                    <path d="M50 15 L70 25 L70 55 L50 75 L30 55 L30 25 Z" fill="none" stroke="url(#pdfFooterLogoGrad)" stroke-width="2"/>
                    <circle cx="50" cy="45" r="3" fill="#f97316"/>
                    <ellipse cx="50" cy="45" rx="15" ry="6" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.7"/>
                    <ellipse cx="50" cy="45" rx="15" ry="6" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.7" transform="rotate(60 50 45)"/>
                    <ellipse cx="50" cy="45" rx="15" ry="6" fill="none" stroke="#ef4444" stroke-width="1.5" opacity="0.7" transform="rotate(-60 50 45)"/>
                    <circle cx="65" cy="45" r="1.5" fill="#eab308" /><circle cx="42" cy="38" r="1.5" fill="#eab308" /><circle cx="58" cy="52" r="1.5" fill="#eab308" />
                    <text x="35" y="22" font-family="monospace" font-size="6" fill="#60a5fa" opacity="0.6">&lt;/&gt;</text>
                    <text x="58" y="22" font-family="monospace" font-size="6" fill="#60a5fa" opacity="0.6">{}</text>
                    <text x="95" y="35" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#ef4444">Castle Bravo Project</text>
                    <text x="95" y="55" font-family="Arial, sans-serif" font-size="12" fill="#f97316">Open Code. Open Defense. Open Future.</text>
                </svg>
            `;
            // Convert SVG to PNG for PDF compatibility
            function svgToPngDataUrl(svgString: string, width: number, height: number): Promise<string> {
                return new Promise((resolve) => {
                    const svg = new Blob([svgString], { type: 'image/svg+xml' });
                    const url = URL.createObjectURL(svg);
                    const img = new window.Image();
                    img.onload = function () {
                        const canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                            ctx.drawImage(img, 0, 0, width, height);
                            resolve(canvas.toDataURL('image/png'));
                        } else {
                            resolve('');
                        }
                        URL.revokeObjectURL(url);
                    };
                    img.src = url;
                });
            }

            const logoPngDataUrl = await svgToPngDataUrl(logoSvgString, 400, 100);

            const worker = window.html2pdf().from(element).set(opt);

            await worker.toPdf().get('pdf').then(function (pdf: any) {
                const totalPages = pdf.internal.getNumberOfPages();
                const pageHeight = pdf.internal.pageSize.getHeight();
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    const footerY = pageHeight - opt.margin[2] + 0.15;
                    const logoHeight = 0.25;
                    const logoWidth = logoHeight * 4;
                    const logoX = opt.margin[3];
                    pdf.addImage(logoPngDataUrl, 'PNG', logoX, footerY, logoWidth, logoHeight);
                    const textX = logoX + logoWidth + 0.1;
                    const textY = footerY + (logoHeight / 2);
                    pdf.setFontSize(7);
                    pdf.setTextColor('#64748b');
                    pdf.text("Analysis powered by Google Gemini - via Castle Bravo Digital Privacy Policy Toolkit", textX, textY, { align: 'left', baseline: 'middle' });
                }
            }).save();

        } catch (error) {
            console.error(error);
            alert(error instanceof Error ? error.message : 'Could not export PDF.');
        } finally {
            setIsExporting(false);
        }
    };

    if (showExample) {
        return (
            <div className="animate-fade-in h-full flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-white">Sample Policy Analysis Report</h2>
                     <button onClick={() => setShowExample(false)} className="bg-slate-700 text-sky-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 hover:text-white transition-colors">
                        &larr; Back to Generator
                    </button>
                </div>
                <iframe 
                    srcDoc={exampleReportHtml}
                    title="Sample Policy Analysis Report"
                    className="w-full flex-grow bg-white rounded-lg border border-slate-700"
                />
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <WandIcon className="text-sky-400" />
                    Generate a Custom Policy Report
                </h2>
                <button onClick={() => setShowExample(true)} className="text-sky-400 hover:text-sky-300 hover:underline transition-colors text-sm font-semibold">
                    (view sample analysis)
                </button>
            </div>
            <p className="text-slate-400 mb-8 max-w-3xl">
                Paste the text of a bill, select your target audience, and the AI will generate a structured analysis covering the technical, security, and constitutional implications.
            </p>

            {/* The actual interactive tool */}
            {!report && (
                <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <label htmlFor="bill-text-generator" className="block text-sm font-medium text-slate-300 mb-2">Legislative Bill Text</label>
                            <textarea
                                id="bill-text-generator"
                                value={billText}
                                onChange={(e) => setBillText(e.target.value)}
                                className="w-full h-48 bg-slate-900 border border-slate-600 rounded-md p-3 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                                placeholder="Paste the full text of a bill here..."
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="audience-generator" className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
                                <select
                                    id="audience-generator"
                                    value={audience}
                                    onChange={(e) => setAudience(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-sky-500"
                                >
                                    <option>Policymaker</option>
                                    <option>Journalist</option>
                                    <option>High School Student</option>
                                    <option>General Public</option>
                                    <option>Technical Expert</option>
                                </select>
                            </div>
                            <button
                                onClick={handleGenerateReport}
                                disabled={loading}
                                className="w-full bg-sky-600 text-white font-bold py-3 px-6 rounded-md hover:bg-sky-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center mt-auto"
                            >
                                {loading ? <Spinner /> : 'Generate Report'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-md my-8">{error}</div>}
            
            {loading && (
                 <div className="mt-8 text-center text-slate-400">
                    <Spinner />
                    <p className="mt-2">Analyzing, structuring, and translating... This may take a moment.</p>
                </div>
            )}

            {report && (
                <div className="animate-fade-in mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">Generated Report for <span className="text-sky-400">{report.audience}</span></h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleExportMD}
                                className="flex items-center gap-2 bg-slate-700 text-sky-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 hover:text-white transition-colors"
                            >
                                <MarkdownIcon className="w-5 h-5" />
                                <span>Export MD</span>
                            </button>
                            <button
                                onClick={handleExport}
                                disabled={isExporting}
                                className="flex items-center gap-2 bg-slate-700 text-sky-300 font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 hover:text-white transition-colors disabled:bg-slate-500 disabled:cursor-wait"
                            >
                                <DownloadIcon className="w-5 h-5" />
                                <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
                            </button>
                        </div>
                    </div>

                    <div id="generated-report-content" className="bg-slate-900/70 rounded-lg p-8 border border-slate-700/50 space-y-8">
                        
                        <ReportSection title="Executive Summary" icon={<InfoIcon className="text-sky-400" />}>
                            <p>{report.structuredReport.executiveSummary}</p>
                        </ReportSection>

                        <ReportSection title="The Bottom Line: An Analogy" icon={<LightbulbIcon className="text-amber-400" />}>
                            <blockquote className="border-l-4 border-amber-400/50 pl-4 italic text-slate-300">
                                {report.structuredReport.analogyForLayman}
                            </blockquote>
                        </ReportSection>

                        <ReportSection title="Technical Analysis" icon={<ShieldOffIcon className="text-red-400"/>}>
                            <div className="space-y-4">
                                <div>
                                    <h5 className="font-semibold text-slate-100 mb-1">What the Bill Requires</h5>
                                    <p className="text-slate-300">{report.structuredReport.technicalAnalysis.keyClaimsSimplified}</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-slate-100 mb-1">Is it Technically Possible?</h5>
                                    <p className="text-slate-300">{report.structuredReport.technicalAnalysis.feasibilityAssessment}</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-slate-100 mb-1">Security & Privacy Risks</h5>
                                    <p className="text-slate-300">{report.structuredReport.technicalAnalysis.risksAndFlaws}</p>
                                </div>
                            </div>
                        </ReportSection>

                        <ReportSection title="Constitutional Impact" icon={<ScaleIcon className="text-blue-400"/>}>
                            <div className="space-y-4">
                                {report.structuredReport.constitutionalImpact.map((concern, i) => (
                                    <div key={i}>
                                        <h5 className="font-semibold text-slate-100">{concern.issue}</h5>
                                        <p className="text-slate-400">{concern.analysis}</p>
                                    </div>
                                ))}
                            </div>
                        </ReportSection>

                        <details className="mt-8 bg-slate-900/50 rounded-lg border border-slate-700">
                            <summary className="p-4 font-semibold text-slate-200 cursor-pointer hover:bg-slate-800/50 rounded-t-lg">
                                View Raw Technical & Constitutional Analysis (For Expert Review)
                            </summary>
                            <div className="p-6 border-t border-slate-700 space-y-6">
                                <RawAnalysisSection title="Summary">
                                    <p>{report.originalAnalysis.summary}</p>
                                </RawAnalysisSection>
                                <RawAnalysisSection title="Technical Claims & Feasibility">
                                    <h5 className="font-semibold text-slate-100 mb-2">Key Claims:</h5>
                                    <ul className="list-disc list-inside space-y-2 mb-4">
                                       {report.originalAnalysis.technicalClaims.map((claim, i) => <li key={i}>{claim}</li>)}
                                    </ul>
                                     <h5 className="font-semibold text-slate-100 mb-2">Feasibility Analysis:</h5>
                                    <p>{report.originalAnalysis.feasibilityAnalysis}</p>
                                </RawAnalysisSection>
                                <RawAnalysisSection title="Constitutional Concerns">
                                    <div className="space-y-4">
                                        {report.originalAnalysis.constitutionalConcerns.map((concern, i) => (
                                            <div key={i} className="border-l-2 border-red-500/50 pl-4">
                                                <h5 className="font-semibold text-slate-100">{concern.issue}</h5>
                                                <p className="text-slate-400">{concern.analysis}</p>
                                            </div>
                                        ))}
                                    </div>
                                </RawAnalysisSection>
                            </div>
                        </details>
                    </div>
                     <button onClick={() => setReport(null)} className="mt-6 text-sky-400 hover:text-sky-300">
                        &larr; Generate another report
                    </button>
                </div>
            )}
        </div>
    );
};

const Spinner: React.FC = () => (
    <svg className="animate-spin h-6 w-6 text-sky-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const ReportSection: React.FC<{title: string, icon: React.ReactNode, children: React.ReactNode}> = ({title, icon, children}) => (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <h4 className="text-xl font-bold text-sky-300 mb-4 flex items-center gap-3">
            {icon}
            {title}
        </h4>
        <div className="text-slate-300 prose prose-invert max-w-none">{children}</div>
    </div>
);

const RawAnalysisSection: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div>
        <h4 className="text-lg font-bold text-sky-400 mb-3 flex items-center gap-2">
            {title}
        </h4>
        <div className="text-slate-300">{children}</div>
    </div>
)

export default ReportGeneratorTool;