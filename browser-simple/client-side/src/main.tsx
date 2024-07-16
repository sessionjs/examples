import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { LoaderWrapper } from './loader'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoaderWrapper>
      <App />
    </LoaderWrapper>
  </React.StrictMode>,
)
