import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import "./Reviews.css";
import { useTitle } from '../../../Utils/UseTitle';

interface Review {
    id: number;
    name: string;
    location: string;
    rating: number;
    text: string;
    date: string;
}

export function Reviews(): JSX.Element {

    useTitle("Reviews");

    const [currentIndex, setCurrentIndex] = useState(0);

    const reviews: Review[] = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "Maldives",
            rating: 5,
            text: "An absolute paradise! The crystal-clear waters and luxurious resorts exceeded all expectations. The local staff was incredibly welcoming.",
            date: "March 2024"
        },
        {
            id: 2,
            name: "Michael Chen",
            location: "Greek Islands",
            rating: 5,
            text: "Island hopping through Greece was the adventure of a lifetime. The historic sites, delicious food, and stunning beaches were unforgettable.",
            date: "February 2024"
        },
        {
            id: 3,
            name: "Emma Davis",
            location: "Costa Rica",
            rating: 4,
            text: "Perfect blend of adventure and relaxation. The rainforest tours were spectacular, and the beaches were pristine. Highly recommend!",
            date: "January 2024"
        }
    ];

    function nextReview() {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    function prevReview() {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="Reviews">
            <h2>Traveler Stories</h2>

            <div className="reviews-wrapper">

                <div className="review-container">

                    <div className="review-header">

                        <div className="reviewer-info">
                            <h3>{reviews[currentIndex].name}</h3>
                            <p className="location">{reviews[currentIndex].location}</p>
                        </div>
                        <div className="rating">
                            {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="star-icon"
                                />
                            ))}
                        </div>

                    </div>

                    <p className="review-text">"{reviews[currentIndex].text}"</p>

                    <div className="review-footer">
                        <p className="review-date">{reviews[currentIndex].date}</p>
                        <div className="navigation-buttons">
                            <button onClick={prevReview} className="nav-button">
                                <ChevronLeft className="nav-icon" />
                            </button>
                            <button onClick={nextReview} className="nav-button">
                                <ChevronRight className="nav-icon" />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}