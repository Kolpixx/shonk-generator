import './Credits.css'
import { useState } from "react";
import Markdown from "react-markdown";

export default function Credits() {
    const [creditsMD, setCreditsMD] = useState("");
    
    fetch("./CREDITS.md")
        .then(response => response.text())
        .then(text => setCreditsMD(text));

    return (
        <main>
            <div id="credits-markdown">
                <Markdown>{creditsMD}</Markdown>
            </div>
        </main>
    )
}