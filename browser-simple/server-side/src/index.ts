import { Elysia } from 'elysia'
import cors from '@elysiajs/cors'
import { BunNetworkRemoteServer } from '@session.js/bun-network-remote'
const network = new BunNetworkRemoteServer()

const app = new Elysia()
  .use(cors({
    // I *highly* recommend you changing this origin to your actual host
    // that will have client-side like this: `origin: 'example.org'`. 
    // You can also leave it like this to allow anyone to make requests 
    // to your server, but this way you're essentially creating a public 
    // API that other Session web clients can use without hosting their 
    // own frontends.
    origin: true
  }))
  .post('/', ({ body }) => network.onRequest(body))
  .listen(process.env.PORT || 8000)

console.log(
  `Server running at ${app.server?.hostname}:${app.server?.port}`
);
