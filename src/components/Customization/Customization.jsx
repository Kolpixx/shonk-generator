import './Customization.css'
import { updateShonk } from '../../utils'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { accentColor } from '../../consts'
import ColorSelector from '../ColorSelector/ColorSelector'
import Checkbox from '../Checkbox/Checkbox'

export default function Customization() {
    const [colorInputs, setColorInputs] = useState([<ColorSelector />])

    return (
        <section id="customization" data-title="Settings">
            <div id="customization-colors">
                <h2>Colors</h2>
                <div id="customization-colors-buttons">
                    {colorInputs}
                    <button className="pointer" id="add-color" onClick={() => {{setColorInputs([...colorInputs, <ColorSelector colorInputsLength={colorInputs.length} />]); updateShonk();}}}><Plus size={44} color={accentColor} strokeWidth={1.75} /></button>
                </div>
            </div>
            <div id="customization-preferences">
                <h2>Preferences</h2>
                <div id="customization-preferences-settings">
                    <div className="settings-checkbox">
                        <Checkbox defaultValue={false} />
                        <label for="option-loop">Loop</label>
                    </div>
                </div>
            </div>
        </section>
    )
}