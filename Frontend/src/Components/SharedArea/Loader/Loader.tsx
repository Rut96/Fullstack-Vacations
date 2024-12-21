import "./Loader.css";
import loader from "../../../Assets/Gifs/loader.svg"

export function Loader(): JSX.Element {
    return (
        <div className="Loader">
			<img src={loader} alt="Loading..." />
        </div>
    );
}
