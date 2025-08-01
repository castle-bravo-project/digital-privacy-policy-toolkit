
export enum Tool {
  POLICY_DOSSIER = 'policy-dossier',
  TIMELINE = 'breach-timeline',
  TRANSLATOR = 'technical-translator',
  BILL_ANALYZER = 'bill-analyzer',
  SIMULATOR = 'backdoor-simulator',
  REPORT_GENERATOR = 'report-generator',
  SURVEILLANCE_SIMULATOR = 'surveillance-simulator',
  AGE_VERIFICATION_SIMULATOR = 'age-verification-simulator',
  POLICY_COMPARATOR = 'policy-comparator',
  POLICY_MYTHBUSTER = 'policy-mythbuster',
  CSS_SIMULATOR = 'css-simulator',
  AI_BIAS_SIMULATOR = 'ai-bias-simulator',
  LEGISLATIVE_DRAFTER = 'legislative-drafter',
  PRIVACY_POLICY_GRADER = 'privacy-policy-grader',
  SETTINGS = 'settings',
}

export interface BreachEvent {
  incident: string;
  year: number;
  impact: string;
  rootCause: string;
}

export interface BillAnalysis {
  summary: string;
  technicalClaims: string[];
  feasibilityAnalysis: string;
  constitutionalConcerns: {
    issue: string;
    analysis: string;
  }[];
}

export interface SimulationStep {
    narrative: string;
    choices: string[];
}

export interface StructuredReport {
    executiveSummary: string;
    analogyForLayman: string;
    technicalAnalysis: {
        keyClaimsSimplified: string;
        feasibilityAssessment: string;
        risksAndFlaws: string;
    };
    constitutionalImpact: {
        issue: string;
        analysis: string;
    }[];
}

export interface GeneratedReport {
    originalAnalysis: BillAnalysis;
    structuredReport: StructuredReport;
    audience: string;
}

export interface PolicyComparisonSection {
    corePrinciple: string;
    userRights: string;
    businessObligations: string;
    enforcement: string;
}

export interface PolicyComparison {
    gdpr: PolicyComparisonSection;
    usPolicy: PolicyComparisonSection;
}

export interface MythBusterAnalysis {
  myth: string;
  reality: string;
  technicalBreakdown: string;
  ethicalFallout: string;
  precedent: string;
}

export interface CssSimulationAnalysis {
    privacyFailure: string;
    technicalVulnerability: string;
    chillingEffect: string;
}

export interface AiBiasAnalysis {
    explanation: string;
    feedbackLoop: string;
    solution: string;
}

export interface DraftingInteraction {
    role: 'user' | 'model';
    text: string;
}

export interface PrivacyPolicyGrade {
    overallGrade: 'A' | 'B' | 'C' | 'D' | 'F';
    gradeReasoning: string;
    sections: {
        title: string;
        score: number; // out of 10
        analysis: string;
    }[];
}