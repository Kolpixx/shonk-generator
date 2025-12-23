import { default_shonk } from '../../shonks';
import './Preview.css'

export default function Preview() {
    const shonk = default_shonk();
    const shonkArray = shonk.split(/\r\n|\n/);
    
    return (
        <section id="preview" data-title="Preview">
            {shonkArray.map((line, index) => {
                return <p key={index} id={`preview-line-${index}`} style={{color: "white"}}>{line}</p>
            })}
        </section>
    )
}