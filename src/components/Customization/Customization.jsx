import './Customization.css'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { accentColor, presetColors } from '../../consts'
import { shonkVariants } from '../../shonks'
import ColorSelector from '../ColorSelector/ColorSelector'
import Checkbox from '../Checkbox/Checkbox'
import PresetColors from './PresetColors/PresetColors'
import Dropdown from '../Dropdown/Dropdown'

export default function Customization({ colors, setColors, variant, setVariant }) {
    const [showingPresets, showPresets] = useState(false);

    function updateShonk() {
        setColors([...colors]);
    }

    const presetColorCombinations = [];

    for (const colorCombination in presetColors) {
        presetColorCombinations.push(<PresetColors setColors={setColors} label={colorCombination} colors={presetColors[colorCombination]} key={`combination-${presetColorCombinations.length}`} />)
    }

    return (
        <section id="customization" data-title="Settings">
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
                    <button className="pointer" id="add-color" onClick={() => {setColors([...colors, "#FFFFFF"])}}>
                        <Plus
                            size={44}
                            color={accentColor}
                            strokeWidth={1.75}
                        />
                    </button>
                </div>
            </div>
            <div id="customization-preferences">
                <h2>Preferences</h2>
                <div id="customization-preferences-settings">
                    <div className="settings-checkbox">
                        <Checkbox
                            defaultValue={false}
                            updateShonk={updateShonk}
                        />
                        <label htmlFor="option-loop">Loop</label>
                    </div>
                        <Dropdown
                            options={shonkVariants}
                            state={variant}
                            setState={setVariant}
                        />
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
        </section>
    )
}