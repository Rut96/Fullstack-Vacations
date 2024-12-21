import { errorExtractor } from "error-extractor";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, DollarSign, FileImage, FileText, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import { VacationModel } from "../../../Models/VacationModel";
import { AppState, store } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { imageUtil } from "../../../Utils/ImageUtil";
import { useTitle } from "../../../Utils/UseTitle";
import "./EditVacation.css";
import { useSelector } from "react-redux";

export function EditVacation(): JSX.Element {
    useTitle("Edit Vacation");

    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const params = useParams();
    const id = +params.vacationId;

    const user = useSelector((state: AppState) => state.user);

    const [startDateStr, setStartDateStr] = useState("");
    const [endDateStr, setEndDateStr] = useState("");
    const [fileName, setFileName] = useState("No image chosen");
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        if (user?.roleId !== 1) {
            Swal.fire({
                title: 'Access Denied',
                text: 'You are not authorized to access this page',
                icon: 'warning',
                confirmButtonText: 'Confirm',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                },
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    if (!user) {
                        navigate("/login");
                    } else {
                        navigate("/home");
                    }
                }
            });
            return;
        }
        setIsAuthorized(true);

        vacationService.getOneVacation(id)
            .then(v => {
                setValue("destination", v.destination);
                setValue("description", v.description);
                setValue("price", v.price);
                setValue("imageName", v.imageName);
                setValue("startDate", new Date(v.startDate));
                setValue("endDate", new Date(v.endDate));

                // function formatDateForInput(date: Date) {
                //     return new Date(date).toISOString().split('T')[0];
                // };

                setStartDateStr(formatDateForInput(new Date(v.startDate)));
                setEndDateStr(formatDateForInput(new Date(v.endDate)));
            })
            .catch(err => {
                const message = errorExtractor.getMessage(err);
                Swal.fire({
                    title: 'Get One Vacation Failed',
                    text: message || 'Something went wrong getting vacation',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                });
            });
    }, []);

    function formatDateForInput(date: Date) {
        return new Date(date).toISOString().split('T')[0];
    };

    function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStartDateStr(e.target.value);
        setValue("startDate", new Date(e.target.value));
    }

    function handleEndDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEndDateStr(e.target.value);
        setValue("endDate", new Date(e.target.value));
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        setFileName(file?.name || "No file chosen");
    }

    async function send(vacation: VacationModel) {
        try {
            vacation.id = id;
            vacation.img = (vacation.img as unknown as FileList)[0];

            if (vacation.img && !imageUtil.isImageFileType(vacation.img?.name)) {
                await Swal.fire({
                    title: 'Illegal image file type',
                    text: 'Image file type must be: .jpg/.jpeg/.png/.gif/.bmp/.webp/tiff/heif/svg',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            await vacationService.updateVacation(vacation);
            await Swal.fire({
                title: 'Success!',
                text: 'Your vacation has been updated',
                icon: 'success',
                confirmButtonText: 'Continue',
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            });
            navigate('/list');
        } catch (err: any) {
            const message = errorExtractor.getMessage(err);
            await Swal.fire({
                title: 'Update vacation Failed',
                text: message || 'Something went wrong during updating vacation',
                icon: 'error',
                confirmButtonText: 'Try Again',
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            });
        }
    }

    if (!isAuthorized) {
        return null;
    }

    return (
        <div className="EditVacation">
            <div className="card-header">
                <h1 className="card-title">Edit Vacation</h1>
                <p className="card-description">Update your vacation package details</p>
            </div>

            <form onSubmit={handleSubmit(send)} className="vacation-form">

                <div className="form-section left-section">
                    <div className="form-group">
                        <label htmlFor="destination">
                            <MapPin size={18} />
                            Destination
                        </label>
                        <input
                            id="destination"
                            type="text"
                            {...register("destination")}
                            required
                            minLength={2}
                            maxLength={100}
                            placeholder="Enter destination"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            <FileText size={18} />
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...register("description")}
                            required
                            minLength={2}
                            maxLength={10000}
                            placeholder="Describe the vacation package"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">
                            <DollarSign size={18} />
                            Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            {...register("price")}
                            required
                            min={0}
                            max={10000}
                            placeholder="Enter price"
                        />
                    </div>
                </div>

                <div className="form-section right-section">
                    <div className="date-container">
                        <div className="form-group">
                            <label htmlFor="startDate">
                                <Calendar size={18} />
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDateStr}
                                onChange={handleStartDateChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endDate">
                                <Calendar size={18} />
                                End Date
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDateStr}
                                onChange={handleEndDateChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group file-upload-group">
                        <label htmlFor="image">
                            <FileImage size={18} />
                            Update Vacation Image
                        </label>
                        <div className="file-input-wrapper">
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                {...register("img")}
                                onChange={handleFileChange}
                            />
                            <div className="upload-button">
                                <FileImage size={18} />
                                Choose File
                            </div>
                            {fileName !== "No image chosen"
                                ? <span className="file-name">Selected: {fileName}</span>
                                : <span className="file-name">{fileName}</span>
                            }
                        </div>
                    </div>

                    <button type="submit" className="submit-button">
                        Update Vacation
                    </button>
                </div>
                
            </form>
        </div>
    );
}