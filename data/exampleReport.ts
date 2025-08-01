
export const exampleReportHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Privacy Policy Analysis: Technical and Constitutional Considerations</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background: #f8f9fa;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: white;
            padding: 60px 40px;
            margin-bottom: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            text-align: center;
            border-top: 4px solid #e74c3c;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            color: #2c3e50;
            font-weight: 600;
        }
        
        .header .subtitle {
            font-size: 1.2em;
            color: #7f8c8d;
            max-width: 800px;
            margin: 0 auto;
            font-weight: 400;
        }
        
        .section {
            background: white;
            padding: 40px;
            margin-bottom: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            border-left: 4px solid #e74c3c;
        }
        
        .section h2 {
            color: #2c3e50;
            font-size: 1.8em;
            margin-bottom: 25px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .section h3 {
            color: #34495e;
            font-size: 1.4em;
            margin-bottom: 20px;
            font-weight: 500;
        }
        
        .section p {
            margin-bottom: 20px;
            color: #5a6c7d;
            font-size: 1.05em;
        }
        
        .icon {
            width: 35px;
            height: 35px;
            background: #e74c3c;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 500;
            font-size: 1.1em;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin: 30px 0;
        }
        
        .card {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            transition: box-shadow 0.3s ease;
        }
        
        .card:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .card h4 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.2em;
            font-weight: 600;
        }
        
        .evidence-list {
            list-style: none;
            margin: 20px 0;
        }
        
        .evidence-list li {
            background: #f1f3f4;
            padding: 20px;
            margin: 15px 0;
            border-radius: 6px;
            border-left: 3px solid #e74c3c;
        }
        
        .evidence-list li strong {
            color: #2c3e50;
            font-weight: 600;
        }
        
        .technical-analysis {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 25px;
            border-radius: 6px;
            font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Source Code Pro', monospace;
            margin: 20px 0;
            font-size: 0.95em;
            line-height: 1.5;
        }
        
        .technical-analysis .comment {
            color: #95a5a6;
        }
        
        .key-finding {
            background: #fdf2f2;
            border: 1px solid #f5c6cb;
            border-left: 4px solid #dc3545;
            padding: 25px;
            border-radius: 6px;
            margin: 25px 0;
        }
        
        .key-finding h4 {
            color: #721c24;
            margin-bottom: 15px;
            font-size: 1.3em;
            font-weight: 600;
        }
        
        .key-finding p {
            color: #721c24;
            margin-bottom: 0;
        }
        
        .alternatives-section {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            padding: 40px;
            border-radius: 8px;
            margin: 40px 0;
        }
        
        .alternatives-section h3 {
            color: #2c3e50;
            margin-bottom: 25px;
            font-size: 1.5em;
            font-weight: 600;
        }
        
        .risk-assessment {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-left: 4px solid #f39c12;
            padding: 25px;
            border-radius: 6px;
            margin: 25px 0;
        }
        
        .risk-assessment h4 {
            color: #856404;
            margin-bottom: 15px;
            font-size: 1.2em;
            font-weight: 600;
        }
        
        .risk-assessment ul {
            margin: 15px 0;
            padding-left: 20px;
        }
        
        .risk-assessment li {
            color: #856404;
            margin: 8px 0;
        }
        
        .methodology {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            margin: 40px 0;
            border-left: 4px solid #27ae60;
        }
        
        .methodology h3 {
            color: #27ae60;
            margin-bottom: 25px;
            font-size: 1.6em;
            font-weight: 600;
        }
        
        .footer {
            background: #34495e;
            color: #ecf0f1;
            padding: 50px 40px;
            border-radius: 8px;
            text-align: center;
        }
        
        .footer h3 {
            color: #ecf0f1;
            margin-bottom: 20px;
            font-size: 1.4em;
            font-weight: 500;
        }
        
        .footer p {
            font-size: 1.1em;
            margin-bottom: 30px;
            color: #bdc3c7;
        }
        
        .btn {
            display: inline-block;
            background: #e74c3c;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.3s ease;
            margin: 8px;
            border: none;
            cursor: pointer;
        }
        
        .btn:hover:not(:disabled) {
            background: #c0392b;
        }
        
        .btn:disabled {
            background: #95a5a6;
            cursor: wait;
        }
        
        .btn-secondary {
            background: #95a5a6;
        }
        
        .btn-secondary:hover:not(:disabled) {
            background: #7f8c8d;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 25px 0;
            background: white;
        }
        
        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #e9ecef;
        }
        
        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .citation {
            font-size: 0.9em;
            color: #6c757d;
            font-style: italic;
            margin-top: 10px;
        }
        
        .constitutional-violation {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            border-left: 4px solid #dc3545;
            padding: 25px;
            border-radius: 6px;
            margin: 25px 0;
        }
        
        .constitutional-violation h4 {
            color: #721c24;
            margin-bottom: 15px;
            font-size: 1.2em;
            font-weight: 600;
        }
        
        .constitutional-violation ul {
            margin: 15px 0;
            padding-left: 20px;
        }
        
        .constitutional-violation li {
            color: #721c24;
            margin: 8px 0;
        }

        .sub-footer {
            text-align: center;
            padding: 40px 20px 20px;
            margin-top: 20px;
            border-top: 1px solid #e9ecef;
        }
        .sub-footer-logo {
            margin-bottom: 15px;
            opacity: 0.8;
        }
        .sub-footer-text {
            color: #95a5a6;
            font-size: 0.9em;
            margin: 0;
        }
        
        @media (max-width: 768px) {
            .header {
                padding: 40px 20px;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .section {
                padding: 30px 20px;
            }
            
            .grid {
                grid-template-columns: 1fr;
            }
            
            .alternatives-section,
            .methodology {
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Digital Privacy Policy Analysis</h1>
            <p class="subtitle">Technical and Constitutional Assessment of Encryption Backdoors and Age Verification Mandates</p>
        </div>

        <div class="section">
            <h2><span class="icon">📊</span>Executive Summary</h2>
            <p>This analysis examines current policy proposals requiring encryption backdoors and age verification systems from technical feasibility, security, and constitutional perspectives. The EARN IT Act would force service providers to either weaken security by providing backdoors to end-to-end encrypted content or face liability, while recent Supreme Court decisions on age verification will block adults from accessing lawful speech and jeopardize their data security and privacy. The evidence demonstrates a fundamental contradiction: policymakers demanding impossible technical solutions while lacking the expertise to understand their implications.</p>
            
            <div class="key-finding">
                <h4>Critical Policy Contradiction</h4>
                <p>As cryptography expert Matthew Green observed, these bills are "a backdoor way to allow the government to ban encryption" without explicitly banning it, making "encryption commercially infeasible for major providers to deploy". This represents a deliberate attempt to circumvent constitutional protections through technical mandates that are both impossible to implement securely and devastating to implement poorly.</p>
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">🔍</span>Technical Infrastructure Assessment</h2>
            <p>Government cybersecurity capabilities must be evaluated against historical performance and current technical requirements.</p>
            
            <h3>Documented Security Incidents and Policy Failures</h3>
            <table>
                <thead>
                    <tr>
                        <th>Incident/Policy</th>
                        <th>Year</th>
                        <th>Impact</th>
                        <th>Root Cause</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>OPM Data Breach</td>
                        <td>2015</td>
                        <td>22.1 million records compromised</td>
                        <td>Inadequate cybersecurity controls</td>
                    </tr>
                    <tr>
                        <td>SolarWinds Supply Chain Attack</td>
                        <td>2020</td>
                        <td>9 federal agencies compromised</td>
                        <td>Third-party software management failures</td>
                    </tr>
                    <tr>
                        <td>EARN IT Act Commission Structure</td>
                        <td>2020-2024</td>
                        <td>19-person unelected commission dominated by law enforcement</td>
                        <td>Constitutional separation of powers violation</td>
                    </tr>
                    <tr>
                        <td>Texas Age Verification Ruling</td>
                        <td>2025</td>
                        <td>Supreme Court upholds adult content restrictions</td>
                        <td>First Amendment facial challenge framework weakened</td>
                    </tr>
                    <tr>
                        <td>Multiple State Age Verification Laws</td>
                        <td>2023-2025</td>
                        <td>17 states requiring age verification for "harmful" content</td>
                        <td>Vague definitions creating impossible compliance standards</td>
                    </tr>
                </tbody>
            </table>

            <div class="constitutional-violation">
                <h4>Constitutional Violations in Current Policy Framework</h4>
                <ul>
                    <li><strong>EARN IT Act Structure:</strong> Creates unelected 19-person commission dominated by law enforcement agencies, violating separation of powers principles</li>
                    <li><strong>Backdoor Mandates:</strong> Forces companies to choose between constitutional rights and commercial viability—a textbook unconstitutional condition</li>
                    <li><strong>Age Verification Overreach:</strong> Recent Supreme Court ruling in Free Speech Coalition v. Paxton enables state censorship of lawful adult content under guise of child protection</li>
                    <li><strong>Privacy Destruction:</strong> Mandatory identity verification eliminates anonymous speech and creates comprehensive surveillance infrastructure</li>
                </ul>
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">🔐</span>The Encryption Backdoor Fallacy</h2>
            <p>The EARN IT Act represents a cynical attempt to destroy encryption through legal coercion rather than honest debate. As cryptography expert Matthew Green notes, "This bill is a backdoor way to allow the government to ban encryption on commercial services... it just makes encryption commercially infeasible for major providers to deploy."</p>
            
            <div class="technical-analysis">
// The fundamental lie of "exceptional access"
function create_backdoor(encryption_system) {
    // There is no such thing as a backdoor only 
    // "good guys" can use - this is mathematically impossible
    
    if (backdoor_exists) {
        accessible_by = [
            "intended_law_enforcement",
            "corrupt_government_officials",
            "foreign_intelligence_services", 
            "criminal_organizations",
            "authoritarian_regimes",
            "corporate_espionage_actors"
        ];
        
        // Security is now determined by the weakest link
        // in this entire chain
        actual_security = 0;
    }
    
    return "Mission Accomplished: Encryption Destroyed";
}

/* Every cryptographer knows this. Policymakers 
   either don't understand or don't care. */
            </div>

            <h3>The EARN IT Act: Death by a Thousand Cuts</h3>
            <ul class="evidence-list">
                <li><strong>Unconstitutional Commission Structure:</strong> Creates a 19-person commission "dominated by law enforcement agencies, with Attorney General William Barr at the top" to make "best practices" rules</li>
                <li><strong>Coercive "Voluntary" Compliance:</strong> Creates "a fiction that the 'best practices' are just voluntary" while making non-compliance legally untenable</li>
                <li><strong>Infrastructure Destruction:</strong> Would "undermine what the Internet needs to thrive as an open, global, secure, and trustworthy" network</li>
                <li><strong>Deliberate Constitutional Evasion:</strong> Designed to avoid direct Fourth Amendment challenges while achieving the same unconstitutional surveillance goals</li>
            </ul>
        </div>

        <div class="section">
            <h2><span class="icon">👥</span>Age Verification: The Privacy Destruction Machine</h2>
            <p>The Supreme Court's recent decision in Free Speech Coalition v. Paxton represents a catastrophic erosion of First Amendment protections, giving states carte blanche to "enact onerous age-verification rules that will block adults from accessing lawful speech, curtail their ability to be anonymous, and jeopardize their data security and privacy."</p>

            <h3>The Technical Reality vs. Political Fantasy</h3>
            <div class="grid">
                <div class="card">
                    <h4>Client-Side Verification: Theater of Security</h4>
                    <p><strong>Reality:</strong> Bypassed in seconds using browser developer tools, modified clients, or simple VPNs</p>
                    <p><strong>Policy Goal:</strong> "Protecting children"</p>
                    <p><strong>Actual Effect:</strong> Creates false sense of security while training children to circumvent restrictions</p>
                </div>

                <div class="card">
                    <h4>Identity Verification: The Surveillance Goldmine</h4>
                    <p><strong>Technical Requirement:</strong> Government-mandated identity verification for all online activity</p>
                    <p><strong>Privacy Destruction:</strong> Eliminates anonymous speech, creates comprehensive tracking database</p>
                    <p><strong>Security Nightmare:</strong> Centralizes personal information in high-value targets for criminal exploitation</p>
                </div>

                <div class="card">
                    <h4>17 States and Counting: A Race to the Bottom</h4>
                    <p><strong>Current Status:</strong> 17 states now mandate age verification with vague "harmful to minors" definitions</p>
                    <p><strong>Constitutional Impact:</strong> NetChoice litigation blocked in Ohio as "UNCONSTITUTIONAL," but Supreme Court ruling weakens facial challenges</p>
                    <p><strong>Technical Circumvention:</strong> Every restriction defeated by widely available VPN services</p>
                </div>
            </div>
        </div>

        <div class="section">
            <h2><span class="icon">⚖️</span>Constitutional Demolition in Progress</h2>
            <p>These policies represent a systematic assault on constitutional principles, using technical complexity as camouflage for what amounts to the creation of a comprehensive surveillance state.</p>

            <div class="grid">
                <div class="card">
                    <h4>Fourth Amendment: Obliterated</h4>
                    <p><strong>Backdoor Mandates:</strong> Create warrantless surveillance capabilities that dwarf anything in American history. <strong>Age Verification:</strong> Requires collection of identity information for all online activity, constituting mass surveillance without probable cause or judicial oversight.</p>
                </div>

                <div class="card">
                    <h4>First Amendment: Under Siege</h4>
                    <p><strong>Prior Restraint:</strong> Age verification creates licensing schemes for speech access. <strong>Anonymous Speech:</strong> Identity requirements eliminate this fundamental democratic protection. <strong>Chilling Effects:</strong> Surveillance infrastructure deters legitimate expression.</p>
                </div>

                <div class="card">
                    <h4>Separation of Powers: Abandoned</h4>
                    <p><strong>EARN IT Commission:</strong> Unelected body dominated by law enforcement makes binding rules on private companies. <strong>Judicial Bypass:</strong> Avoids constitutional review by making compliance "voluntary" while ensuring non-compliance is impossible.</p>
                </div>

                <div class="card">
                    <h4>Due Process: Nonexistent</h4>
                    <p><strong>Vague Standards:</strong> "Harmful to minors" and "best practices" create impossible compliance requirements. <strong>Retroactive Liability:</strong> Changes to commission standards apply retroactively to existing services. <strong>No Meaningful Review:</strong> Administrative processes lack genuine judicial oversight.</p>
                </div>
            </div>

            <div class="key-finding">
                <h4>The NetChoice Victory Pattern: Why Courts Keep Blocking These Laws</h4>
                <p>NetChoice has won permanent blocks of age verification laws in multiple states, with courts repeatedly finding them unconstitutional. The Ohio court specifically ruled that forcing people to "jeopardize their privacy and security" to access lawful content violates the First Amendment. Yet policymakers continue proposing identical legislation, demonstrating either willful ignorance or deliberate contempt for constitutional law.</p>
            </div>
        </div>

        <div class="alternatives-section">
            <h3>Actual Child Safety Solutions (That Don't Destroy Democracy)</h3>
            <p>Real solutions exist that protect children without creating surveillance infrastructure or destroying constitutional rights. The fact that policymakers consistently ignore these options reveals their true intentions.</p>

            <div class="grid">
                <div class="card">
                    <h4>Technical Solutions That Actually Work</h4>
                    <ul>
                        <li><strong>Device-level parental controls:</strong> Local implementation preserves privacy while giving parents real control</li>
                        <li><strong>Router-level filtering:</strong> Home network protection without centralized surveillance</li>
                        <li><strong>Platform design improvements:</strong> Age-appropriate algorithms and robust reporting systems</li>
                        <li><strong>Digital literacy education:</strong> Teaching critical thinking skills and online safety</li>
                        <li><strong>End-to-end encryption preservation:</strong> Protects children from predators while maintaining privacy</li>
                    </ul>
                </div>

                <div class="card">
                    <h4>Policy Approaches That Respect Rights</h4>
                    <ul>
                        <li><strong>Target actual criminals:</strong> Focus law enforcement resources on prosecuting predators, not on destroying technology</li>
                        <li><strong>Platform accountability without backdoors:</strong> Design requirements for child safety features that don't compromise security</li>
                        <li><strong>Data minimization mandates:</strong> Prohibit collection and retention of children's data</li>
                        <li><strong>Transparency without surveillance:</strong> Require algorithmic auditing and public safety reporting</li>
                        <li><strong>International cooperation:</strong> Work with other democracies to combat actual criminal activity</li>
                    </ul>
                </div>
            </div>

            <div class="key-finding">
                <h4>Why Policymakers Reject Effective Solutions</h4>
                <p>These evidence-based approaches would actually protect children while preserving rights. The systematic rejection of effective solutions in favor of privacy-destroying surveillance systems reveals that "child safety" is often a pretext for expanding government surveillance capabilities. As the Internet Society notes, current approaches "would not effectively protect children from harmful material, and would undermine the security and privacy of all Internet users, including both adults and minors."</p>
            </div>
        </div>

        <div class="methodology">
            <h3>Methodology and Sources</h3>
            <p>This analysis is based on current legislative text, federal court decisions, technical cryptographic research, and cybersecurity incident documentation. Assessment includes analysis of the EARN IT Act's technical requirements, recent Supreme Court decisions on age verification, and documented patterns of government cybersecurity failures.</p>
            
            <div class="citation">
                <p><strong>Primary Sources:</strong> EARN IT Act legislative text (S.3398), Free Speech Coalition v. Paxton Supreme Court decision (2025), NetChoice litigation records, Electronic Frontier Foundation legal analysis, Internet Society technical assessments, academic cryptographic research, GAO cybersecurity audit reports, and federal court decisions on digital privacy rights.</p>
                
                <p><strong>Expert Commentary:</strong> Cryptography expert Matthew Green (Johns Hopkins), EFF legal team analysis, Internet Society policy research, NetChoice constitutional litigation, and peer-reviewed technical literature on encryption backdoors and age verification systems.</p>
            </div>
        </div>

        <div class="footer">
            <h3>The Choice Is Clear</h3>
            <p>We face a fundamental choice between security and surveillance, between constitutional rights and authoritarian control. As the Electronic Frontier Foundation states: "strong encryption is tied to one of our most basic rights: the right to have a private conversation. In the digital world, privacy is impossible without strong encryption."</p>
            <p>Policymakers who demand encryption backdoors and mandatory age verification either do not understand the technology they seek to regulate, or they understand it perfectly and simply do not care about the constitutional and security implications. Either way, they should not be making technical policy.</p>
            <div>
                <a href="https://act.eff.org/action/stop-the-earn-it-act" class="btn" target="_blank" rel="noopener noreferrer">Take Action Against EARN IT</a>
                <a href="https://www.eff.org/issues/privacy" class="btn" target="_blank" rel="noopener noreferrer">Defend Digital Rights</a>
                <a href="https://github.com/castle-bravo-project" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                <a href="#" id="pdf-download-btn" class="btn btn-secondary" onclick="event.preventDefault(); downloadPdf();">Download PDF</a>
            </div>
        </div>

        <div class="sub-footer">
            <div class="sub-footer-logo">
                 <svg width="200" height="50" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#ef4444" />
                            <stop offset="50%" style="stop-color:#f97316" />
                            <stop offset="100%" style="stop-color:#eab308" />
                        </linearGradient>
                    </defs>
                    <path d="M50 15 L70 25 L70 55 L50 75 L30 55 L30 25 Z" fill="none" stroke="url(#footerLogoGrad)" stroke-width="2"/>
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
            </div>
            <p class="sub-footer-text">Analysis powered by Google Gemini - via Castle Bravo Digital Privacy Policy Toolkit</p>
        </div>
    </div>
    <script>
    async function downloadPdf() {
        const button = document.getElementById('pdf-download-btn');
        if (button.disabled) return;
        
        button.innerText = 'Exporting...';
        button.disabled = true;

        const html2pdf = window.top.html2pdf;

        if (typeof html2pdf === 'undefined') {
            alert('PDF generation library is not available. It might have been blocked from loading. Please check your network connection or ad-blocker and refresh the page.');
            button.innerText = 'Download PDF';
            button.disabled = false;
            return;
        }

        const element = document.querySelector('.container');
        const opt = {
            margin:       [0.5, 0.5, 0.5, 0.5],
            filename:     'Policy-Report-Sample.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#f8f9fa' },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        const logoSvgString = \`
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
        \`;
        const logoBase64 = \`data:image/svg+xml;base64,\${window.top.btoa(unescape(encodeURIComponent(logoSvgString)))}\`;

        try {
            const worker = html2pdf().from(element).set(opt);

            await worker.toPdf().get('pdf').then(function (pdf) {
                const totalPages = pdf.internal.getNumberOfPages();
                const pageHeight = pdf.internal.pageSize.getHeight();
                
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i);
                    const footerY = pageHeight - opt.margin[2] + 0.15;
                    const logoHeight = 0.25;
                    const logoWidth = logoHeight * 4;
                    const logoX = opt.margin[3];
                    pdf.addImage(logoBase64, 'SVG', logoX, footerY, logoWidth, logoHeight);
                    const textX = logoX + logoWidth + 0.1;
                    const textY = footerY + (logoHeight / 2);
                    pdf.setFontSize(7);
                    pdf.setTextColor('#64748b'); // slate-500
                    pdf.text("Analysis powered by Google Gemini - via Castle Bravo Digital Privacy Policy Toolkit", textX, textY, { align: 'left', baseline: 'middle' });
                }
            }).save();
        } catch(e) {
            alert('An error occurred during PDF generation.');
            console.error(e);
        } finally {
            button.innerText = 'Download PDF';
            button.disabled = false;
        }
    }
    </script>
</body>
</html>
`;