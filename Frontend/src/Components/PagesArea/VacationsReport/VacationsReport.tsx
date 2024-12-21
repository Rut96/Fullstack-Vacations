import { errorExtractor } from "error-extractor";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Swal from "sweetalert2";
import { VacationModel } from "../../../Models/VacationModel";
import { store } from "../../../Redux/Store";
import { vacationService } from "../../../Services/VacationService";
import { useTitle } from "../../../Utils/UseTitle";
import "./VacationsReport.css";

export function VacationsReport(): JSX.Element {
    useTitle("Vacations Report");
    const navigate = useNavigate();
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    
    useEffect(() => {
        const user = store.getState().user;
        
        if (!user || user.roleId !== 1) {
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
        vacationService.getVacationsWithLikes()
            .then(v => setVacations(v))
            .catch(err => {
                const message = errorExtractor.getMessage(err);
                Swal.fire({
                    title: 'Get Vacations With Likes Failed',
                    text: message || 'Something went wrong getting vacations',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            });
    }, []);

    const downloadCSV = () => {
        const headers = "Destination,Likes\n";
        const csvContent = vacations.map(v => {
            const destination = v.destination.includes(',') ? `"${v.destination}"` : v.destination;
            return `${destination},${v.likesCount}`;
        }).join("\n");

        const blob = new Blob([headers + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'vacations_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <div className="VacationsReport">
            <div>
                <div className="report-header">
                    <h2>Vacations Popularity Report</h2>
                    <button onClick={downloadCSV} className="download-btn">
                        <Download size={20} />
                        Download CSV
                    </button>
                </div>

                <div className="chart-container">
                    <ResponsiveContainer width="100%" height={500}>
                        <BarChart
                            data={vacations}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 120
                            }}
                        >
                            <XAxis
                                dataKey="destination"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={60}
                            />
                            <YAxis label={{ value: 'Likes Count', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="likesCount"
                                name="Likes"
                                fill="#ff6b6b"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}