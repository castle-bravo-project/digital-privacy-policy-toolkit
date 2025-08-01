import { GoogleGenAI, Type } from '@google/genai';
import type {
  AiBiasAnalysis,
  BillAnalysis,
  BreachEvent,
  CssSimulationAnalysis,
  DraftingInteraction,
  MythBusterAnalysis,
  PolicyComparison,
  PrivacyPolicyGrade,
  SimulationStep,
  StructuredReport,
} from '../types';

export function getGeminiApiKey() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('geminiApiKey') || '';
  }
  return '';
}

export function getGeminiClient() {
  const apiKey = getGeminiApiKey();
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

const model = 'gemini-2.5-flash';

export const generateWithSchema = async <T>(
  prompt: string,
  schema: object
): Promise<T> => {
  const ai = getGeminiClient();
  if (!ai)
    throw new Error(
      'Gemini API key is not set. Please enter it in the Settings menu.'
    );
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
      },
    });
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as T;
  } catch (error) {
    console.error('Error generating content with schema:', error);
    throw new Error('Failed to get a valid structured response from the API.');
  }
};

export const getBreachTimeline = async (): Promise<BreachEvent[]> => {
  const prompt = `Generate a list of 5 significant historical government or government-related data breaches. For each breach, provide the incident name, year, a brief summary of the impact, and the primary root cause.`;
  const breachEventSchema = {
    type: Type.OBJECT,
    properties: {
      incident: {
        type: Type.STRING,
        description: 'Name of the data breach incident.',
      },
      year: {
        type: Type.INTEGER,
        description: 'Year the breach was disclosed or occurred.',
      },
      impact: {
        type: Type.STRING,
        description: "Brief summary of the breach's impact.",
      },
      rootCause: {
        type: Type.STRING,
        description: 'The primary root cause of the breach.',
      },
    },
    required: ['incident', 'year', 'impact', 'rootCause'],
  };
  const schema = {
    type: Type.ARRAY,
    items: breachEventSchema,
  };

  return generateWithSchema<BreachEvent[]>(prompt, schema);
};

export const analyzeBill = async (billText: string): Promise<BillAnalysis> => {
  const prompt = `Analyze the following legislative bill text. Provide a concise summary, identify key technical claims, analyze their feasibility, and list potential constitutional concerns (e.g., First, Fourth Amendment).
    
    Bill Text:
    ---
    ${billText}
    ---
    `;
  const schema = {
    type: Type.OBJECT,
    properties: {
      summary: {
        type: Type.STRING,
        description:
          "A concise summary of the bill's purpose and main provisions.",
      },
      technicalClaims: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description:
          'Key technical assumptions or requirements mentioned in the bill.',
      },
      feasibilityAnalysis: {
        type: Type.STRING,
        description:
          'An analysis of the technical feasibility of the claims, highlighting potential challenges.',
      },
      constitutionalConcerns: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            issue: {
              type: Type.STRING,
              description:
                "The constitutional issue (e.g., 'Fourth Amendment - Unreasonable Search').",
            },
            analysis: {
              type: Type.STRING,
              description:
                'Brief analysis of why this is a concern for the provided bill text.',
            },
          },
          required: ['issue', 'analysis'],
        },
        description:
          'A list of potential constitutional issues raised by the bill.',
      },
    },
    required: [
      'summary',
      'technicalClaims',
      'feasibilityAnalysis',
      'constitutionalConcerns',
    ],
  };
  return generateWithSchema<BillAnalysis>(prompt, schema);
};

