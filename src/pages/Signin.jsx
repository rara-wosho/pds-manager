import GradientText from "../components/ui/GradientText";
import { Link, useNavigate } from "react-router-dom";
import { SiGoogletagmanager } from "react-icons/si";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import InputField from "../components/ui/InputField";

function Signin() {
    const navigate = useNavigate();
    const { user, signInUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await signInUser(
            formData.email,
            formData.password
        );

        if (error) {
            console.error("error while signin in", error.message);
            setErrorMessage(error.message);
        } else {
            console.log("success signing in", data);
            navigate("/profile");
        }

        setLoading(false);
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

                <form
                    onSubmit={handleSignIn}
                    style={{ width: 350 }}
                    action=""
                    className="mt-4 "
                >
                    {errorMessage && (
                        <div className="alert py-2 alert-danger">
                            <small className="fs-7">{errorMessage}</small>
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label mb-1 fs-7">Email</label>
                        <InputField
                            required
                            value={formData.email}
                            handleChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="Enter a valid email address"
                        />
                    </div>
                    <div className="">
                        <label className="form-label mb-1 fs-7">Password</label>
                        <InputField
                            required
                            value={formData.password}
                            handleChange={handleChange}
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
                        disabled={
                            formData.email == "" ||
                            formData.password == "" ||
                            loading
                        }
                        className="btn mt-3 w-100 primary-gradient text-light fw-bold"
                    >
                        {loading ? (
                            <div
                                class="spinner-border spinner-border-sm"
                                role="status"
                            ></div>
                        ) : (
                            "Sign In"
                        )}
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
