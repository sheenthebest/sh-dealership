fx_version 'adamant'
game 'gta5'
lua54 'yes'

author 'sheen'
description 'Elevator'
version '1.0'

shared_scripts {
    '@ox_lib/init.lua',
}

client_scripts {
    'client/client.lua',
}

ui_page 'html/index.html'
files { 
    'config.lua',
    
    'html/images/**.png',
    'html/index.html', 
    'html/script.js',
    'html/config.js',
    'html/styles.css',
}

escrow_ignore {
    '**.lua',
}