export const translateAnalysisToStructuredReport = async (
  analysis: BillAnalysis,
  audience: string
): Promise<StructuredReport> => {
  const prompt = `
You are a senior policy analyst and technical writer. Your task is to transform a raw technical and legal analysis of a bill into a clear, structured, and impactful report for a specific audience. The output must be in JSON format.

**Audience:** '${audience}'

**Raw Analysis Input:**
---
Summary: ${analysis.summary}
Technical Claims: ${analysis.technicalClaims.join('; ')}
Feasibility: ${analysis.feasibilityAnalysis}
Constitutional Concerns:
${analysis.constitutionalConcerns
  .map((c) => `- ${c.issue}: ${c.analysis}`)
  .join('\n')}
---

**Instructions:**
Based on the raw analysis, generate a structured JSON report. Your explanations should be simplified for the target audience but retain analytical depth. Adopt an authoritative tone. Structure your response according to the provided JSON schema. For 'analogyForLayman', create a powerful and simple analogy that captures the core technical or privacy issue at stake. For 'risksAndFlaws', elaborate on the security and privacy dangers implied by the feasibility analysis. For 'keyClaimsSimplified', summarize the technical requirements in a single, clear statement.
`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      executiveSummary: {
        type: Type.STRING,
        description:
          "A high-level summary of the bill's purpose and its most critical implications, written for the target audience.",
      },
      analogyForLayman: {
        type: Type.STRING,
        description:
          'A simple, powerful analogy to explain the core technical or privacy issue to a non-expert.',
      },
      technicalAnalysis: {
        type: Type.OBJECT,
        properties: {
          keyClaimsSimplified: {
            type: Type.STRING,
            description:
              'A one-sentence summary of what the bill is technically asking for.',
          },
          feasibilityAssessment: {
            type: Type.STRING,
            description:
              'An assessment of whether the technical claims are possible, explained simply.',
          },
          risksAndFlaws: {
            type: Type.STRING,
            description:
              'A description of the security, privacy, or operational risks if the bill were implemented.',
          },
        },
        required: [
          'keyClaimsSimplified',
          'feasibilityAssessment',
          'risksAndFlaws',
        ],
      },
      constitutionalImpact: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            issue: {
              type: Type.STRING,
              description:
                "The constitutional issue (e.g., 'First Amendment').",
            },
            analysis: {
              type: Type.STRING,
              description:
                'A simplified explanation of the constitutional concern for the target audience.',
            },
          },
          required: ['issue', 'analysis'],
        },
      },
    },
    required: [
      'executiveSummary',
      'analogyForLayman',
      'technicalAnalysis',
      'constitutionalImpact',
    ],
  };

  return generateWithSchema<StructuredReport>(prompt, schema);
};

export const translateText = async (
  text: string,
  audience: string
): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai)
    throw new Error(
      'Gemini API key is not set. Please enter it in the Settings menu.'
    );
  const prompt = `Translate the following complex technical text into clear, simple language suitable for a '${audience}'. Focus on the core concepts and implications.\n\n    Technical Text:\n    ---\n    ${text}\n    ---\n    `;
  const response = await ai.models.generateContent({ model, contents: prompt });
  return response.text;
};

export const getSimulationResponse = async (
  history: { user: string; model: string }[],
  choice: string
): Promise<SimulationStep> => {
  const ai = getGeminiClient();
  if (!ai)
    throw new Error(
      'Gemini API key is not set. Please enter it in the Settings menu.'
    );
  const prompt = `You are an interactive fiction engine simulating the consequences of tech policy decisions. The user is in a scenario about encryption backdoors. Continue the story based on their last choice and present 2-3 new choices. The narrative should be dramatic and educational, explaining the technical and societal implications.\n    \n    Current situation: ${
    history.length > 0
      ? history[history.length - 1].model
      : 'The user is starting the scenario.'
  }\n    \n    User's last choice: ${choice}\n    `;
  const response = await ai.models.generateContent({ model, contents: prompt });
  return JSON.parse(response.text) as SimulationStep;
};

export const getPolicyComparison = async (
  scenario: string
): Promise<PolicyComparison> => {
  const ai = getGeminiClient();
  if (!ai)
    throw new Error(
      'Gemini API key is not set. Please enter it in the Settings menu.'
    );
  const prompt = `Compare the following policy scenario in terms of privacy, security, and societal impact.\n\nScenario:\n${scenario}\n---\n`;
  const response = await ai.models.generateContent({ model, contents: prompt });
  return JSON.parse(response.text) as PolicyComparison;
};

export const getCounselResponse = async (newQuery: string): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai)
    throw new Error(
      'Gemini API key is not set. Please enter it in the Settings menu.'
    );
  const prompt = `**User's Latest Goal:**\n"${newQuery}"\n\nYour task is to respond as the Counsel. Ask probing questions. Point out potential flaws. Suggest they consider alternatives or look at precedents. Keep your response concise and focused on guiding their thinking.\n`;
  const response = await ai.models.generateContent({ model, contents: prompt });
  return response.text;
};

