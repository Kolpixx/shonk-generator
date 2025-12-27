import './DownloadModal.css'
import { useState } from 'react'
import { Check } from 'lucide-react';
import { accentColor } from '../../../consts';

export default function DownloadModal({showDownloadModal, downloadShonk}) {
    const [transparentBG, setTransParentBG] = useState(true);
    const [scale, setScale] = useState(2);

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
                <button id="modal-download" onClick={() => {downloadShonk(scale, (!transparentBG ? document.getElementById("background-color-picker").value : "transparent")); showDownloadModal(false)}}>Download</button>
            </div>
        </div>
    )
}