import './EditingModal.css'
import { Save } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { CustomASCIIContext } from '../../../sites/App/App';

export default function EditingModal({ showEditingScreen, updateShonk }) {
    const [customASCII, setCustomASCII] = useContext(CustomASCIIContext);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset";
    }, []);

    return (
        <div className="modal" onClick={(e) => {e.target.classList[0] === "modal" && showEditingScreen(false)}}>
            <div className="modal-container" id="editing-modal-container">
                <h3>Enter text here :3</h3>
                <textarea id="editing-custom-textarea" placeholder="Be silly :333" wrap="off" defaultValue={customASCII}></textarea>
                <button id="editing-custom-save-button" className="pointer" onClick={() => {setCustomASCII(document.getElementById("editing-custom-textarea").value); showEditingScreen(); updateShonk()}}><Save size={32} strokeWidth={1.75} /></button>
            </div>
        </div>
    )
}