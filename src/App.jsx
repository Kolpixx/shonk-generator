import { useState } from 'react'
import './App.css'
import Customization from './components/Customization/Customization'
import Preview from './components/Preview/Preview'

function App() {
  const [colors, setColors] = useState(["#FFFFFF"]);

  return (
    <>
      <header>
        <h1>Shonk Generator</h1>
      </header>
      <main>
        <Customization
          colors={colors}
          setColors={setColors}
        />
        <Preview
          colors={colors}
        />
      </main>
    </>
  )
}

export default App
