import GradientText from "../components/ui/GradientText";
import { Link } from "react-router-dom";
import { SiGoogletagmanager } from "react-icons/si";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import InputField from "../components/ui/InputField";

function Signin() {
    const { signIn } = useAuth();

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-100 center signin-page flex-column center pt-5">
            <div className="wrapper signin-wrapper mb-3 p-5 rounded-3 center flex-column position-relative">
                <div className="icon-wrapper primary-gradient p-3 rounded-circle">
                    <SiGoogletagmanager color="white" size={48} />
                </div>

                <GradientText textStyle="mt-4 fs-2 fw-semibold text-uppercase">
                    PDS Manager
                </GradientText>
                <small className="mb-2 text-secondary text-center">
                    Manage Personal Data with Ease.
                </small>

                <form style={{ width: 350 }} action="" className="mt-4 ">
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label mb-1 fs-7"
                        >
                            Email
                        </label>
                        <input
                            required
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            className="form-control bg-none"
                            id="exampleFormControlInput1"
                            placeholder="Enter a valid email address"
                        />
                    </div>
                    <div className="">
                        <label className="form-label mb-1 fs-7">Password</label>
                        <InputField
                            required
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            placeholder="Enter Password"
                            type="password"
                        />
                    </div>

                    <div className="d-flex justify-content-between my-3">
                        <label
                            htmlFor="remember"
                            className="d-flex align-items-center"
                        >
                            <input
                                type="checkbox"
                                name=""
                                id="remember"
                                className="me-1"
                            />
                            <small className="text-secondary">
                                Remember me
                            </small>
                        </label>
                        <small className="text-primary">Forgot Password?</small>
                    </div>

                    <button
                        onClick={signIn}
                        disabled={
                            formData.email == "" || formData.password == ""
                        }
                        className="btn mt-3 w-100 primary-gradient text-light fw-bold"
                    >
                        Login
                    </button>

                    <p className="mb-0 py-2 text-secondary text-center">OR</p>
                    <Link
                        className="btn btn-outline-secondary w-100"
                        to="signup"
                    >
                        Register an account
                    </Link>
                </form>
            </div>
            <small className="text-secondary">
                <i>Developed by Israel De Vera</i>
            </small>
        </div>
    );
}

export default Signin;
