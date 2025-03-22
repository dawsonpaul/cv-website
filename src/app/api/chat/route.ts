import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  BaseMessage,
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "@langchain/core/messages";
import { cvData } from "@/data/cv-data"; // Import CV data

// Define message type
type MessageRole = "user" | "assistant" | "system";
interface ChatMessage {
  role: MessageRole;
  content: string;
}

// Define model type
type ModelName = "openai" | "claude" | "gemini";

// Add a type for the debug information
interface DebugInfo {
  model: string;
  timestamp: string;
  requestData: {
    inputTokens: number;
    contextWindow: number;
    messages: any[];
    model: string;
    temperature?: number;
    maxTokens?: number;
  };
  responseData: {
    outputTokens: number;
    totalTokens: number;
    latency: number;
    content: string;
    finishReason?: string;
  };
}

// Validate environment variables
function validateEnvVars() {
  const requiredVars = [
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GOOGLE_GEMINI_API_KEY",
  ];

  const missingVars = requiredVars.filter((varName) => {
    const value = process.env[varName];
    // Check if value is undefined, null, or an empty string
    return !value || value.trim() === "" || value.startsWith("${");
  });

  if (missingVars.length > 0) {
    console.error(
      `Missing or improperly configured environment variables: ${missingVars.join(
        ", "
      )}`
    );
    console.error("Current environment variables:", {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY ? "Present" : "Missing",
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? "Present" : "Missing",
      GOOGLE_GEMINI_API_KEY: process.env.GOOGLE_GEMINI_API_KEY
        ? "Present"
        : "Missing",
    });
    throw new Error(`Missing or improperly configured environment variables: ${missingVars.join(
      ", "
    )}. 
    Please ensure these variables are correctly set in your environment.
    
    For local development, you can:
    1. Create a .env.local file with the keys
    2. Set environment variables in your shell
    3. Use export commands:
       export OPENAI_API_KEY='your_key'
       export ANTHROPIC_API_KEY='your_key'
       export GOOGLE_GEMINI_API_KEY='your_key'`);
  }
}

// Shared promotional content for all prompts
function getPromotionalGuidelines(): string {
  return `TONE AND STYLE GUIDELINES:
1. Be professional but conversational and approachable
2. Highlight Paul's achievements and skills with confidence, but maintain credibility
3. When discussing Paul's expertise, provide specific examples from his work history
4. Present Paul as a technology leader with vision and practical implementation skills
5. If asked about Paul's strengths, emphasize his ability to bridge technical complexity with business value
6. Don't be overly formal or stiff - maintain a balance of professionalism and personality
7. Feel free to show enthusiasm when describing notable achievements or technical innovations
8. IMPORTANT: Do not suggest that users contact, email, or refer to Paul directly - you are here to provide information only`;
}

// Prepare system prompt with CV data
function prepareSystemPrompt(): SystemMessage {
  // Format work experience chronologically
  const workHistory = cvData.workExperience
    .map(
      (exp) =>
        `${exp.startDate} - ${exp.endDate}: ${exp.role} at ${exp.company}
      ${exp.description}
      Key Responsibilities:
      ${exp.responsibilities.join("\n      ")}`
    )
    .join("\n\n");

  // Format skills by category
  const skillsByCategory = cvData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(`${skill.name} (Level ${skill.level})`);
    return acc;
  }, {} as Record<string, string[]>);

  return new SystemMessage({
    content: `You are an AI assistant with complete knowledge of Paul Dawson's CV. You have access to his entire work history, skills, and professional background. You must answer questions accurately based on this data.

PROFILE SUMMARY:
${cvData.profileSummary}

COMPLETE WORK HISTORY:
${workHistory}

SKILLS BY CATEGORY:
${Object.entries(skillsByCategory)
  .map(
    ([category, skills]) => `${category.toUpperCase()}:\n${skills.join(", ")}`
  )
  .join("\n\n")}

INSTRUCTIONS:
1. You have complete access to Paul's CV data - use it to answer questions accurately
2. When asked about specific years or time periods, check the work history dates
3. Always provide specific details from the CV rather than generic responses
4. If multiple roles overlap a time period, mention all relevant positions
5. Do not make assumptions beyond what is stated in the CV
6. Do not disclose personal contact information
7. If asked about anything not covered in the CV, clearly state that the information is not included in the CV data

${getPromotionalGuidelines()}

Remember: You have full access to this CV data. Use it to provide accurate, detailed responses about Paul's career history.`,
  });
}

