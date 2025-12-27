import './Preview.css'
import { useEffect } from 'react';
import { default_shonk as shonk } from '../../shonks';
import { Download } from 'lucide-react';
import { accentColor } from '../../consts';
import getLongestString from '../../utils';

export default function Preview({ colors }) {
    
    function downloadShonk() {
        const canvas = document.getElementById("preview-canvas");
        const dataURL = canvas.toDataURL();

        const link = document.createElement("a");
        link.download = "shonk.png";
        link.href = dataURL;
        link.click();
    }

    useEffect(() => {
        const shonkArray = shonk.split(/\r\n|\n/);
        const split = Math.round(shonkArray.length / colors.length);
                
        const canvas = document.getElementById("preview-canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = ctx.measureText(getLongestString(shonkArray)).width
        canvas.height = shonkArray.length * 20 + 20;
        ctx.font = "bold 16px JetBrains Mono";
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

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
    }, [colors]);
    
    return (
        <section id="preview" data-title="Preview">
            <canvas id="preview-canvas">Seems like your browser doesn't support the canvas element :P (The site won't work without it!!)</canvas>
            <button id="download-button" className="pointer" onClick={() => downloadShonk()}><Download size={32} color={accentColor} strokeWidth={1.75} /></button>
        </section>
    )
}