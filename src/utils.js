export function getLongestString(arr) {
    return arr.reduce((a, b) => {
        return a.length > b.length ? a : b;
    });
}

export function bashHEX(hex, content) {
    const rgb = hexToRGB(hex);
    return `\\e[38;2;${rgb[0]};${rgb[1]};${rgb[2]}m${content}\\n`
}

export function hexToRGB(hex) {
    const aRgbHex = hex.replace("#", "").match(/.{1,2}/g);
    const aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}

export function uint8ArrayToBase64(bytes) {
    let binaryString = "";
    bytes.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
    });

    return btoa(binaryString);
}

export function shareShonk(json) {
    const encoder = new TextEncoder;
    const utf8bytes = encoder.encode(JSON.stringify(json));
    const base64 = encodeURIComponent(uint8ArrayToBase64(utf8bytes));

    return `https://shonk.netlify.app/?preset=${base64}`;
}