import './App.css'
import { createContext, useState } from 'react'
import { shonkVariants } from '../../shonks';
import { GitBranch } from 'lucide-react';
import { textColor2 } from '../../consts';
import { Link } from 'react-router-dom';
import Customization from '../../components/Customization/Customization'
import Preview from '../../components/Preview/Preview'

export const VariantContext = createContext(undefined);
export const ColorsContext = createContext(undefined);
export const LoopedContext = createContext(undefined);

function App() {
  const [colors, setColors] = useState(["#FFFFFF"]);
  const [variant, setVariant] = useState("Variant #1");
  const [looped, setLooped] = useState(false);

  return (
    <LoopedContext value={[looped, setLooped]}>
      <ColorsContext value={[colors, setColors]}>
        <VariantContext value={[variant, setVariant]}>
          <header>
            <h1>Shonk Generator</h1>
          </header>
          <main>
            <Customization
              colors={colors}
              setColors={setColors}
              variant={variant}
            />
            <Preview
              colors={colors}
              variant={shonkVariants[variant]}
            />
          </main>
          <footer>
            <Link to={"/credits"}>Credits</Link>
            <GitBranch
              size={44}
              color={textColor2}
              strokeWidth={1.75}
              className="pointer"
              onClick={() => window.open("https://github.com/Kolpixx/shonk-generator/")}
            />
          </footer>
        </VariantContext>
      </ColorsContext>
    </LoopedContext>
  )
}

export default App
