import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/error-boundary.tsx'
import { ErrorBoundaryFallbackPage } from './pages/error-boundary-fallback.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorBoundaryFallbackPage />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
