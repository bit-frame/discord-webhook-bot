local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

local url = "yourworkerurl"

local function sendJoinNotification(playerName)
	local data = {
		author = "Your Personal Notifcation Bot",
		message = playerName .. " has joined the game!",
		color = "#00FF00"
	}

	local jsonData = HttpService:JSONEncode(data)

	local success, response = pcall(function()
		return HttpService:PostAsync(url, jsonData, Enum.HttpContentType.ApplicationJson)
	end)

	if success then
		print(playerName .. " join notification sent successfully!")
		print(response)
	else
		print("Error sending join notification for " .. playerName, response)
	end
end

Players.PlayerAdded:Connect(function(player)
	sendJoinNotification(player.Name)
end)
