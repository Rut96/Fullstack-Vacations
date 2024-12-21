import { Filter } from "lucide-react";
import "./FilterBar.css";
import { AppState, store } from "../../../Redux/Store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

type FilterBarProps = {
    filters: {
        likedOnly: boolean;
        notStarted: boolean;
        active: boolean;
    };
    onFilterChange: (filterName: "likedOnly" | "notStarted" | "active") => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps): JSX.Element {

    const navigate = useNavigate();
    const user = useSelector((state: AppState) => state.user);

    useEffect(()=>{
        if(!user){
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
    },[]);

    return (
        <div className="FilterBar">
            <div className="filter-header">
                <Filter className="filter-icon" />
                <h2>Filter Your Journey</h2>
            </div>

            <div className="filter-buttons">
                {user.roleId === 2 &&
                    <button className={`filter-btn ${filters.likedOnly ? 'active' : ''}`} onClick={() => onFilterChange("likedOnly")} >
                        Favorites
                    </button>
                }

                <button className={`filter-btn ${filters.notStarted ? 'active' : ''}`} onClick={() => onFilterChange("notStarted")} >
                    Upcoming
                </button>

                <button className={`filter-btn ${filters.active ? 'active' : ''}`} onClick={() => onFilterChange("active")} >
                    Active
                </button>
            </div>
        </div>
    );
}