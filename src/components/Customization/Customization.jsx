import './Customization.css'
import { useContext, useEffect, useState } from 'react'
import { CaseSensitive, Hammer, Palette } from 'lucide-react'
import { shonkVariants } from '../../shonks'
import { VariantContext } from '../../sites/App/App'
import GeneralCategory from './Categories/General/General'
import ColorsCategory from './Categories/Colors/Colors'
import TextCategory from './Categories/Text/Text'

export default function Customization({ colors, setColors }) {
    const [category, setCategory] = useState("general");
    const [variant, setVariant] = useContext(VariantContext);

    let shonkArray = shonkVariants[variant].split(/\r\n|\n/);

    function updateShonk() {
        setColors([...colors]);
    }

    useEffect(() => {
        shonkArray = shonkVariants[variant].split(/\r\n|\n/);

        if (colors.length > shonkArray.length) {
            colors.splice((colors.length - (colors.length - shonkArray.length)) - 1, colors.length - shonkArray.length);
            updateShonk();
        }
    }, [variant]);

    return (
        <section id="customization" data-title="Settings">
            <ul id="customization-category-nav">
                <li onClick={() => setCategory("general")} style={{backgroundColor: category === "general" && "var(--background-2)"}}>
                    <Hammer
                        size={32}
                        strokeWidth={1.75}
                    />
                </li>
                <li onClick={() => setCategory("colors")} style={{backgroundColor: category === "colors" && "var(--background-2)"}}>
                    <Palette
                        size={32}
                        strokeWidth={1.75}
                    />
                </li>
                <li onClick={() => setCategory("text")} style={{backgroundColor: category === "text" && "var(--background-2)"}}>
                    <CaseSensitive
                        size={32}
                        strokeWidth={1.75}
                    />
                </li>
            </ul>
            {category === "general" && <GeneralCategory updateShonk={updateShonk} />}
            {category === "colors" && <ColorsCategory updateShonk={updateShonk} shonkArray={shonkArray} />}
            {category === "text" && <TextCategory updateShonk={updateShonk} />}
        </section>
    )
}