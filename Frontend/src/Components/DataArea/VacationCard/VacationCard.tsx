import { errorExtractor } from 'error-extractor';
import { CalendarHeart, Pencil, Trash2 } from 'lucide-react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2';
import defaultImg from "../../../Assets/Images/default.jpg";
import { UserModel } from "../../../Models/UserModel";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState } from "../../../Redux/Store";
import { appConfig } from "../../../Utils/AppConfig";
import "./VacationCard.css";

type VacationProps = {
    vacation: VacationModel;
    onLikeToggle: () => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

export function VacationCard(props: VacationProps): JSX.Element {

    const user = useSelector<AppState, UserModel>(state => state.user);

    function getImageUrl(imgUrl: string) {
        if (!imgUrl) return defaultImg;
        return `${appConfig.vacationImgUrl}${imgUrl}`;
    };

    async function handleLikeToggle() {
        try {
            await props.onLikeToggle();
        } catch (err) {
            console.error('Error in handleLikeToggle:', err);
        }
    }

    async function deleteMe() {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e79465',
                cancelButtonColor: '#4e518c',
                confirmButtonText: 'Yes, delete it!'
            });
            if (result.isConfirmed) {
                await props.onDelete(props.vacation.id);
                Swal.fire(
                    'Deleted!',
                    'Vacation has been deleted.',
                    'success'
                );
            }
        } catch (err: any) {
            const message = errorExtractor.getMessage(err);
            await Swal.fire({
                title: 'Deleting Failed',
                text: message || 'Something went wrong during deleting vacation',
                icon: 'error',
                confirmButtonText: 'Try Again',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        }
    }

    function formatDate(date: Date) {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    }

    return (
        <div className="VacationCard">
            <div className="image-container">
                <img src={getImageUrl(props.vacation.imageName)} className="vacation-image" alt={props.vacation.destination} />
                
                {user?.roleId === 2 &&
                    <div className="like-tag">
                        <input
                            type="checkbox"
                            id={`like-${props.vacation.id}`}
                            className="like-checkbox"
                            checked={!!props.vacation.isMyLiked}
                            onChange={handleLikeToggle}
                        />
                        <label htmlFor={`like-${props.vacation.id}`} className="like-button" >
                            <div className="heart-icon">
                                <div className="heart-bg"></div>
                            </div>
                            <span>Like</span>
                            <span>{props.vacation.likesCount || 0}</span>
                        </label>
                    </div>
                }

                {user?.roleId === 1 &&
                    <div className="tags">
                        <div className="edit-tag">
                            <NavLink to={"/edit-vacation/" + props.vacation?.id}> <Pencil size={15} /> Edit
                            </NavLink>
                        </div>
                        <div className="delete-tag" onClick={deleteMe}><Trash2 size={15} /> Delete</div>
                    </div>
                }
            </div>

            <div className="date-info">
                <div className="dates">
                    <CalendarHeart size={20} />
                    <span className="start-date">{formatDate(new Date(props.vacation.startDate))}</span> -
                    <span className="end-date">{formatDate(new Date(props.vacation.endDate))}</span>
                </div>
            </div>

            <div className="vacation-info">
                <div className="info-header">
                    <h3 className="destination">{props.vacation.destination}</h3>
                    <p className="description">{props.vacation.description}</p>
                </div>

                <div className="info-details">
                    <div className="info-item">
                        <span>{props.vacation.price} $</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
