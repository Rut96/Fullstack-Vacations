import { errorExtractor } from "error-extractor";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import "./Register.css";

export function Register(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            await userService.register(user);
            await Swal.fire({
                title: `Welcome ${user.firstName}! 🎊`,
                text: 'Your account has been successfully created',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                position: 'top-end',
                toast: true,
                timerProgressBar: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInRight'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutRight'
                }
            });
            navigate("/home");
        } catch (err: any) {
            const message = errorExtractor.getMessage(err);
            await Swal.fire({
                title: 'Registration Failed',
                text: message || 'Something went wrong during registration',
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

    return (
        <div className="Register">
            <div className="auth-card">
                <h2>
                    <UserPlus className="auth-icon" />
                    Create Account
                </h2>

                <form onSubmit={handleSubmit(send)}>
                    <div className="form-group">
                        <label>
                            <User className="input-icon" />
                            First Name
                        </label>
                        <input 
                            type="text" 
                            {...register("firstName", {
                                required: "First name is required",
                                minLength: {
                                    value: 2,
                                    message: "First name must be at least 2 characters"
                                }
                            })}
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>
                            <User className="input-icon" />
                            Last Name
                        </label>
                        <input 
                            type="text" 
                            {...register("lastName", {
                                required: "Last name is required",
                                minLength: {
                                    value: 2,
                                    message: "Last name must be at least 2 characters"
                                }
                            })}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>
                            <Mail className="input-icon" />
                            Email
                        </label>
                        <input 
                            type="email" 
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label>
                            <Lock className="input-icon" />
                            Password
                        </label>
                        <input 
                            type="password" 
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 4,
                                    message: "Password must be at least 4 characters"
                                }
                            })}
                            placeholder="Create a password"
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                    </div>

                    <button className="auth-button" type="submit">
                        Create Account
                    </button>
                </form>

                <div className="auth-link">
                    Already have an account? <NavLink to="/login">Login</NavLink>
                </div>
            </div>
        </div>
    );
}