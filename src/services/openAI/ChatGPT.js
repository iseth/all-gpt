export const chatGptResponse = (message, onNewResponse) => {
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    stream: true,
    max_tokens: 60,
  };

  const extraOptions = {
    reactNative: { textStreaming: true },
  };

  // const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //   method: "POST",
  //   headers: this.commonHeaders,
  //   body: JSON.stringify({
  //     ...config,
  //     stream: true,
  //     messages,
  //   }),
  //   ...extraOptions,
  // });
  //
  fetch("https://api.openai.com/v1/chat/completions", {
    reactNative: { textStreaming: true },
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_API",
    },
    body: JSON.stringify(data),
    ...extraOptions,
  })
    .then((response) => {
      const reader = response.body?.getReader();
      if (!reader) {
        console.error("Error: fail to read data from response");
      }

      // const reader = response.body.getReader();

      // Función para leer cada chunk del stream
      function read() {
        return reader.read().then(({ done, value }) => {
          if (done) {
            return;
          }
          const textChunk = new TextDecoder("utf-8").decode(value);
          for (const obj of extraerDatos(textChunk)) {
            if (obj.choices[0].delta.content !== undefined) {
              const data = obj.choices[0].delta.content;
              onNewResponse(data); // Usa el callback para pasar los datos
            }
          }
          return read(); // Llama a read() recursivamente hasta que el stream se complete
        });
      }

      return read(); // Comienza a leer el stream
    })
    .catch((error) =>
      console.error("Error al solicitar la API de GPT-3.5 Turbo:", error),
    );
};

function* extraerDatos(inputString) {
  const dataRegex = /data: \{.*?\}(?=\s|$)/g;
  const matches = inputString.match(dataRegex);

  if (matches) {
    for (const match of matches) {
      const jsonPart = match.slice(6);
      try {
        const dataObject = JSON.parse(jsonPart);
        yield dataObject;
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }
}
