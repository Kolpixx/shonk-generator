import './ImportDialog.css'

export default function ImportDialog({ showImportDialog, applyPreset }) {
    return (
        <div className="modal" onClick={(e) => {e.target.classList[0] === "modal" && showImportDialog(false)}}>
            <div className="modal-container" id="import-dialog">
                <p>
                Do you want to apply this preset?
                <br />
                This will override existing data.
                </p>
                <div>
                    <button onClick={() => {applyPreset(); showImportDialog(false)}}>Yes</button>
                    <button onClick={() => showImportDialog(false)}>No</button>
                </div>
            </div>
        </div>
    )
}