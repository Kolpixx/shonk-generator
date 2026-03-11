import './Dropdown.css'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Dropdown({ options, state, setState }) {
    const [showingOptions, showOptions] = useState(false);

    return (
        <div className="dropdown-container">
            <div className="dropdown-selected pointer" data-showing={showingOptions} onClick={() => showOptions(!showingOptions)}>
                <p>{state}</p>
                {showingOptions ? <ChevronUp size={32} strokeWidth={2} /> : <ChevronDown size={32} strokeWidth={2} />}
            </div>
            {showingOptions && (
                <>
                    <div className="dropdown-bg" onClick={(e) => {(e.target.id !== "dropdown-options" || "dropdown-selected") && showOptions(false) }}></div>
                    <div className="dropdown-options">
                        {Object.keys(options).map((option, index) => <p className="dropdown-option pointer" key={`option-${index}`} onClick={() => {setState(option); showOptions(false)}}>{option}</p>)}
                    </div>
                </>
            )}
        </div>
    )
}