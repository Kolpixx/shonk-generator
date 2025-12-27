import './Customization.css'
import { Plus } from 'lucide-react'
import { accentColor } from '../../consts'
import ColorSelector from '../ColorSelector/ColorSelector'
import Checkbox from '../Checkbox/Checkbox'

export default function Customization({ colors, setColors }) {
    function updateShonk() {
        setColors([...colors]);
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
                </div>
            </div>
        </section>
    )
}