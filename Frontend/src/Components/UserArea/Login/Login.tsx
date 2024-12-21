import { errorExtractor } from "error-extractor";
import { Lock, LogIn, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { userService } from "../../../Services/UserService";
import "./Login.css";

export function Login(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            await Swal.fire({
                title: 'Welcome Back! 🎉',
                text: 'Successfully logged in',
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
        } catch (err) {
            const message = errorExtractor.getMessage(err);
            await Swal.fire({
                title: 'Login Failed',
                text: message || 'Something went wrong during login',
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
        <div className="Login">
            <div className="auth-card">
                <h2>
                    <LogIn className="auth-icon" />
                    Welcome Back
                </h2>
                
                <form onSubmit={handleSubmit(send)}>
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
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                    </div>

                    <button className="auth-button" type="submit">
                        Login
                    </button>
                </form>

                <div className="auth-link">
                    Don't have an account? <NavLink to="/register">Sign Up</NavLink>
                </div>
            </div>
        </div>
    );
}