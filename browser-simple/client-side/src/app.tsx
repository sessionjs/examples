import React from 'react'

// Generates random data for a random Session ID
import { generateSeedHex } from '@session.js/keypair'

// Converts this data to a readable 13-word mnemonic
import { encode } from '@session.js/mnemonic'

// The main component of the Session client (literally @session.js/client)
// Handles everything related to the Session encryption and functionality
// Keeps private keys that are used to encrypt messages, never sends them
import { Session } from '@session.js/client'

// Sends encrypted payloads to the server that forwards them to Session nodes
import { BunNetworkRemoteClient } from '@session.js/bun-network-remote'

// proxyUrl must be set to the server-side proxy URL
// We're using Vite.js's way of getting environment variables from .env file in /client-side directory
// But you can also hardcode it like so: const proxyUrl = 'https://example.org/' (make sure that server-side proxy is running on that url)
const proxyUrl = import.meta.env.VITE_PROXY_URL

export function App() {
  const [session, setSession] = React.useState<Session | null>(null)
  const [recipient, setRecipient] = React.useState('')
  const [text, setText] = React.useState('')
  const [sending, setSending] = React.useState(false)

  React.useEffect(() => {
    const network = new BunNetworkRemoteClient({ proxy: proxyUrl })
    const session = new Session({ network })
    const mnemonic = encode(generateSeedHex())
    session.setMnemonic(mnemonic, 'its a me, browser!')
    setSession(session)
  }, [])

  const handleSendMessage = async () => {
    if(!recipient || recipient.length !== 66) {
      alert('Session ID is invalid')
      return
    }
    if(!/^05[a-f0-9]+$/.test(recipient)) {
      alert('Session ID is invalid')
      return
    }
    if(text.length === 0) {
      alert('Message is empty')
      return
    }

    setSending(true)
    try {
      await session?.sendMessage({ to: recipient, text })
      setText('')
      alert('Message sent! Check your Session inbox')
    } catch(e) {
      alert('Error sending message')
      console.error(e)
    } finally {
      setSending(false)
    }
  }

  return (
    <main>
      <input 
        type="text" 
        value={recipient} 
        onChange={e => setRecipient(e.target.value)} 
        placeholder='Session ID'
        maxLength={66}
        disabled={sending}
      />
      <textarea 
        value={text} 
        onChange={e => setText(e.target.value)}
        placeholder='Message...'
        maxLength={2048}
        disabled={sending}
      ></textarea>
      <button 
        onClick={handleSendMessage}
        disabled={sending}
      >
        Send
      </button>
    </main>
  )
}