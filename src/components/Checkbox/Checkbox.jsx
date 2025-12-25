import './Checkbox.css'
import { useEffect, useState } from "react"
import { accentColor } from "../../consts";
import { Check } from "lucide-react";
import { updateShonk } from '../../utils';

export default function Checkbox({ defaultValue }) {
    const [enabled, toggleEnabled] = useState(defaultValue);

    useEffect(() => {
        updateShonk();
    }, [enabled]);
 
    return (
        <div className="checkbox pointer" id="option-loop" data-checked={enabled} onClick={() => {toggleEnabled(!enabled)}}>
            {enabled && <Check size={32} color={accentColor} strokeWidth={1.75} />}
        </div>
    )
}