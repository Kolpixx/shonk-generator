import { default_shonk } from "./shonks";

export function generateShonk(colors) {
    console.log("test", colors);
}

// bahahhaha don't look at this :p
export function updateShonk() {
    console.log("Updating Shonk...");

    const shonk = default_shonk();
    const shonkArray = shonk.split(/\r\n|\n/);

    const colorAmount = document.getElementsByClassName("color-picker").length;

    // Get user colors
    const colors = [];

    Array.from(document.getElementsByClassName("color-picker")).forEach((element) => {
        colors.push(element.getAttribute("data-color"));
        console.log("Registered color", element.getAttribute("data-color"))
    });

    const split = Math.round(shonkArray.length / colors.length);

    if (document.getElementById("option-loop").checked) {
        for (let i = 0; i < shonkArray.length; i++) {
            document.getElementById(`preview-line-${i}`).style.color = colors[i % colors.length];
        }
    } else {
        let currentColor = -1;
        for (let i = 0; i < shonkArray.length; i++) {
            if (i % split === 0 && currentColor < colors.length - 1) {
                currentColor++;
            }

            document.getElementById(`preview-line-${i}`).style.color = colors[currentColor];;
        }
    }
}