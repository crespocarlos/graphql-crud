import React from 'react'

const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="container">{children}</div>
}

export default App
