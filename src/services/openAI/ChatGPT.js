const apiKey = "YOUR_API";
const commonHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${apiKey}`,
};

export async function streamChat(args) {
  const { messages, config, onChunk } = args;

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
    .map((str) => {
      return str.trim();
    })
    .filter((str) => str.startsWith("data: {")) // Solo conservar líneas que parecen contener JSON válido
    .map((str) => {
      try {
        // Remover el prefijo "data: " y luego parsear el JSON
        return JSON.parse(str.substring(6));
      } catch (e) {
        console.error("Error parsing JSON:", e);
        return null; // Devolver null si hay un error de parseo
      }
    })
    .filter((item) => item !== null); // Filtrar elementos nulos que resultaron de un error de parseo

  return items.map((item) => item?.choices?.[0]?.delta?.content).join("");
}
