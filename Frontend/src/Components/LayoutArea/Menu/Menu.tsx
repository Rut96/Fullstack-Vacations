import { Menu as MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/Store";
import { userService } from "../../../Services/UserService";
import "./Menu.css";

export function Menu(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector<AppState, UserModel>(state => state.user);

    // close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [window.location.pathname]);

    // close menu when clicking outside
    useEffect(() => {
        const closeMenu = (e: MouseEvent) => {
            const menuContent = document.querySelector('.menu-content');
            const burgerButton = document.querySelector('.burger-button');
            
            if (menuContent && 
                burgerButton && 
                !menuContent.contains(e.target as Node) && 
                !burgerButton.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', closeMenu);
        }

        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, [isOpen]);

    async function logout() {
        userService.logout();
        setIsOpen(false);
        await Swal.fire({
            title: 'Bye Bye 👋',
            text: 'Successfully logged out',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }

    return (
        <div className="Menu">
            <div className="desktop-menu">
                <NavLink to="/home" className="menu-link">Home</NavLink>
                <NavLink to="/about" className="menu-link">About Us</NavLink>
                {user && <NavLink to="/list" className="menu-link">Vacations</NavLink>}
                {user?.roleId === 1 && <NavLink to="/add-vacation" className="menu-link">Add Vacation</NavLink>}
                {user?.roleId === 1 && <NavLink to="/report" className="menu-link">Vacations Report</NavLink>}
                <NavLink to="/reviews" className="menu-link">Reviews</NavLink>

                <div className="auth">
                    {!user ? (
                        <>
                            <NavLink to="/login" className="menu-link">Log In</NavLink>
                            <NavLink to="/register" className="menu-link">Sign Up</NavLink>
                        </>
                    ) : (
                        <NavLink to="/home" onClick={logout} className="menu-link">Log Out</NavLink>
                    )}
                </div>
            </div>

            {/* --------------- Mobile Burger Button --------------- */}
            <button 
                className="burger-button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                aria-label="Toggle menu"
            >
                {isOpen ? <X /> : <MenuIcon />}
            </button>

            {/* --------------- Mobile Menu --------------- */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div className="menu-content" onClick={e => e.stopPropagation()}>
                    <NavLink to="/home" className="menu-link" onClick={() => setIsOpen(false)}>
                        Home
                    </NavLink>
                    
                    <NavLink to="/about" className="menu-link" onClick={() => setIsOpen(false)}>
                        About Us
                    </NavLink>

                    {user && (
                        <NavLink to="/list" className="menu-link" onClick={() => setIsOpen(false)}>
                            Vacations
                        </NavLink>
                    )}

                    {user?.roleId === 1 && (
                        <>
                            <NavLink to="/add-vacation" className="menu-link" onClick={() => setIsOpen(false)}>
                                Add Vacation
                            </NavLink>
                            <NavLink to="/report" className="menu-link" onClick={() => setIsOpen(false)}>
                                Vacations Report
                            </NavLink>
                        </>
                    )}

                    <NavLink to="/reviews" className="menu-link" onClick={() => setIsOpen(false)}>
                        Reviews
                    </NavLink>

                    <div className="mobile-auth">
                        {!user ? (
                            <>
                                <NavLink to="/login" className="menu-link" onClick={() => setIsOpen(false)}>
                                    Log In
                                </NavLink>
                                <NavLink to="/register" className="menu-link sign-up" onClick={() => setIsOpen(false)}>
                                    Sign Up
                                </NavLink>
                            </>
                        ) : (
                            <NavLink to="/home" onClick={() => { logout(); setIsOpen(false); }} className="menu-link">
                                Log Out
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>

            {/* --------------- Backdrop --------------- */}
            {isOpen && <div className="menu-backdrop" onClick={() => setIsOpen(false)} />}
        </div>
    );
}