import './Customization.css'
import { updateShonk } from '../../utils'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { accentColor } from '../../consts'

export default function Customization() {
    const [colorInputs, setColorInputs] = useState([<input id="color-1" className="color-picker" type="color" defaultValue="#FFFFFF" onChange={updateShonk}></input>])

    return (
        <section id="customization" data-title="Settings">
            <div id="customization-colors">
                <h2>Colors</h2>
                <div id="customization-colors-buttons">
                    {colorInputs}
                    <button id="add-color" onClick={() => {{setColorInputs([...colorInputs, <input id={`color-${colorInputs.length + 1}`} className="color-picker" type="color" defaultValue="#FFFFFF" onChange={updateShonk}></input>]); updateShonk()}}}><Plus size={44} color={accentColor} strokeWidth={1.75} /></button>
                </div>
            </div>
            <div id="customization-preferences">
                <h2>Preferences</h2>
                <div id="customization-preferences-settings">
                    <div className="settings-checkbox">
                        <input id="option-loop" type="checkbox" onChange={updateShonk}></input>
                        <label for="option-loop">Loop</label>
                    </div>
                </div>
            </div>
        </section>
    )
}