export const getSurveillanceAnalysis = async (
  scenario: string
): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai)
    throw new Error(
      'Gemini API key is not set. Please enter it in the Settings menu.'
    );
  const prompt = `As a privacy and civil liberties expert, analyze the following facial recognition scenario. Explain the implications in detail, covering:
    1.  **Accuracy & False Positives**: The risks of misidentification.
    2.  **Privacy Erosion**: How it enables mass tracking and permanent records.
    3.  **Chilling Effects**: The impact on free speech, association, and protest.
    4.  **Algorithmic Bias**: The potential for disproportionate impact on marginalized communities.

    Scenario:
    ---
    ${scenario}
    ---
    `;
  const response = await ai.models.generateContent({ model, contents: prompt });
  return response.text;
};

export const getMythBusterAnalysis = async (
  myth: string
): Promise<MythBusterAnalysis> => {
  const prompt = `You are a digital rights advocate and cybersecurity expert. Authoritatively debunk the following common myth used to justify anti-privacy policies. Provide a detailed, evidence-based analysis.

Myth: "${myth}"`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      myth: { type: Type.STRING, description: 'The original myth provided.' },
      reality: {
        type: Type.STRING,
        description:
          'A concise, forceful counter-argument that states the reality.',
      },
      technicalBreakdown: {
        type: Type.STRING,
        description:
          'A detailed explanation of why the myth is technically flawed, impossible, or dangerous. Use analogies if helpful.',
      },
      ethicalFallout: {
        type: Type.STRING,
        description:
          'An analysis of the constitutional, ethical, and human rights at stake if policy were based on this myth.',
      },
      precedent: {
        type: Type.STRING,
        description:
          'A historical example or precedent where similar logic has led to negative consequences (e.g., previous surveillance programs, data breaches).',
      },
    },
    required: [
      'myth',
      'reality',
      'technicalBreakdown',
      'ethicalFallout',
      'precedent',
    ],
  };

  return generateWithSchema<MythBusterAnalysis>(prompt, schema);
};

export const getCssAnalysis = async (): Promise<CssSimulationAnalysis> => {
  const prompt = `
    Analyze the privacy implications of a client-side scanning (CSS) system that has just resulted in a "false positive" flag on an innocent user's private photo.
    Explain in three distinct sections:
    1.  **Privacy Failure**: Describe how a supposedly private on-device scan becomes a warrantless search the moment a report is sent.
    2.  **Technical Vulnerability**: Explain the danger of the secret, centralized blocklist (hash list) and the inevitability of its abuse or leakage.
    3.  **Chilling Effect**: Detail how knowing that all personal data is being constantly scanned deters free expression and association.
    `;
  const schema = {
    type: Type.OBJECT,
    properties: {
      privacyFailure: {
        type: Type.STRING,
        description:
          'How a private scan becomes a warrantless search upon reporting.',
      },
      technicalVulnerability: {
        type: Type.STRING,
        description: 'The dangers of the secret blocklist (hash list).',
      },
      chillingEffect: {
        type: Type.STRING,
        description: 'How constant scanning deters free expression.',
      },
    },
    required: ['privacyFailure', 'technicalVulnerability', 'chillingEffect'],
  };
  return generateWithSchema<CssSimulationAnalysis>(prompt, schema);
};

export const getAiBiasAnalysis = async (
  datasetChoice: 'skewed' | 'balanced',
  outcome: string
): Promise<AiBiasAnalysis> => {
  const prompt = `
    A user has just run an AI bias simulation for predicting criminal recidivism.
    - The user chose the "${datasetChoice}" dataset.
    - The outcome was: "${outcome}"

    Please provide an analysis in three sections:
    1.  **Explanation**: Explain exactly why the AI produced this result based on the chosen dataset. If skewed, explain how it learned to correlate unrelated factors (like zip code) with risk. If balanced, explain why the outcomes were more equitable.
    2.  **Feedback Loop**: Describe the concept of a "discriminatory feedback loop" and how using this AI's biased predictions in the real world would worsen the initial bias in future data.
    3.  **Solution**: Briefly propose a better, rights-respecting approach to this problem that doesn't rely on biased predictive algorithms.
    `;
  const schema = {
    type: Type.OBJECT,
    properties: {
      explanation: {
        type: Type.STRING,
        description:
          'Why the AI produced the result based on the chosen dataset.',
      },
      feedbackLoop: {
        type: Type.STRING,
        description:
          'Explanation of a discriminatory feedback loop in this context.',
      },
      solution: {
        type: Type.STRING,
        description: 'A better, rights-respecting approach.',
      },
    },
    required: ['explanation', 'feedbackLoop', 'solution'],
  };
  return generateWithSchema<AiBiasAnalysis>(prompt, schema);
};

