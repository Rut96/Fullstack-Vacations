import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/Store";
import { useTitle } from "../../../Utils/UseTitle";
import "./Home.css";

export function Home(): JSX.Element {
    useTitle("Root Home")

    const navigate = useNavigate();
    const user = useSelector<AppState, UserModel>(state => state.user);

    return (
        <div className="Home">
            <div className="home-content">
                <h1 className="main-title">
                    Square Root of Fun = <br /> Our Routes × Your Boots
                </h1>
                <p className="subtitle">Discover amazing destinations and create unforgettable memories</p>

                {!user && <button  className="explore-button" onClick={() => navigate("/login")} >
                    Start Exploring
                    <ArrowRight className="button-icon" />
                </button>}

                {user && <button  className="explore-button" onClick={() => navigate("/list")} >
                    Start Exploring
                    <ArrowRight className="button-icon" />
                </button>}

            </div>
        </div>
    );
}