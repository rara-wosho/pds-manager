import GradientText from "../components/ui/GradientText";
import { Link } from "react-router-dom";

import { SiGoogletagmanager } from "react-icons/si";
import { useState } from "react";
import InputField from "../components/ui/InputField";

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        repeatPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.repeatPassword) {
            setErrorMessage("Passwords don't match");
        } else if (formData.password.length < 6) {
            setErrorMessage("Password must be atleast 6 characters.");
        } else {
            console.log("signed up");
        }
    };
    return (
        <div className="min-h-100 center signin-page py-5 w-100">
            <div className="wrapper signin-wrapper px-5 pb-4 pt-5 rounded-3 center flex-column position-relative">
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
                    onSubmit={handleSubmit}
                    style={{ width: 350 }}
                    action=""
                    className="mt-4"
                >
                    {errorMessage && (
                        <div className="alert py-2 alert-danger">
                            <small className="fs-7">{errorMessage}</small>
                        </div>
                    )}
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label fs-7 mb-1">
                            Email address
                        </label>
                        <InputField
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="Enter a valid email address"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fs-7 mb-1">Password</label>
                        <InputField
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            placeholder="Must be at least 6 characters"
                            type="password"
                            className="form-control bg-none"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="form-label fs-7 mb-1">
                            Confirm Password
                        </label>
                        <InputField
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            name="repeatPassword"
                            placeholder="Re-enter your password"
                            type="password"
                            required
                        />
                    </div>

                    <button
                        disabled={
                            formData.email == "" ||
                            formData.password == "" ||
                            formData.repeatPassword == ""
                        }
                        className="btn mt-3 w-100 primary-gradient text-light fw-bold"
                    >
                        Register
                    </button>

                    <p className="mb-0 py-2 text-secondary text-center">OR</p>
                    <Link className="btn btn-outline-secondary w-100" to="/">
                        Use an existing account
                    </Link>
                    <p className="text-secondary text-center mt-4 mb-0 fs-7">
                        By clicking register, you agreed to our{" "}
                        <span className="text-primary">
                            terms and conditions
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
