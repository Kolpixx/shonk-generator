import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
    return (
        <div id="not-found">
            <h1>Not Found :(</h1>
            <Link to={"/"}>
                <button className="pointer">Go back home!!</button>
            </Link>
        </div>
    )
}