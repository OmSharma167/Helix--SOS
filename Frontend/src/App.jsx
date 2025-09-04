
import React from "react";
import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold">🚀 React + Tailwind Setup Done!</h1>
    </div>
  );
}

export default App
