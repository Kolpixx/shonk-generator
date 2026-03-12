import './App.css'
import { createContext, useEffect, useState } from 'react'
import { shonkVariants } from '../../shonks';
import { GitBranch } from 'lucide-react';
import { presetColors, textColor2 } from '../../consts';
import { Link } from 'react-router-dom';
import Customization from '../../components/Customization/Customization'
import Preview from '../../components/Preview/Preview'

export const VariantContext = createContext(undefined);
export const ColorsContext = createContext(undefined);
export const LoopedContext = createContext(undefined);
export const FontContext = createContext(undefined);
export const DropShadowContext = createContext(undefined);
export const HasSeenTipContext = createContext(undefined);
export const ScaleContext = createContext(undefined);
export const TransparentBGContext = createContext(undefined);
export const BackgroundColorContext = createContext(undefined);

function App() {
  const preferences = JSON.parse(localStorage.getItem("preferences")) || {};

  const [colors, setColors] = useState(preferences.colors || presetColors["Rainbow Pride"]);
  const [variant, setVariant] = useState(preferences.variant || "Variant #1");
  const [looped, setLooped] = useState(preferences.looped || false);
  const [font, setFont] = useState(preferences.font || "JetBrains Mono NL");
  const [dropShadow, setDropShadow] = useState(preferences.dropShadow !== undefined ? preferences.dropShadow : true);
  const [scale, setScale] = useState(preferences.scale || 2);
  const [transparentBG, setTransparentBG] = useState(preferences.transparentBG !== undefined ? preferences.transparentBG : true);
  const [backgroundColor, setBackgroundColor] = useState(preferences.transparentBG || "#000000")
  const [hasSeenTip, setHasSeenTip] = useState(preferences.hasSeenTip || false);

  useEffect(() => {
    const preferencesJSON = {
      colors: colors,
      variant: variant,
      looped: looped,
      font: font,
      dropShadow: dropShadow,
      scale: scale,
      transparentBG: transparentBG,
      backgroundColor: backgroundColor,
      hasSeenTip: hasSeenTip
    }

    localStorage.setItem("preferences", JSON.stringify(preferencesJSON));
  }, [colors, variant, looped, font, dropShadow, scale, transparentBG, backgroundColor, hasSeenTip]);

  return (
    <BackgroundColorContext value={[backgroundColor, setBackgroundColor]}>
      <TransparentBGContext value={[transparentBG, setTransparentBG]}>
        <ScaleContext value={[scale, setScale]}>
          <HasSeenTipContext value={[hasSeenTip, setHasSeenTip]}>
            <DropShadowContext value={[dropShadow, setDropShadow]}>
              <FontContext value={[font, setFont]}>
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
              </FontContext>
            </DropShadowContext>
          </HasSeenTipContext>
        </ScaleContext>
      </TransparentBGContext>
    </BackgroundColorContext>
  )
}

export default App
