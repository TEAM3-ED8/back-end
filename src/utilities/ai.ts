import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"

export const chatWithAi = async ({ prompt }: { prompt: string }) => {
  const perplexity = createOpenAI({
    apiKey: process.env.PERPLEXITY_APIKEY,
    baseURL: "https://api.perplexity.ai"
  })

  const { text } = await generateText({
    model: perplexity("llama-3.1-sonar-small-128k-online"),
    prompt: prompt
  })

  return text
}
