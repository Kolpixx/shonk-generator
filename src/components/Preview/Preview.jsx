import './Preview.css'
import { useContext, useEffect, useState } from 'react';
import { DropShadowContext, FontContext, LoopedContext } from '../../sites/App/App';
import { Download } from 'lucide-react';
import { bashHEX, getLongestString } from '../../utils';
import DownloadModal from './DownloadModal/DownloadModal';

export default function Preview({ colors, variant }) {
    const [showingDownloadModal, showDownloadModal] = useState(false);
    const [font, setFont] = useContext(FontContext);
    const [dropShadow, setDropShadow] = useContext(DropShadowContext);
    const [looped] = useContext(LoopedContext);
    const shonkArray = variant.split(/\r\n|\n/);
    const colorArray = [...colors];

    function colorize() {
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
    }
    
    async function generateShonk(canvas, ctx, scale, bgColor) {
        return new Promise((resolve, reject) => {
            const longestString = getLongestString(shonkArray);

            const pixelRatio = window.devicePixelRatio;

            document.fonts.load(`bold 16px ${font}`).then(() => {
                const fontDef = `bold 16px ${font}`;

                // Bruh why is this so weird
                ctx.font = fontDef;
                const width = (ctx.measureText(longestString).width) * scale;
                const height = (10 + (shonkArray.length * 20)) * scale; // The 10 is just pi mal daumen idk

                canvas.style.width = width + "px";
                canvas.style.height = height + "px";
                canvas.width = Math.floor(width * pixelRatio);
                canvas.height = Math.floor(height * pixelRatio);
                
                ctx.font = fontDef;
                ctx.shadowColor = dropShadow && "rgba(0, 0, 0, 0.3)";
                ctx.shadowOffsetX = 1;
                ctx.shadowOffsetY = 1;
                
                ctx.scale(scale * pixelRatio, scale * pixelRatio);

                // Set background color
                ctx.beginPath();
                ctx.fillStyle = bgColor;
                ctx.rect(0, 0, canvas.width, canvas.height);
                ctx.fill();

                // Bahahaha don't look at this!! :p
                if (looped === true) {
                    for (let i = 0; i < shonkArray.length; i++) {
                        ctx.fillStyle = colors[i % colors.length];
                        ctx.fillText(shonkArray[i], 0, 20 * (i + 1));
                    }
                } else {
                    colorize();

                    colorArray.forEach((color, index) => {
                        ctx.fillStyle = color;
                        ctx.fillText(shonkArray[index], 0, 20 * (index + 1));
                    });
                }

                resolve(true);
            });
        });
    }

    async function downloadShonk(scale, bgColor) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        await generateShonk(canvas, ctx, scale, bgColor);

        const dataURL = canvas.toDataURL();

        const link = document.createElement("a");
        link.download = "shonk.png";
        link.href = dataURL;
        link.click();
    }

    function shonkToBash() {
        console.log("Converting shonk to bash...");
        let bashScript = "";

        if (looped === true) {
            for (let i = 0; i < shonkArray.length; i++) {
                bashScript += bashHEX(colors[i % colors.length], shonkArray[i]);
            }
        } else {
            colorize();

            colorArray.forEach((color, index) => {
                bashScript += bashHEX(color, shonkArray[index]);
            });
        }

        return new File(['#!/bin/bash\necho -e "' + bashScript + '"'], "shonk.sh", {type: "text/plain"});
    }

    function shonkToFishShell() {
        console.log("Converting shonk to fish...");
        let fishScript = "";

        if (looped === true) {
            for (let i = 0; i < shonkArray.length; i++) {
                fishScript += `set_color ${colors[i % colors.length].slice(1)}; echo "${shonkArray[i]}"; `;
            }
        } else {
            colorize();

            colorArray.forEach((color, index) => {
                fishScript += `set_color ${color.slice(1)}; echo "${shonkArray[index]}"; `;
            });
        }

        return new File(["function shonk\n", fishScript, "\nend\n"], "shonk.fish", {type: "text/plain"});
    }

    useEffect(() => {                
        const canvas = document.getElementById("preview-canvas");
        const ctx = canvas.getContext("2d");

        generateShonk(canvas, ctx, 1, "transparent");
    }, [colors, font, dropShadow, variant]);

    return (
        <section id="preview" data-title="Preview">
            <div id="canvas-container">
                <canvas id="preview-canvas">Seems like your browser doesn't support the canvas element :P (The site won't work without it!!)</canvas>
            </div>
            <button id="download-button" className="pointer" onClick={() => showDownloadModal(true)}><Download size={32} strokeWidth={1.75} /></button>
        
            {showingDownloadModal && <DownloadModal showDownloadModal={showDownloadModal} downloadShonk={downloadShonk} shonkToBash={shonkToBash} shonkToFishShell={shonkToFishShell} />}
        </section>
    )
}