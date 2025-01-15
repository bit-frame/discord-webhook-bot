const rateLimitData = {};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const { method, headers, url } = request;

  if (method !== 'POST') {
    return new Response('Only POST requests are allowed', { status: 405 });
  }

  const AUTH_TOKEN = 'YOUR_AUTH_TOKEN';

  const authHeader = headers.get('Authorization');
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const body = await request.json();
    const webhookUrl = body.webhookUrl;
    const embed = body.embed;

    const payload = JSON.stringify({
      embeds: [embed],
    });

    if (!rateLimitData[webhookUrl]) {
      rateLimitData[webhookUrl] = {
        lastMessageTime: 0,
        queue: [],
      };
    }

    const currentTime = Date.now();
    const rateLimit = 500;
    if (currentTime - rateLimitData[webhookUrl].lastMessageTime < rateLimit) {
      rateLimitData[webhookUrl].queue.push({ payload, currentTime });
      return new Response('Rate limit reached. Message queued.', { status: 429 });
    } else {
      const discordResponse = await sendToDiscord(webhookUrl, payload);
      
      if (discordResponse.ok) {
        rateLimitData[webhookUrl].lastMessageTime = currentTime;
        return new Response('Message sent to Discord!', { status: 200 });
      } else {
        return new Response('Failed to send message to Discord.', { status: 500 });
      }
    }
  } catch (error) {
    return new Response('Invalid JSON or missing parameters', { status: 400 });
  }
}

async function sendToDiscord(webhookUrl, payload) {
  return await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  });
}

async function processMessageQueue() {
  Object.keys(rateLimitData).forEach(webhookUrl => {
    const webhookData = rateLimitData[webhookUrl];

    if (webhookData.queue.length > 0 && Date.now() - webhookData.lastMessageTime >= 500) {
      const message = webhookData.queue.shift();
      sendToDiscord(webhookUrl, message.payload)
        .then(response => {
          if (response.ok) {
            webhookData.lastMessageTime = Date.now();
          }
        })
        .catch(error => {
          console.error(`Failed to send queued message to ${webhookUrl}:`, error);
        });
    }
  });
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request).finally(() => {
    processMessageQueue();
  }));
});
