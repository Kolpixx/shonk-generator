import './Customization.css'
import { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, Plus, SquarePen } from 'lucide-react'
import { presetColors, textColor } from '../../consts'
import { shonkVariants } from '../../shonks'
import ColorSelector from '../ColorSelector/ColorSelector'
import Checkbox from '../Checkbox/Checkbox'
import PresetColors from './PresetColors/PresetColors'
import Dropdown from '../Dropdown/Dropdown'
import EditingModal from './EditingModal/EditingModal'

export default function Customization({ colors, setColors, variant, setVariant }) {
    const [showingPresets, showPresets] = useState(false);
    const [showingEditButton, showEditButton] = useState(false);
    const [showingEditingScreen, showEditingScreen] = useState(false);

    const shonkArray = shonkVariants[variant].split(/\r\n|\n/);

    function updateShonk() {
        setColors([...colors]);
    }

    useEffect(() => {
        if (variant === "Custom") {
            showEditButton(true);
        }

        if (colors.length > shonkArray.length) {
            console.log()
            colors.splice((colors.length - (colors.length - shonkArray.length)) - 1, colors.length - shonkArray.length);
            updateShonk();
        }
    }, [variant]);

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
                    <div className="settings-variants">
                        <Dropdown
                            options={shonkVariants}
                            state={variant}
                            setState={setVariant}
                        />
                        {showingEditButton &&
                            <button id="edit-custom-button">
                                <SquarePen 
                                    size={36}
                                    color={textColor}
                                    strokeWidth={1.75}
                                    onClick={() => {showEditingScreen(true)}}
                                />
                            </button>
                        }
                        {showingEditingScreen &&
                            <EditingModal
                                showEditingScreen={showEditingScreen}
                                updateShonk={updateShonk}
                            />
                        }
                    </div>
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