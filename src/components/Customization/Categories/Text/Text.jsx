import './Text.css'
import { useContext, useEffect } from 'react'
import { FontContext } from '../../../../sites/App/App'
import { fontVariants } from '../../../../consts';
import Dropdown from '../../../Dropdown/Dropdown';

export default function TextCategory({ updateShonk }) {
    const [font, setFont] = useContext(FontContext);

    useEffect(() => {
        updateShonk();
    }, [font]);

    return (
        <div id="customization-text">
            <h2>Font</h2>
            <Dropdown
                options={fontVariants}
                setState={setFont}
                state={font}
            />
        </div>
    )
}