import './DownloadModal.css'
import { useEffect, useState } from 'react'
import { Check } from 'lucide-react';
import { accentColor } from '../../../consts';

export default function DownloadModal({ showDownloadModal, downloadShonk, shonkToBash }) {
    const [transparentBG, setTransParentBG] = useState(true);
    const [scale, setScale] = useState(2);

    function downloadBashScript() {
        const link = document.createElement("a");
        link.download = "shonk.sh";
        link.href = URL.createObjectURL(shonkToBash());
        link.click();
    }

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "unset";
    }, []);

    return (
        <div className="modal" onClick={(e) => {e.target.classList[0] === "modal" && showDownloadModal(false)}}>
            <div className="modal-container" id="download-modal-container">
                <label htmlFor="scale-slider">Scale: {scale}</label>
                <input type="range" min="1" max="10" defaultValue="2" id="scale-slider" onChange={(e) => setScale(e.target.value)}></input>
                <div>
                    <div className="checkbox pointer" id="download-transparent" data-checked={transparentBG} onClick={() => {setTransParentBG(!transparentBG)}}>
                        {transparentBG && <Check size={32} color={accentColor} strokeWidth={1.75} />}
                    </div>
                    <label htmlFor="download-transparent">Transparent</label>
                </div>
                {!transparentBG &&
                    <div>
                        {!transparentBG && <input type="color" id="background-color-picker"></input>}
                        <label htmlFor="background-color-picker">Background</label>
                    </div>
                }
                <div id="download-modal-buttons">
                    <button className="download-modal-button pointer" onClick={() => {downloadShonk(scale, (!transparentBG ? document.getElementById("background-color-picker").value : "transparent")); showDownloadModal(false)}}>Download</button>
                    <button className="download-modal-button pointer" onClick={() => {downloadBashScript()}}>Export in bash</button>
                </div>
            </div>
        </div>
    )
}