import './Preview.css'
import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { textColor } from '../../consts';
import { bashHEX, getLongestString } from '../../utils';
import DownloadModal from './DownloadModal/DownloadModal';

export default function Preview({ colors, variant }) {
    const [showingDownloadModal, showDownloadModal] = useState(false);
    const shonkArray = variant.split(/\r\n|\n/);
    const colorArray = [...colors];

    const canvasFontFace = new FontFace("JetBrains Mono NL", 'url("../fonts/JetBrainsMonoNL_Bold.ttf")');
    canvasFontFace.weight = 800;
    
    async function generateShonk(canvas, ctx, scale, bgColor) {
        const longestString = getLongestString(shonkArray);

        const pixelRatio = window.devicePixelRatio;

        if (!document.fonts.check("bold 16px JetBrains Mono NL")) {
            await loadFont(canvasFontFace);
        }
        const font = "bold 16px JetBrains Mono NL";

        // Bruh why is this so weird
        ctx.font = font;
        const width = (ctx.measureText(longestString).width) * scale;
        const height = (10 + (shonkArray.length * 20)) * scale; // The 10 is just pi mal daumen idk

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.width = Math.floor(width * pixelRatio);
        canvas.height = Math.floor(height * pixelRatio);
        
        ctx.font = font;
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        
        ctx.scale(scale * pixelRatio, scale * pixelRatio);

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
            let currentColor = 0;
            let multiplier = 2;

            for (let i = 0; i < shonkArray.length - colors.length; i++) {
                if (currentColor > colors.length - 1) {
                    currentColor = 0;
                    multiplier++;
                }

                let startFrom;

                startFrom = multiplier * currentColor;

                colorArray.splice(startFrom, 0, colors[currentColor]);

                currentColor++;
            }

            colorArray.forEach((color, index) => {
                ctx.fillStyle = color;
                ctx.fillText(shonkArray[index], 0, 20 * (index + 1));
            });
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

    function shonkToBash() {
        console.log("Converting shonk to bash...");
        let bashScript = "";

        if (document.getElementById("option-loop").getAttribute("data-checked") === "true") {
            for (let i = 0; i < shonkArray.length; i++) {
                bashScript += bashHEX(colors[i % colors.length], shonkArray[i]);
            }
        } else {
            let currentColor = 0;
            let multiplier = 2;

            for (let i = 0; i < shonkArray.length - colors.length; i++) {
                if (currentColor > colors.length - 1) {
                    currentColor = 0;
                    multiplier++;
                }

                let startFrom;
                
                startFrom = multiplier * currentColor;

                colorArray.splice(startFrom, 0, colors[currentColor]);

                currentColor++;
            }

            colorArray.forEach((color, index) => {
                bashScript += bashHEX(color, shonkArray[index]);
            });
        }

        return new File(['echo -e "' + bashScript + '"'], "shonk.sh", {type: "text/plain"});
    }

    async function loadFont(fontFace) {
        await canvasFontFace.load();
        console.log("Font loaded:", fontFace);
        document.fonts.add(canvasFontFace);
    }

    useEffect(() => {                
        const canvas = document.getElementById("preview-canvas");
        const ctx = canvas.getContext("2d");

        generateShonk(canvas, ctx, 1, "transparent");
    }, [colors, variant]);

    return (
        <section id="preview" data-title="Preview">
            <div id="canvas-container">
                <canvas id="preview-canvas">Seems like your browser doesn't support the canvas element :P (The site won't work without it!!)</canvas>
            </div>
            <button id="download-button" className="pointer" onClick={() => showDownloadModal(true)}><Download size={32} color={textColor} strokeWidth={1.75} /></button>
        
            {showingDownloadModal && <DownloadModal showDownloadModal={showDownloadModal} downloadShonk={downloadShonk} shonkToBash={shonkToBash} />}
        </section>
    )
}