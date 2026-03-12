import './Text.css'
import { useContext, useEffect } from 'react'
import { DropShadowContext, FontContext } from '../../../../sites/App/App'
import { fontVariants } from '../../../../consts';
import Dropdown from '../../../Dropdown/Dropdown';
import Checkbox from '../../../Checkbox/Checkbox';

export default function TextCategory({ updateShonk }) {
    const [font, setFont] = useContext(FontContext);
    const [dropShadow, setDropShadow] = useContext(DropShadowContext);

    useEffect(() => {
        updateShonk();
    }, [font]);

    return (
        <div id="customization-text">
            <h2>Font</h2>
            <div className="customization-settings">
                <Dropdown
                    options={fontVariants}
                    setState={setFont}
                    state={font}
                />
                <div className="settings-checkbox">
                    <Checkbox
                        setState={setDropShadow}
                        state={dropShadow}
                        updateShonk={updateShonk}
                        id="option-dropshadow"
                    />
                    <label for="option-dropshadow">Shadow</label>
                </div>
            </div>
        </div>
    )
}