export const getDraftingAdvice = async (
  history: DraftingInteraction[],
  newQuery: string
): Promise<string> => {
  const prompt = `
You are an expert legislative counsel specializing in technology and constitutional law. Your role is to act as a Socratic guide for a user trying to draft tech policy. Do not just write the law for them. Instead, ask critical questions that force them to confront the technical, privacy, and constitutional implications of their ideas. Refer to the tools in this toolkit (e.g., CSS Simulator, Policy Comparator) as examples.

**Conversation History:**
${history
  .map((item) => `${item.role === 'user' ? 'User' : 'Counsel'}: ${item.text}`)
  .join('\n')}

**User's Latest Goal:**
"${newQuery}"

Your task is to respond as the Counsel. Ask probing questions. Point out potential flaws. Suggest they consider alternatives or look at precedents. Keep your response concise and focused on guiding their thinking.
`;
  const response = await ai.models.generateContent({ model, contents: prompt });
  return response.text;
};

export const gradePrivacyPolicy = async (
  policyText: string
): Promise<PrivacyPolicyGrade> => {
  const prompt = `
    You are a privacy expert tasked with grading a privacy policy. Analyze the provided text and assign a grade from A (excellent) to F (failing).
    Your analysis must be structured as a JSON object according to the provided schema.

    Base your grade and analysis on these key areas:
    1.  **Data Collection**: Does it practice data minimization or collect everything possible? Is it clear what is collected?
    2.  **Data Sharing/Selling**: Is data shared with third parties or "partners"? Is it sold? Is the language clear or vague?
    3.  **User Rights & Control**: How easy is it for users to access, edit, or delete their data? Are these rights prominent?
    4.  **Clarity & Readability**: Is the policy written in clear, simple language, or is it dense legal-ese designed to obscure?
    5.  **Security**: Does it mention security practices like encryption?

    Provide an overall grade, a summary of your reasoning, and a score (0-10) and analysis for each of the 4 main sections (Clarity, Collection, Sharing, Control).

    **Privacy Policy Text to Analyze:**
    ---
    ${policyText}
    ---
    `;

  const sectionSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      score: {
        type: Type.INTEGER,
        description: 'Score from 0 (worst) to 10 (best).',
      },
      analysis: {
        type: Type.STRING,
        description: 'Brief analysis for this section.',
      },
    },
    required: ['title', 'score', 'analysis'],
  };

  const schema = {
    type: Type.OBJECT,
    properties: {
      overallGrade: {
        type: Type.STRING,
        description:
          "The final letter grade for the policy, must be one of: 'A', 'B', 'C', 'D', 'F'.",
      },
      gradeReasoning: {
        type: Type.STRING,
        description:
          'A concise summary explaining why the policy received this grade.',
      },
      sections: {
        type: Type.ARRAY,
        items: sectionSchema,
        description:
          "A detailed breakdown of the policy's performance in key areas.",
      },
    },
    required: ['overallGrade', 'gradeReasoning', 'sections'],
  };

  return generateWithSchema<PrivacyPolicyGrade>(prompt, schema);
};

export const getCounselConversationResponse = async (
  history: { role: string; text: string }[],
  newQuery: string
): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai)
    throw new Error(
      'Gemini API key is not set. Please enter it in the Settings menu.'
    );
  const prompt = `**Conversation History:**\n${history
    .map((item) => `${item.role === 'user' ? 'User' : 'Counsel'}: ${item.text}`)
    .join(
      '\n'
    )}\n\n**User's Latest Goal:**\n"${newQuery}"\n\nYour task is to respond as the Counsel. Ask probing questions. Point out potential flaws. Suggest they consider alternatives or look at precedents. Keep your response concise and focused on guiding their thinking.\n`;
  const response = await ai.models.generateContent({ model, contents: prompt });
  return response.text;
};

export const getAgeVerificationExploitAnalysis = async (
  method: string,
  exploit: string
): Promise<string> => {
  const ai = getGeminiClient();
  if (!ai)
    throw new Error(
      'Gemini API key is not set. Please enter it in the Settings menu.'
    );
  const prompt = `Analyze the following age verification method and describe a plausible exploit.\n\nMethod: **${method}**\n\nExploit being simulated:\n**${exploit}**\n`;
  const response = await ai.models.generateContent({ model, contents: prompt });
  return response.text;
};
