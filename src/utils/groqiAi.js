import Groq from "groq-sdk";


const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function main(searchText) {

  const chatCompletion = await getGroqChatCompletion(searchText);
  return chatCompletion.choices[0].message.content;
  
} 

export async function getGroqChatCompletion(searchText) {
  const prompt = `
You are a movie recommendation bot. Follow these rules strictly:

1. Always assume the first user input is a movie name.
2. Only respond with movie names — comma-separated. No descriptions or extra text.
3. Determine the type of input and behave accordingly:
   - If it's a genre (e.g., horror, comedy, marvel, dc, or a director like nolan, fincher), return 5 relevant movie names, comma-separated.
   - If it's a specific movie name (e.g., Hangover), return only that movie name, not related ones.
   - If it's a random word (e.g., good, bad, next), return 5 actual movies related to that word, comma-separated.
4. Never include any extra explanation or message — only movie names, comma-separated.

`;

  
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          searchText + prompt
         
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
 