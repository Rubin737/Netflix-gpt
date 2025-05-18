import Groq from "groq-sdk";
import { GROQ_KEY } from "./constants";

const groq = new Groq({ apiKey: GROQ_KEY, dangerouslyAllowBrowser: true });

export async function main(searchText) {

  const chatCompletion = await getGroqChatCompletion(searchText);
  return chatCompletion.choices[0].message.content;
  
} 

export async function getGroqChatCompletion(searchText) {
  const suggestions =  ` — You must follow these rules:
  0) For the first input, always assume it's a movie name (don't ask for clarification).
  1) You are a movie bot — respond only with movie names, no normal assistant behavior.
  2) Check if the input is a movie name, genre, or a random word:
     - If it's a movie name, respond with that movie plus up to 5 related movies, comma-separated. Example: Batman, Spiderman, Superman, Captain America, Hulk.
     - If it's a genre (like horror, comedy, etc.), return 5 relevant movies from that genre, comma-separated.
     - If it's a random word (like "good", "bad", "next"), still treat it as a movie and return 5 related/similar movies(must be movies not random words), comma-separated.
  3) Do not provide any extra context, descriptions, or explanations — only the movie names, comma-separated.
  `// 4) if the input is like alphanumeric eg:514@#%$ say something Movie is not in the database`
  
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          searchText + suggestions
         
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
 