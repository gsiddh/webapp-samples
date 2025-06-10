import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { requestPermissionAndToken, setupForegroundMessageHandler } from './firebase'

function App() {
  const [count, setCount] = useState(0)
  const [notificationPermission, setNotificationPermission] = useState<'granted' | 'denied' | 'default'>('default')
  const [fcmToken, setFcmToken] = useState<string | null>(null)

  useEffect(() => {
    // Request permission and get token
    requestPermissionAndToken().then(token => {
      if (token) {
        setFcmToken(token)
        // Send token to your server
        console.log('FCM Token:', token)
      }
    })

    // Set up foreground message handler
    setupForegroundMessageHandler()

    // Listen for permission changes
    const permissionObserver = new MutationObserver(() => {
      setNotificationPermission(Notification.permission)
    })

    permissionObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      permissionObserver.disconnect()
    }
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="notification-status">
        <p>Notification Permission: {notificationPermission}</p>
        {fcmToken && (
          <p>FCM Token: {fcmToken.substring(0, 20)}...</p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
