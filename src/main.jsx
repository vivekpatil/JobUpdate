import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { PublicClientApplication } from '@azure/msal-browser'
// import { MsalProvider } from '@azure/msal-react'

// const msalConfig = {
//   auth: {
//     clientId: 'YOUR_ENTRA_CLIENT_ID', // TODO: Replace with your Entra (Azure AD) client ID
//     authority: 'https://login.microsoftonline.com/common',
//     redirectUri: window.location.origin,
//   },
// }
// const msalInstance = new PublicClientApplication(msalConfig)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <MsalProvider instance={msalInstance}> */}
      <App />
    {/* </MsalProvider> */}
  </StrictMode>,
)
