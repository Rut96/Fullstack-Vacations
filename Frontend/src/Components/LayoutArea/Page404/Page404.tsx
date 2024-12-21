import "./Page404.css";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft, Compass } from "lucide-react";
import { useTitle } from "../../../Utils/UseTitle";

export function Page404(): JSX.Element {

    useTitle("Uncharted Territory");

    const navigate = useNavigate();

    return (
        <div className="Page404">
            <div className="content-wrapper">
                <div className="error-code">
                    4<span className="compass-icon"><Compass size={80} /></span>4
                </div>
                
                <div className="message-container">
                    <h1>Lost at Sea?</h1>
                    <p>The page you're looking for has drifted away into unknown waters.</p>
                    
                    <div className="location-marker">
                        <MapPin size={20} />
                        <span>Current Location: Uncharted Territory</span>
                    </div>

                    <button 
                        className="return-home"
                        onClick={() => navigate("/home")}
                    >
                        <ArrowLeft size={18} />
                        Navigate Home
                    </button>
                </div>

                <div className="waves">
                    <div className="wave-group">
                        <div className="wave wave1"></div>
                        <div className="wave wave2"></div>
                        <div className="wave wave3"></div>
                        <div className="wave wave4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}