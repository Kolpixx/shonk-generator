import './ColorSelector.css'
import { useEffect } from 'react';
import { updateShonk } from '../../utils';

export default function ColorSelector({color, index, colors, setColors}) {
    function selectColor() {
        const input = document.createElement("input");
        input.type = "color";
        input.defaultValue = "#FFFFFF";
        input.click();

        input.addEventListener("change", (e) => {
            const newArray = [...colors];
            newArray.splice(index, 1, e.target.value);

            setColors(newArray);
        });
    }

    // Somehow need to tell the user that you can delete colors w/ right click or maybe not idk.
    function removeColor() {
        if (index === 0 && colors.length === 1) {
            console.log("Index of the element is '0' and the length of Array 'colors' is '1'. Won't delete.")
            return;
        }

        const newArray = [...colors];
        console.log("Removing color:", newArray.splice(index, 1));

        setColors(newArray);
    }

    function handleOnContextMenu(e) {
        e.preventDefault();
        console.log("Right click/context menu detected: Trying to remove color...");

        removeColor();
    }

    function handleMouseDown(e) {
        if (e.button === 1) {
            e.preventDefault();
            console.log("Middle click detected: Trying to remove color");

            removeColor();
        }
    }

    useEffect(() => {
        updateShonk();
    }, [color]);

    useEffect(() => {
        selectColor();
    }, []);

    return (
        <div 
            className="color-picker pointer"
            onClick={selectColor}
            style={{backgroundColor: color}}
            data-color={color}
            onContextMenu={(e) => {handleOnContextMenu(e)}}
            onMouseDown={(e) => {handleMouseDown(e)}}>
        </div>
    )
}