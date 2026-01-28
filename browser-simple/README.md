# Session web client example with @session.js/client

This example demonstrates how to use @session.js/client in web and @session.js/bun-network-remote to connect to Session network.

If you're not JavaScript developer looking for the way to use @session.js and instead looking for full-featured Session messenger web client, go to [Session Web](https://git.hloth.dev/hloth/session-web) client by hloth.dev.

This repository is for Session clients developers, not Session users.

## Installation

This example requires [Bun.sh](https://bun.sh) installed and basic knowledge of JavaScript, web technologies, React and [Vite](https://vitejs.dev/).

1. Clone this repository, open `browser-simple` directory
2. Go to `client-side` and `server-side` directories and install dependencies using `bun install` in each of them
3. Start server by typing `PORT=8000 bun start` in `server-side` directory. If this port is occupied, you can change it, but beware that you will also need to change it in .env file in `browser-simple` directory
4. Start client side by typing `bun run dev` in `client-side` directory, you should see something like `Server running at localhost:8000`. Open that url
5. Now you should see simple UI in your browser that lets you send messages to anyone in Session network from browser.

This example aims for simplicity, so you can start from scratch. As soon as you understand how proxying requests from browser to bun running in `server-side` directory works, you can start building complex web client with any supported @session.js/client features such as files and images attachemnts, ONS resolving and messages polling.

## Where to start?

Start by looking into client-side/src/app.tsx (also check out loader.tsx) and server-side/src/index.ts to get understanding of how separating client and server works.