import './EditingModal.css'
import { setCustomVariant, shonkVariants } from '../../../shonks'
import { Save } from 'lucide-react';
import { textColor } from '../../../consts';
import { useEffect } from 'react';

export default function EditingModal({ showEditingScreen, updateShonk }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset";
    }, []);

    return (
        <div className="modal" onClick={(e) => {e.target.classList[0] === "modal" && showEditingScreen(false)}}>
            <div className="modal-container" id="editing-modal-container">
                <h3>Enter text here :3</h3>
                <textarea id="editing-custom-textarea" placeholder="Be silly :333" wrap="off" defaultValue={shonkVariants["Custom"]}></textarea>
                <button id="editing-custom-save-button" className="pointer" onClick={() => {setCustomVariant(document.getElementById("editing-custom-textarea").value); showEditingScreen(); updateShonk()}}><Save size={32} color={textColor} strokeWidth={1.75} /></button>
            </div>
        </div>
    )
}