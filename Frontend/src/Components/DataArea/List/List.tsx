import { errorExtractor } from "error-extractor";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppState } from "../../../Redux/Store";
import { likeService } from "../../../Services/LikeService";
import { vacationService } from "../../../Services/VacationService";
import { useTitle } from "../../../Utils/UseTitle";
import { Loader } from "../../SharedArea/Loader/Loader";
import { FilterBar } from "../FilterBar/FilterBar";
import { VacationCard } from "../VacationCard/VacationCard";
import "./List.css";

export function List(): JSX.Element {
    useTitle("Root Vacations");
    const navigate = useNavigate();

    // store.getState().user; - not good because it is a one-time read that doesn't subscribe to changes
    const user = useSelector((state: AppState) => state.user);
    const vacations = useSelector((state: AppState) => state.vacations);

    const [filters, setFilters] = useState({
        likedOnly: false,
        notStarted: false,
        active: false,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if (!user) {
            Swal.fire({
                title: 'Access Denied',
                text: 'You are not authorized to access this page',
                icon: 'warning',
                confirmButtonText: 'Go to Login',
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
                    navigate("/login");
                }
            });
            return;
        }

        (async () => {
            try {
                await vacationService.getVacationsWithLikes();
                setIsLoading(false);
            } catch (err) {
                const message = errorExtractor.getMessage(err);
                await Swal.fire({
                    title: 'Fetching vacation Failed',
                    text: message || 'Something went wrong during fetching vacation',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                setIsLoading(false);
            }
        })();
    }, [user]);

    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    function getFilteredVacations() {
        return vacations.filter(vacation => {
            const today = new Date();
            const startDate = new Date(vacation.startDate);
            const endDate = new Date(vacation.endDate);

            if (filters.likedOnly && !vacation.isMyLiked) return false;
            if (filters.notStarted && startDate <= today) return false;
            if (filters.active && (startDate > today || endDate < today)) return false;

            return true;        
        });
    };

    function getCurrentPageVacations() {
        const filteredVacations = getFilteredVacations();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredVacations.slice(startIndex, endIndex);
    };

    const filteredVacations = getFilteredVacations();
    const currentVacations = getCurrentPageVacations();
    const totalPages = Math.ceil(filteredVacations.length / itemsPerPage);

    function handleFilterChange(filterName: keyof typeof filters) {
        setFilters(prev => {
            if (filterName === 'notStarted' && !prev.notStarted) {
                return {
                    ...prev,
                    notStarted: true,
                    active: false
                };
            }

            if (filterName === 'active' && !prev.active) {
                return {
                    ...prev,
                    active: true,
                    notStarted: false
                };
            }

            return {
                ...prev,
                [filterName]: !prev[filterName]
            };
        });
    };

    async function handleLikeToggle(vacationId: number, isCurrentlyLiked: number) {
        try {
            if (!isCurrentlyLiked) {
                await likeService.addLikes(vacationId);
            } else {
                await likeService.removeLikes(vacationId);
            }
        } catch (err) {
            // If fails, revert the like status
            if (!isCurrentlyLiked) {
                await likeService.removeLikes(vacationId);
            } else {
                await likeService.addLikes(vacationId);
            }

            const message = errorExtractor.getMessage(err);
            await Swal.fire({
                title: 'Failed to update like status',
                text: message || 'Something went wrong during updating likes',
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

    async function handleDelete(id: number) {
        try {
            await vacationService.deleteVacation(id);
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

    function getPageNumbers() {
        const pageNumbers = [];
        const maxVisiblePages = 3;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage < 3) {
                for (let i = 1; i <= 3; i++) pageNumbers.push(i);
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="List">
            <div className="filter-wrapper">
                <FilterBar filters={filters} onFilterChange={handleFilterChange} />
            </div>

            {isLoading ? (
                <div className="loader-wrapper">
                    <Loader />
                </div>
            ) : filteredVacations.length === 0 ? (
                <div className="no-results">
                    <h3>No vacations found</h3>
                    <p>Try adjusting your filters</p>
                </div>
            ) : (
                <>
                    <div className="vacation-grid">
                        {currentVacations.map((vacation, index) => (
                            <div
                                className="vacation-card-wrapper"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                key={vacation.id}
                            >
                                <VacationCard
                                    vacation={vacation}
                                    onLikeToggle={() => handleLikeToggle(vacation.id, vacation.isMyLiked)}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button className="pagination-btn"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="pagination-icon" />
                            </button>

                            <div className="pagination-numbers">
                                {getPageNumbers().map((pageNum, index) => (
                                    <button
                                        key={index}
                                        className={`pagination-num ${pageNum === currentPage ? 'active' : ''} ${pageNum === '...' ? 'dots' : ''}`}
                                        onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                                        disabled={pageNum === '...'}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>

                            <button className="pagination-btn"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="pagination-icon" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default List;