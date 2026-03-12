import './General.css'
import { useContext, useEffect, useState } from 'react'
import { SquarePen } from 'lucide-react'
import { shonkVariants } from '../../../../shonks'
import { textColor } from '../../../../consts'
import { LoopedContext, VariantContext } from '../../../../sites/App/App'
import Checkbox from '../../../Checkbox/Checkbox'
import Dropdown from '../../../Dropdown/Dropdown'
import EditingModal from '../../EditingModal/EditingModal'

export default function GeneralCategory({ updateShonk }) {
    const [showingEditButton, showEditButton] = useState(false);
    const [showingEditingScreen, showEditingScreen] = useState(false);
    const [variant, setVariant] = useContext(VariantContext);
    const [looped, setLooped] = useContext(LoopedContext);

    useEffect(() => {
        if (variant === "Custom") {
            showEditButton(true);
        } else {
            showEditButton(false);
        }
    }, [variant, showEditingScreen]);
    
    return (
        <div id="customization-preferences">
            <h2>Preferences</h2>
            <div className="customization-settings">
                <div className="settings-checkbox">
                    <Checkbox
                        updateShonk={updateShonk}
                        state={looped}
                        setState={setLooped}
                        id="option-loop"
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
    )
}