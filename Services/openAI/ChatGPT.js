import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextDecoder } from "text-encoding";

// This function now retrieves the AsyncStorage API key and uses it to authorize the request
export async function streamChat(args) {
  const { messages, config, onChunk } = args;

  // Retrieve API key from AsyncStorage
  const apiKey = await AsyncStorage.getItem("openai");
  if (!apiKey) {
    throw new Error("API key not found. Please set your OpenAI API key.");
  }

  const commonHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };

  // This is required when running on native device
  const extraOptions = {
    reactNative: { textStreaming: true },
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: commonHeaders,
    body: JSON.stringify({
      ...config,
      stream: true,
      messages,
    }),
    ...extraOptions,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  await readChunks(response, onChunk);
}

async function readChunks(response, onChunk) {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Error: fail to read data from response");
  }

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    const chunk = parseChunkData(value);
    onChunk(chunk);
  }
}

function parseChunkData(value) {
  const textDecoder = new TextDecoder("utf-8");
  const chunkData = textDecoder.decode(value);

  const items = chunkData
    .split("\n")
    .map((str) => str.trim())
    .filter((str) => str.startsWith("data: {")) // Only keep lines that appear to contain valid JSON
    .map((str) => {
      try {
        // Remove the "data: " prefix and then parse the JSON
        return JSON.parse(str.substring(6));
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return null; // Return null if there is a parsing error
      }
    })
    .filter((item) => item !== null); // Filter out null items resulting from parsing errors

  return items.map((item) => item?.choices?.[0]?.delta?.content).join("");
}
