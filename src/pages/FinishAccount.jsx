import { useState } from "react";
import InputField from "../components/ui/InputField";
import { useAuth } from "../context/AuthContext";

import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";

function FinishAccount() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    console.log(user.id);

    // Create form state
    const [formData, setFormData] = useState({
        user_id: user?.id,
        email: user?.email,
        first_name: "",
        last_name: "",
        middle_name: "",
        age: "",
        role: "user",
        gender: "",
        position: "",
        address: "",
        course: "",
        year_section: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Submitted formData:", formData);

        // You can now send `formData` to your backend or Supabase if you want
        const { error } = await supabase
            .from("users")
            .insert([{ ...formData }]);

        if (error) {
            console.log("error: ", error.message);
        } else {
            navigate("/home");
        }
        setLoading(false);
    };

    return (
        <div
            style={{ paddingTop: "4rem" }}
            className="min-h-100 center flex-column pb-5"
        >
            <div
                className="header w-100 bg-white py-3 center position-absolute"
                style={{ top: 0 }}
            >
                <div className="d-flex align-items-center fw-bold text-dark">
                    PDS MANAGER
                </div>
            </div>

            <form
                style={{ maxWidth: 1100 }}
                onSubmit={handleSubmit}
                className="bg-white p-3 w-100 rounded-4"
            >
                <div className="d-flex align-items-center mb-2 py-2 border-bottom">
                    <h4 className="mb-0">Finish your account</h4>
                </div>

                <h6 className="text-muted">Personal Information</h6>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 mb-3">
                    <div className="col px-2 mb-3">
                        <label className="form-label text-muted">
                            First Name
                        </label>
                        <InputField
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                            placeholder="Enter First Name"
                        />
                    </div>
                    <div className="col px-2 mb-3">
                        <label className="form-label text-muted">
                            Last Name
                        </label>
                        <InputField
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                            placeholder="Enter Last Name"
                        />
                    </div>
                    <div className="col px-2 mb-3">
                        <label className="form-label text-muted">
                            Middle Name (Optional)
                        </label>
                        <InputField
                            name="middle_name"
                            value={formData.middle_name}
                            onChange={handleChange}
                            placeholder="Enter Middle Name"
                        />
                    </div>
                    <div className="col px-2 mb-3">
                        <label className="form-label text-muted">
                            Email Address
                        </label>
                        <InputField
                            disabled
                            value={user?.email}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="col px-2 mb-3">
                        <label className="form-label text-muted">Age</label>
                        <InputField
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Enter Age"
                        />
                    </div>
                    <div className="col px-2 mb-3">
                        <label className="form-label text-muted">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="form-select"
                            aria-label="Select Gender"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="col px-2 mb-2">
                        <label className="form-label text-muted">
                            Position (Org members only)
                        </label>
                        <InputField
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="e.g., President"
                        />
                    </div>
                    <div className="col px-2 mb-2">
                        <label className="form-label text-muted">
                            Full Address
                        </label>
                        <InputField
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="e.g., Macabayo Jimenez Misamis Occidental"
                        />
                    </div>
                </div>

                <h6 className="text-muted">Academics</h6>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2">
                    <div className="col px-2 mb-2">
                        <label className="form-label text-muted">Course</label>
                        <InputField
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            placeholder="e.g., BSIT"
                        />
                    </div>
                    <div className="col px-2 mb-2">
                        <label className="form-label text-muted">
                            Year and Section
                        </label>
                        <InputField
                            name="year_section"
                            value={formData.year_section}
                            onChange={handleChange}
                            placeholder="e.g., 2nd - 2B"
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-end py-2 px-1">
                    <button
                        disabled={loading}
                        className="btn btn-primary ms-auto"
                    >
                        {loading ? (
                            <div
                                className="spinner-border spinner-border-sm"
                                role="status"
                            ></div>
                        ) : (
                            "Finish and Save"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FinishAccount;
