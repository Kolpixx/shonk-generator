import './PresetColors.css'

export default function PresetColors({ setColors, label, colorCombination, shonkArray }) {
    function updateColors() {
        const newColorCombination = [...colorCombination];
        if (colorCombination.length > shonkArray.length) {
            newColorCombination.splice((colorCombination.length - (colorCombination.length - shonkArray.length)) - 1, colorCombination.length - shonkArray.length);
        }
        setColors(newColorCombination);
    }

    return (
        <div title={label} className="preset-color-combination pointer" onClick={() => updateColors()}>
            {colorCombination.map((color, index) => <div key={`color-${index}`} style={{backgroundColor: color}}></div> )}
        </div>
    )
}