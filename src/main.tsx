import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/sonner'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('No root element')
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />

      <Toaster />
    </ThemeProvider>
  </StrictMode>
)
