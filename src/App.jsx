import './App.css'
import { useState } from 'react'
import Customization from './components/Customization/Customization'
import Preview from './components/Preview/Preview'
import { shonkVariants } from './shonks';

function App() {
  const [colors, setColors] = useState(["#FFFFFF"]);
  const [variant, setVariant] = useState("Variant #1");

  return (
    <>
      <header>
        <h1>Shonk Generator</h1>
      </header>
      <main>
        <Customization
          colors={colors}
          setColors={setColors}
          variant={variant}
          setVariant={setVariant}
        />
        <Preview
          colors={colors}
          variant={shonkVariants[variant]}
        />
      </main>
    </>
  )
}

export default App
