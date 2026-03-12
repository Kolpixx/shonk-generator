import './DownloadModal.css'
import { useContext, useEffect } from 'react'
import { BackgroundColorContext, ScaleContext, TransparentBGContext } from '../../../sites/App/App';
import Checkbox from '../../Checkbox/Checkbox';

export default function DownloadModal({ showDownloadModal, downloadShonk, shonkToBash, shonkToFishShell }) {
    const [transparentBG, setTransparentBG] = useContext(TransparentBGContext);
    const [scale, setScale] = useContext(ScaleContext);
    const [backgroundColor, setBackgroundColor] = useContext(BackgroundColorContext);

    function downloadBashScript() {
        const link = document.createElement("a");
        link.download = "shonk.sh";
        link.href = URL.createObjectURL(shonkToBash());
        link.click();
    }

    function downloadFishScript() {
        const link = document.createElement("a");
        link.download = "shonk.fish";
        link.href = URL.createObjectURL(shonkToFishShell());
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
                <input type="range" min="1" max="10" defaultValue={scale} id="scale-slider" onChange={(e) => setScale(e.target.value)}></input>
                <div>
                    <Checkbox
                        setState={setTransparentBG}
                        state={transparentBG}
                    />
                    <label htmlFor="download-transparent">Transparent BG</label>
                </div>
                {!transparentBG &&
                    <div>
                        {!transparentBG && <input type="color" id="background-color-picker" defaultValue={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)}></input>}
                        <label htmlFor="background-color-picker">Background</label>
                    </div>
                }
                <div id="download-modal-buttons">
                    <button className="download-modal-button pointer" onClick={() => {downloadShonk(scale, (!transparentBG ? backgroundColor : "transparent")); showDownloadModal(false)}}>Download</button>
                    <button className="download-modal-button pointer" onClick={() => {downloadBashScript(); showDownloadModal(false)}}>Export in bash</button>
                    <button className="download-modal-button pointer" onClick={() => {downloadFishScript(); showDownloadModal(false)}}>Export in Fish</button>
                </div>
            </div>
        </div>
    )
}