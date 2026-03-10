import './Colors.css'
import { useContext, useState } from 'react'
import { ColorsContext } from '../../../../sites/App/App'
import { presetColors, textColor } from '../../../../consts';
import PresetColors from '../../PresetColors/PresetColors';
import ColorSelector from '../../../ColorSelector/ColorSelector'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';

export default function ColorsCategory({ updateShonk, shonkArray }) {
    const [colors, setColors] = useContext(ColorsContext);
    const [showingPresets, showPresets] = useState(false);

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
                                color={textColor}
                                strokeWidth={1.75}
                            />
                        </button>
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