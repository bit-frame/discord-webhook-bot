local HttpService = game:GetService("HttpService")

local BitHook = {}

function BitHook.SendMessage(cloudflareWorkerUrl, discordWebhookUrl, authToken, embed)
	local payload = HttpService:JSONEncode({
		webhookUrl = discordWebhookUrl,
		embed = embed
	})

	local headers = {
		["Authorization"] = "Bearer " .. authToken
	}
	local success, response = pcall(function()
		return HttpService:PostAsync(cloudflareWorkerUrl, payload, Enum.HttpContentType.ApplicationJson, false, headers)
	end)
	if success then
		return response
	else
		warn("Failed to send message:", response)
		return nil
	end
end

return BitHook
