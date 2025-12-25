import { useEffect, useState } from 'react';
import './ColorSelector.css'
import { updateShonk } from '../../utils';

export default function ColorSelector({ colorInputsLength }) {
    const [color, setColor] = useState("#FFFFFF");

    function selectColor() {
        const input = document.createElement("input");
        input.type = "color";
        input.defaultValue = "#FFFFFF";
        input.click();

        input.addEventListener("change", (e) => {
            setColor(e.target.value);
        });
    }

    useEffect(() => {
        updateShonk();
    }, [color]);

    return (
        <div className="color-picker" id={`color-${colorInputsLength + 1}`} onClick={selectColor} style={{backgroundColor: color}} data-color={color}></div>
    )
}