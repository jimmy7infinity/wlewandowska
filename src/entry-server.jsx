import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { ThemeProvider } from './theme/ThemeContext.jsx'

export function render() {
  return renderToString(
    <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </React.StrictMode>,
  )
}
