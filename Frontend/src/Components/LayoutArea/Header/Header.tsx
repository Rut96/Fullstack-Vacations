import { NavLink } from "react-router-dom";
import "./Header.css";
import vacationIcon from "../../../Assets/Images/vacation-icon.png"

export function Header(): JSX.Element {
    return (
        <div className="Header">
            <NavLink to="/home" className="logo-wrapper">
                <img src={vacationIcon} />
                <h1>Root for Routes</h1>
            </NavLink>
        </div>
    );
}
