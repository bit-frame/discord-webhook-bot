export default {
  async fetch(request) {
      if (request.method !== 'POST') {
          return new Response('Method not allowed', { status: 405 });
      }

      try {
          const contentType = request.headers.get('Content-Type') || '';
          if (!contentType.includes('application/json')) {
              return new Response('Invalid content type', { status: 400 });
          }

          const { author, message, color } = await request.json();

          if (!author || !message || !color) {
              return new Response(
                  JSON.stringify({ error: 'Missing required fields: author, message, color' }),
                  { status: 400, headers: { 'Content-Type': 'application/json' } }
              );
          }

          const embedPayload = JSON.stringify({
              embeds: [
                  {
                      author: { name: author },
                      description: message,
                      color: parseInt(color.replace('#', ''), 16),
                  },
              ],
          });

          const discordWebhookUrl = 'yourwebhookurl';
          const discordResponse = await fetch(discordWebhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: embedPayload,
          });

          if (discordResponse.ok) {
              return new Response(
                  JSON.stringify({ status: 'Message sent successfully!' }),
                  { status: 200, headers: { 'Content-Type': 'application/json' } }
              );
          } else {
              const discordError = await discordResponse.text();
              return new Response(
                  JSON.stringify({ error: 'Discord Error', details: discordError }),
                  { status: discordResponse.status, headers: { 'Content-Type': 'application/json' } }
              );
          }
      } catch (err) {
          return new Response(
              JSON.stringify({ error: err.message }),
              { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
      }
  },
};
