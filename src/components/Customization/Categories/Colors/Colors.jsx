import './Colors.css'
import { useContext, useState } from 'react'
import { ColorsContext, HasSeenTipContext } from '../../../../sites/App/App'
import { presetColors } from '../../../../consts';
import PresetColors from '../../PresetColors/PresetColors';
import ColorSelector from '../../../ColorSelector/ColorSelector'
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

export default function ColorsCategory({ updateShonk, shonkArray }) {
    const [colors, setColors] = useContext(ColorsContext);
    const [showingPresets, showPresets] = useState(false);
    const [hasSeenTip, setHasSeenTip] = useContext(HasSeenTipContext);

    const presetColorCombinations = [];
    for (const colorCombinationLabel in presetColors) {
        const colorCombination = presetColors[colorCombinationLabel];

        presetColorCombinations.push(<PresetColors setColors={setColors} label={colorCombinationLabel} colorCombination={colorCombination} shonkArray={shonkArray} key={`combination-${presetColorCombinations.length}`} />)
    }

    return (
        <>
            <div id="customization-colors">
                <h2>Colors</h2>
                <div id="customization-colors-buttons">
                    {colors.map((color, index) => 
                        <ColorSelector
                            key={`color-${index}`}
                            color={color}
                            index={index}
                            colors={colors}
                            setColors={setColors}
                            updateShonk={updateShonk}
                        />
                    )}
                    {shonkArray.length > colors.length &&
                        <button className="pointer" id="add-color" onClick={() => {setColors([...colors, "#FFFFFF"])}}>
                            <Plus
                                size={44}
                                strokeWidth={1.75}
                            />
                        </button>
                    }
                    {
                        !hasSeenTip &&
                        <>
                            <div id="colors-tip-backdrop" onClick={() => setHasSeenTip(true)} />
                            <div id="colors-tip">
                                <button id="colors-tip-close" onClick={(e) => {e.stopPropagation(); setHasSeenTip(true);}}> {/* Top Right: Smol & 100% Round Close Button with border? :3 */}
                                    <X
                                        size={20}
                                    />
                                </button>
                                <h2>Tip!</h2>
                                <p id="colors-text">
                                    Left Click: Change Color<br />
                                    Right Click: Remove Color
                                </p>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div id="presets">
                <h2 className="pointer" onClick={() => showPresets(!showingPresets)}>Presets {showingPresets ? <ChevronUp size={32} strokeWidth={2} /> : <ChevronDown size={32} strokeWidth={2} />}</h2>
                {showingPresets && (
                    <div id="preset-combinations">
                        {presetColorCombinations}
                    </div>
                )}
            </div>
        </>
    )
}