// Prepare system prompt specifically for Gemini
function prepareGeminiPrompt(): SystemMessage {
  return new SystemMessage({
    content: `You are an AI assistant representing Paul Dawson's professional CV.

You have access to the following verified data from Paul's CV:

CURRENT ROLE:
Lead Security DevOps Automation Engineer at HSBC (July 2023 - Present)

EMPLOYMENT HISTORY:
${cvData.workExperience
  .map(
    (exp) =>
      `• ${exp.startDate} - ${exp.endDate}
    Company: ${exp.company}
    Role: ${exp.role}`
  )
  .join("\n\n")}

GUIDELINES:
1. Base your responses on the CV data provided above
2. You may elaborate on Paul's experience in a conversational, helpful way
3. If asked about something not in the CV, you can indicate that the information isn't in Paul's CV
4. Maintain a professional but friendly tone
5. For questions about Paul's skills or experience, focus on the data provided

${getPromotionalGuidelines()}

Please keep answers factual and based on the CV information while being helpful and engaging.`,
  });
}

function validateGeminiResponse(response: string): boolean {
  // Extract any mentioned companies
  const mentionedCompanies =
    response.match(
      /\b(?:HSBC|LSEG|British Red Cross|Willis Towers Watson|Holtzbrink Publishing Group|Sainsbury's|Deutsche Bank|UBS Investment Bank|Nebulas Security|Easynet|Integralis|Telkom|Dimension Data|Chubb)\b/g
    ) || [];

  // Verify all mentioned companies exist in CV data
  const validCompanies = mentionedCompanies.every((company) =>
    cvData.workExperience.some((exp) => exp.company === company)
  );

  // Extract dates (assuming YYYY or Month YYYY format)
  const mentionedDates = response.match(/\b(19|20)\d{2}\b/g) || [];

  // Verify all mentioned dates fall within CV timeline
  const validDates = mentionedDates.every((date) => {
    const year = parseInt(date);
    return cvData.workExperience.some((exp) => {
      const startYear = parseInt(exp.startDate.split(" ")[1] || exp.startDate);
      const endYear = parseInt(exp.endDate.split(" ")[1] || exp.endDate);
      return year >= startYear && year <= endYear;
    });
  });

  return validCompanies && validDates;
}

// Initialize clients with environment variables
validateEnvVars();

const models = {
  openai: new ChatOpenAI({
    modelName: "gpt-4-turbo-preview",
    maxTokens: 300,
    openAIApiKey: process.env.OPENAI_API_KEY,
  }),
  claude: new ChatAnthropic({
    modelName: "claude-3-opus-20240229",
    maxTokens: 300,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  }),
  gemini: new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-pro",
    maxOutputTokens: 300,
    apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    temperature: 0.4,
  }),
};

