local BitHook = require(game.ServerScriptService.BitHook)

local embed = {
	title = "Embed Title",
	description = "This is a detailed description of the embed.",
	url = "https://example.com",
	color = 16711680,

	author = {
		name = "81Frames",
		url = "https://example.com/author",
	},

	fields = {
		{
			name = "Field 1",
			value = "This is the value for field 1.",
			inline = true
		},
		{
			name = "Field 2",
			value = "This is the value for field 2.",
			inline = true
		}
	},

	footer = {
		text = "Footer text goes here",
	},

	timestamp = "2025-01-01T00:00:00Z"
}

local cloudflareWorkerUrl = "YOUR_CLOUDFLARE_WORKER"
local discordWebhookUrl = "YOUR_WEBHOOK_URL"
local authToken = "YOUR_API_TOKEN"

local response = BitHook.SendMessage(cloudflareWorkerUrl, discordWebhookUrl, authToken, embed)

if response then
	print("Response:", response)
else
	print("Failed to send message.")
end
