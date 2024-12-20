# Discord Cloudflare Worker Proxy

## Tutorial
Find the original tutorial on how to make a webhook with cloudflare [here](https://devforum.roblox.com/t/webhooks-how-to-use-cloudflare-workers-for-sending-discord-messages/3296869)

1. Create a Webhook on discord.
2. Go to `Cloudflare > Workers > Create` a Worker and create a worker. Make sure the worker supports `URL` and `URLSearchParams`
3. Go to `cloudflare.js` and paste into the code editor
4. Replace `yourwebhookurl` with the Discord Webhook you created.
5. Press Deploy and let it deploy
6. Go into roblox studio and paste in the `playerJoined.lua` code
7. Enable Http Requests in `Game Settings > Security` 
8. Replace `yourworkerurl` with the worker url of the worker you created. Example url: `https://your-dyno-url.workers.dev/`
9. Now publish your place and join the game.
    It should now display a player joined message if you have done this correctly.

## How to use cloudflare-expanded 

To use the cloudflare-expanded you can request the urls with the perfix `?webhookId` like this

`https://your-dyno-url.workers.dev/?webhookId=webhook1`
`https://your-dyno-url.workers.dev/?webhookId=webhook2`

You can now edit the script in roblox studio to have mutliple webhooks, You can set up admin logs or anything that needs to be logged with this.