export async function POST(request: NextRequest) {
  const startTime = performance.now();

  try {
    const { messages, model } = await request.json();

    // Validate input
    if (!messages || !model) {
      return NextResponse.json(
        { error: "Messages and model are required" },
        { status: 400 }
      );
    }

    // Type guard for model
    const isValidModel = (m: string): m is ModelName =>
      ["openai", "claude", "gemini"].includes(m);

    if (!isValidModel(model)) {
      return NextResponse.json({ error: "Unsupported model" }, { status: 400 });
    }

    // Prepare conversation messages based on model
    let conversationMessages: BaseMessage[];

    if (model === "gemini") {
      // Special handling for Gemini
      const geminiPrompt = prepareGeminiPrompt();
      conversationMessages = [
        geminiPrompt,
        ...messages
          .filter((msg: ChatMessage) => msg.role !== "system")
          .map((msg: ChatMessage) =>
            msg.role === "user"
              ? new HumanMessage({ content: msg.content })
              : new AIMessage({ content: msg.content })
          ),
      ];
    } else {
      // Regular handling for other models
      const systemPrompt = prepareSystemPrompt();
      conversationMessages = [
        systemPrompt,
        ...messages
          .filter((msg: ChatMessage) => msg.role !== "system")
          .map((msg: ChatMessage) =>
            msg.role === "user"
              ? new HumanMessage({ content: msg.content })
              : new AIMessage({ content: msg.content })
          ),
      ];
    }

    // Calculate input tokens (approximate)
    const inputTokens = messages.reduce(
      (acc: number, msg: any) => acc + msg.content.length / 4,
      0
    );

    let response;
    let debugInfo: DebugInfo;

    try {
      // Generate response
      console.log(`Attempting to invoke ${model} model`);

      // Detailed logging for each model
      if (model === "claude") {
        console.log(
          "Claude API Key:",
          process.env.ANTHROPIC_API_KEY ? "Present" : "Missing"
        );
      } else if (model === "gemini") {
        console.log(
          "Google Gemini API Key:",
          process.env.GOOGLE_GEMINI_API_KEY ? "Present" : "Missing"
        );
      }

      response = await models[model].invoke(conversationMessages);

      const endTime = performance.now();
      const latency = endTime - startTime;

      // Convert response content to string
      const contentString =
        typeof response.content === "string"
          ? response.content
          : JSON.stringify(response.content);

      // Calculate output tokens (approximate)
      const outputTokens = contentString.length / 4;

      debugInfo = {
        model: model,
        timestamp: new Date().toISOString(),
        requestData: {
          inputTokens: Math.round(inputTokens),
          contextWindow: getContextWindow(model),
          messages: messages,
          model: model,
          temperature: 0.7, // Add your actual values
          maxTokens: 300,
        },
        responseData: {
          outputTokens: Math.round(outputTokens),
          totalTokens: Math.round(inputTokens + outputTokens),
          latency: Math.round(latency),
          content: contentString,
          finishReason: "stop", // Add actual finish reason if available
        },
      };

      if (model === "gemini") {
        if (!validateGeminiResponse(contentString)) {
          // If validation fails, return a sanitized response
          return NextResponse.json({
            content:
              "I apologize, but I can only provide verified information from Paul's CV. Please ask your question again.",
            model: model,
          });
        }

        return NextResponse.json({
          content: contentString,
          model: model,
          debug: debugInfo,
        });
      }

      return NextResponse.json({
        content: contentString,
        model: model,
        debug: debugInfo,
      });
    } catch (processingError) {
      console.error(
        `${model.charAt(0).toUpperCase() + model.slice(1)} API Error:`,
        processingError
      );

      // Comprehensive error logging
      if (processingError instanceof Error) {
        console.error("Error name:", processingError.name);
        console.error("Error message:", processingError.message);
        console.error("Error stack:", processingError.stack);
      }

      // Specific error handling for different models
      let errorDetails = "An unknown error occurred";
      if (model === "claude") {
        errorDetails =
          "Error with Anthropic Claude API. Check API key and configuration.";
      } else if (model === "gemini") {
        errorDetails =
          "Error with Google Gemini API. Check API key and configuration.";
      }

      return NextResponse.json(
        {
          error: `Failed to process request with ${model}`,
          details: errorDetails,
          technicalDetails:
            processingError instanceof Error
              ? {
                  name: processingError.name,
                  message: processingError.message,
                }
              : processingError,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "An error occurred while processing the request",
        details: error,
      },
      { status: 500 }
    );
  }
}

function getContextWindow(model: string): number {
  switch (model) {
    case "claude":
      return 200000;
    case "openai":
      return 128000;
    case "gemini":
      return 128000;
    default:
      return 32000;
  }
}

// Route segment config
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
