import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppProvider from './provider/AppProvider'
import ScrollToTop from './components/ScrollToTop.ts'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <ScrollToTop />
      <App />
      <Toaster
        position="bottom-right"
        theme="light"
        richColors
        duration={3000}
        className="z-[99999]"
        toastOptions={{
          classNames: {
            toast: 'animate-zoom-in-out'
          }
        }}
      />
    </AppProvider>
  </StrictMode>
)
