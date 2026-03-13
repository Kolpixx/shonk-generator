import './App.css'
import { createContext, useEffect, useState } from 'react'
import { shonkVariants } from '../../shonks';
import { GitBranch } from 'lucide-react';
import { presetColors } from '../../consts';
import { Link } from 'react-router-dom';
import Customization from '../../components/Customization/Customization'
import Preview from '../../components/Preview/Preview'
import { ToastContainer } from 'react-toastify';

export const VariantContext = createContext(undefined);
export const ColorsContext = createContext(undefined);
export const LoopedContext = createContext(undefined);
export const FontContext = createContext(undefined);
export const DropShadowContext = createContext(undefined);
export const HasSeenTipContext = createContext(undefined);
export const ScaleContext = createContext(undefined);
export const TransparentBGContext = createContext(undefined);
export const BackgroundColorContext = createContext(undefined);
export const CustomASCIIContext = createContext(undefined);

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
  const [customASCII, setCustomASCII] = useState(preferences.customASCII || "Press the edit button next to the variant selector to change this text\n\n:3");

  useEffect(() => {
    const params = new URLSearchParams(document.location.search);
    const preset = params.get("preset");

    if (preset !== null) {
      const presetJSON = JSON.parse(decodeURIComponent(atob(preset)));

      setColors(presetJSON.colors);
      setCustomASCII(presetJSON.customASCII);
      setDropShadow(presetJSON.dropShadow);
      setFont(presetJSON.font);
      setLooped(presetJSON.looped);
      setVariant(presetJSON.variant);
    }
  }, []);

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
      customASCII: customASCII,
      hasSeenTip: hasSeenTip
    }

    localStorage.setItem("preferences", JSON.stringify(preferencesJSON));
  }, [colors, variant, looped, font, dropShadow, scale, transparentBG, backgroundColor, hasSeenTip]);

  return (
    <CustomASCIIContext value={[customASCII, setCustomASCII]}>
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
                            variant={variant !== "Custom" ? shonkVariants[variant] : customASCII}
                          />
                        </main>
                        <footer>
                          <Link to={"/credits"}>Credits</Link>
                          <GitBranch
                            id="footer-repo-svg"
                            size={44}
                            strokeWidth={1.75}
                            className="pointer"
                            onClick={() => window.open("https://github.com/Kolpixx/shonk-generator/")}
                          />
                        </footer>
                        <ToastContainer
                          position="bottom-right"
                          theme="dark"
                          newestOnTop={true}
                          closeOnClick={true}
                          autoClose={1500}
                        />
                      </VariantContext>
                    </ColorsContext>
                  </LoopedContext>
                </FontContext>
              </DropShadowContext>
            </HasSeenTipContext>
          </ScaleContext>
        </TransparentBGContext>
      </BackgroundColorContext>
    </CustomASCIIContext>
  )
}

export default App
