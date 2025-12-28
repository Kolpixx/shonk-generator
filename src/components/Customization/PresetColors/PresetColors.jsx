import './PresetColors.css'

export default function PresetColors({ setColors, label, colors }) {
    return (
        <div title={label} className="preset-color-combination pointer" onClick={() => setColors(colors)}>
            {colors.map(color => <div style={{backgroundColor: color}}></div> )}
        </div>
    )
}