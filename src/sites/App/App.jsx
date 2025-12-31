import './App.css'
import { useState } from 'react'
import { shonkVariants } from '../../shonks';
import { GitBranch } from 'lucide-react';
import Customization from '../../components/Customization/Customization'
import Preview from '../../components/Preview/Preview'
import { textColor2 } from '../../consts';

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
      <footer>
        <a href="./credits">Credits</a>
        <GitBranch
          size={44}
          color={textColor2}
          strokeWidth={1.75}
          className="pointer"
          onClick={() => window.open("https://github.com/Kolpixx/shonk-generator/")}
        />
      </footer>
    </>
  )
}

export default App
