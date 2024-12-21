import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { UserModel } from "../../../Models/UserModel";
import { useTitle } from "../../../Utils/UseTitle";

export function About(): JSX.Element {
    useTitle("About Root");

    const navigate = useNavigate();
    const user = useSelector<AppState, UserModel>(state => state.user);
    
    const features = [
        {
            title: "Global Destinations",
            description: "From the romantic streets of Paris to the pristine beaches of Bali, explore handpicked destinations across the globe.",
            icon: "🌎"
        },
        {
            title: "Curated Experiences",
            description: "Each vacation package is thoughtfully designed to offer unique experiences, from cultural immersion to adventure sports.",
            icon: "✨"
        },
        {
            title: "Flexible Planning",
            description: "Choose from a wide range of dates and destinations to plan your perfect getaway throughout 2024-2025.",
            icon: "📅"
        }
    ];

    const destinations = [
        { name: "Europe", count: 4, examples: "Paris, Rome, Barcelona, Santorini" },
        { name: "Asia", count: 3, examples: "Tokyo, Kyoto, Maldives" },
        { name: "Americas", count: 4, examples: "New York, Rio, Machu Picchu" },
        { name: "Oceania", count: 2, examples: "Sydney, Queenstown" }
    ];

    return (
        <div className="About">
            <section className="hero-section">
                <h1>Discover Your Next Adventure</h1>
                <p>Root for Routes helps you explore the world's most amazing destinations with carefully curated vacation packages.</p>
            </section>

            <section className="features-section">
                <h2>Why Choose Us</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <span className="feature-icon">{feature.icon}</span>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="destinations-section">
                <h2>Our Destinations</h2>
                <div className="destinations-grid">
                    {destinations.map((region, index) => (
                        <div className="destination-card" key={index}>
                            <h3>{region.name}</h3>
                            <p className="destination-count">{region.count} Destinations</p>
                            <p className="destination-examples">{region.examples}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Start Your Journey?</h2>
                <p>Browse our selection of amazing vacation packages</p>
                {user && <button className="explore-button"onClick={() => navigate("/list")} >
                    View All Vacations
                    <ArrowRight className="button-icon" />
                </button>}
                {!user && <button className="explore-button"onClick={() => navigate("/login")} >
                    View All Vacations
                    <ArrowRight className="button-icon" />
                </button>}
            </section>
        </div>
    );
}