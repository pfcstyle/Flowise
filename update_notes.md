# Update copyright
* packages/ui/src/views/chatbot/index.jsx
* packages/ui/src/views/chatflows/EmbedChat.jsx

```
theme={{
    chatWindow: {
        ...chatbotTheme,
        footer: {
            textColor: '#303235',
            text: 'Powered by',
            company: 'Esri',
            companyLink: 'https://esri.com'
        }
    }
}}


```

# replace logo and change name
* packages/ui/public/index.html
* packages/ui/src/assets/images/flowise_logo.png
* packages/ui/src/assets/images/flowise_logo_dark.png

# Change menu item
* packages/ui/src/menu-items/dashboard.js
* packages/ui/src/views/agentflows/index.jsx


# clear cache to run
```
pnpm store prune
pnpm clean
// 删除所有的node_modules
pnpm install
pnpm build-force
pnpm start / pnpm dev
```

