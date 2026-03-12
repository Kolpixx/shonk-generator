import './Checkbox.css'
import { useEffect } from "react"
import { accentColor } from "../../consts";
import { Check } from "lucide-react";

export default function Checkbox({ updateShonk, state, setState }) {
    useEffect(() => {
        updateShonk && updateShonk();
    }, [state]);
 
    return (
        <div className="checkbox pointer" data-checked={state} onClick={() => {setState(!state)}}>
            {state && <Check size={32} color={accentColor} strokeWidth={1.75} />}
        </div>
    )
}