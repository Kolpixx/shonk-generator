import './Dropdown.css'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Dropdown({ options, state, setState }) {
    const [showingOptions, showOptions] = useState(false);

    return (
        <div className="dropdown-container">
            <div className="dropdown-selected pointer" data-showing={showingOptions}>
                <p onClick={() => showOptions(!showingOptions)}>{state} {showingOptions ? <ChevronUp size={32} strokeWidth={2} /> : <ChevronDown size={32} strokeWidth={2} />}</p>
            </div>
            {showingOptions && (
                <div className="dropdown-options">
                    {Object.keys(options).map((option, index) => <p className="dropdown-option pointer" key={`option-${index}`} onClick={() => setState(option)}>{option}</p>)}
                </div>
            )}

        </div>
    )
}