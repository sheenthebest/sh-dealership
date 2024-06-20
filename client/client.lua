-- variables
local config = require 'config'

-- functions --
local function OpenUI()
    SetNuiFocus(true, true)
    SendNUIMessage({ 
        action = 'SHOW_UI'
    })
end

-- nui callbacks --
RegisterNUICallback('CLOSE_UI', function()
    SetNuiFocus(false, false)
end)

RegisterNUICallback('BUY_VEHICLE', function(data, cb)
    print(json.encode(data, {indent=true}))
end)

RegisterNUICallback('TEST_DRIVE', function(data, cb)
    print(json.encode(data, {indent=true}))
end)

-- commands --
RegisterCommand('testui', function()
    OpenUI()
end)
