import './Preview.css'
import { useEffect, useState } from 'react';
import { default_shonk as shonk } from '../../shonks';
import { Download } from 'lucide-react';
import { accentColor } from '../../consts';
import { getLongestString } from '../../utils';
import DownloadModal from './DownloadModal/DownloadModal';

export default function Preview({ colors }) {
    const [showingDownloadModal, showDownloadModal] = useState(false);
    
    function generateShonk(canvas, ctx, scale, bgColor) {
        const shonkArray = shonk.split(/\r\n|\n/);
        const split = Math.round(shonkArray.length / colors.length);
        const longestString = getLongestString(shonkArray);

        const font = "bold 16px JetBrains Mono NL";

        // Bruh why is this so weird
        ctx.font = font;
        canvas.width = (ctx.measureText(longestString).width) * scale;
        canvas.height = (10 + (shonkArray.length * 20)) * scale; // The 10 is just pi mal daumen idk

        ctx.font = font;
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        ctx.scale(scale, scale);

        // Set background color
        ctx.beginPath();
        ctx.fillStyle = bgColor;
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fill();

        // Bahahaha don't look at this!! :p
        if (document.getElementById("option-loop").getAttribute("data-checked") === "true") {
            for (let i = 0; i < shonkArray.length; i++) {
                ctx.fillStyle = colors[i % colors.length];
                ctx.fillText(shonkArray[i], 0, 20 * (i + 1));
            }
        } else {
            let currentColor = -1;
            for (let i = 0; i < shonkArray.length; i++) {
                if (i % split === 0 && currentColor < colors.length - 1) {
                    currentColor++;
                }
                
                ctx.fillStyle = colors[currentColor];
                ctx.fillText(shonkArray[i], 0, 20 * (i + 1));
            }
        }
    }

    function downloadShonk(scale, bgColor) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        generateShonk(canvas, ctx, scale, bgColor);

        const dataURL = canvas.toDataURL();

        const link = document.createElement("a");
        link.download = "shonk.png";
        link.href = dataURL;
        link.click();
    }

    useEffect(() => {                
        const canvas = document.getElementById("preview-canvas");
        const ctx = canvas.getContext("2d");

        generateShonk(canvas, ctx, 1, "transparent");
    }, [colors]);
    
    return (
        <section id="preview" data-title="Preview">
            <div id="canvas-container">
                <canvas id="preview-canvas">Seems like your browser doesn't support the canvas element :P (The site won't work without it!!)</canvas>
            </div>
            <button id="download-button" className="pointer" onClick={() => showDownloadModal(true)}><Download size={32} color={accentColor} strokeWidth={1.75} /></button>
        
            {showingDownloadModal && <DownloadModal showDownloadModal={showDownloadModal} downloadShonk={downloadShonk} />}
        </section>
    )
}