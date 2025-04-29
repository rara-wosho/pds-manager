import { useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client"; // Using your import structure

import InputField from "./ui/InputField";

export default function DatasheetForm({ userProfile, sessionId }) {
    const [readOnly, setReadOnly] = useState(true);
    const queryClient = useQueryClient();

    // Initialize form data with nested structure matching your database tables
    const [formData, setFormData] = useState({
        // Users table data
        user: {
            first_name: userProfile?.first_name || "",
            last_name: userProfile?.last_name || "",
            middle_name: userProfile?.middle_name || "",
            suffix: userProfile?.suffix || "",
            nickname: userProfile?.nickname || "",
            contact_number: userProfile?.contact_number || "",
            email: userProfile?.email || "",
            age: userProfile?.age || "",
            gender: userProfile?.gender || "",
            civil_status: userProfile?.civil_status || "",
            religion: userProfile?.religion || "",
            birthday: userProfile?.birthday || undefined,
            birthplace: userProfile?.birthplace || "",
            course: userProfile?.course || "",
            year_section: userProfile?.year_section || "",
            highschool: userProfile?.highschool || "",
            year_graduated: userProfile?.year_graduated || "",
            nationality: userProfile?.nationality || "",
        },
        // Address table data
        address: {
            house_number: userProfile?.addresses?.[0]?.house_number || "",
            barangay: userProfile?.addresses?.[0]?.barangay || "",
            municipality: userProfile?.addresses?.[0]?.municipality || "",
            zip_code: userProfile?.addresses?.[0]?.zip_code || "",
            province: userProfile?.addresses?.[0]?.province || "",
            region: userProfile?.addresses?.[0]?.region || "",
        },
        // Parents_guardians table data
        parents_guardians: {
            father_full_name:
                userProfile?.parents_guardians?.[0]?.father_full_name || "",
            father_occupation:
                userProfile?.parents_guardians?.[0]?.father_occupation || "",
            father_contact_number:
                userProfile?.parents_guardians?.[0]?.father_contact_number ||
                "",
            father_status:
                userProfile?.parents_guardians?.[0]?.father_status || "",
            mother_full_name:
                userProfile?.parents_guardians?.[0]?.mother_full_name || "",
            mother_occupation:
                userProfile?.parents_guardians?.[0]?.mother_occupation || "",
            mother_contact_number:
                userProfile?.parents_guardians?.[0]?.mother_contact_number ||
                "",
            mother_status:
                userProfile?.parents_guardians?.[0]?.mother_status || "",
            guardian_full_name:
                userProfile?.parents_guardians?.[0]?.guardian_full_name || "",
            guardian_occupation:
                userProfile?.parents_guardians?.[0]?.guardian_occupation || "",
            guardian_contact_number:
                userProfile?.parents_guardians?.[0]?.guardian_contact_number ||
                "",
            guardian_status:
                userProfile?.parents_guardians?.[0]?.guardian_status || "",
        },
    });

    // Mutation function to update user data in Supabase (handles all 3 tables)
    const updateUserMutation = useMutation({
        mutationFn: async (formData) => {
            // Start a transaction to update all related tables

            // 1. Update user table
            const { error: userError } = await supabase
                .from("users")
                .update(formData.user)
                .eq("user_id", userProfile.user_id);

            if (userError) throw userError;

            // 2. Update address table
            const { error: addressError } = await supabase
                .from("addresses")
                .upsert({
                    user_id: userProfile.user_id,
                    ...formData.address,
                    // If address already exists, this will update it
                    ...(userProfile.addresses?.[0]?.address_id
                        ? { address_id: userProfile.addresses[0].address_id }
                        : {}),
                });

            if (addressError) throw addressError;

            // 3. Update parents/guardians table
            const { error: parentsError } = await supabase
                .from("parents_guardians")
                .upsert({
                    user_id: userProfile.user_id,
                    ...formData.parents_guardians,
                    // If record already exists, this will update it
                    ...(userProfile.parents_guardians?.[0]?.record_id
                        ? {
                              record_id:
                                  userProfile.parents_guardians[0].record_id,
                          }
                        : {}),
                });

            if (parentsError) throw parentsError;

            return { success: true };
        },
        onSuccess: () => {
            // Invalidate and refetch queries related to user data
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setReadOnly(true);
        },
        onError: (error) => {
            console.error("Error updating profile:", error);
        },
    });

    // Mutation function to create new user data in Supabase
    const createUserMutation = useMutation({
        mutationFn: async (formData) => {
            // This assumes user_id comes from Supabase Auth
            // You would typically get this from the authenticated user
            const user_id = userProfile?.user_id || supabase.auth.getUser()?.id;

            if (!user_id) {
                throw new Error("No user ID available. Please log in again.");
            }

            // 1. Insert into users table
            const { error: userError } = await supabase.from("users").insert({
                user_id,
                ...formData.user,
            });

            if (userError) throw userError;

            // 2. Insert into address table
            const { error: addressError } = await supabase
                .from("addresses")
                .insert({
                    user_id,
                    ...formData.address,
                });

            if (addressError) throw addressError;

            // 3. Insert into parents/guardians table
            const { error: parentsError } = await supabase
                .from("parents_guardians")
                .insert({
                    user_id,
                    ...formData.parents_guardians,
                });

            if (parentsError) throw parentsError;

            return { success: true };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setReadOnly(true);
        },
        onError: (error) => {
            console.error("Error creating profile:", error);
        },
    });

    // Mutation function to delete user account
    const deleteUserMutation = useMutation({
        mutationFn: async () => {
            // With cascading delete set up in database, deleting from users table
            // will trigger deletion from the other tables
            const { error } = await supabase
                .from("users")
                .delete()
                .eq("user_id", userProfile.user_id);

            if (error) {
                throw error;
            }

            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            // Redirect to login or home page after deletion
            // navigate("/login"); // Uncomment and adjust based on your routing setup
        },
        onError: (error) => {
            console.error("Error deleting account:", error);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Determine which table the field belongs to
        if (
            name.startsWith("father_") ||
            name.startsWith("mother_") ||
            name.startsWith("guardian_")
        ) {
            setFormData((prev) => ({
                ...prev,
                parents_guardians: {
                    ...prev.parents_guardians,
                    [name]: value,
                },
            }));
        } else if (
            [
                "house_number",
                "barangay",
                "municipality",
                "zip_code",
                "province",
                "region",
            ].includes(name)
        ) {
            setFormData((prev) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                user: {
                    ...prev.user,
                    [name]: value,
                },
            }));
        }
    };

    const handleSubmit = () => {
        if (readOnly) {
            // Switch to edit mode
            setReadOnly(false);
        } else {
            // Save changes
            if (userProfile?.user_id) {
                // If user exists, update their info
                updateUserMutation.mutate(formData);
            } else {
                // If new user, create profile
                createUserMutation.mutate(formData);
            }
        }
    };

    const handleDeleteAccount = () => {
        if (
            window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            )
        ) {
            deleteUserMutation.mutate();
        }
    };

    return (
        <>
            {userProfile.user_id === sessionId && (
                <div
                    style={{ gap: 8 }}
                    className="d-flex align-items-center justify-content-center datasheet-form w-100 py-4"
                >
                    <button
                        onClick={handleSubmit}
                        className="btn btn-success px-2 px-md-4"
                        disabled={
                            updateUserMutation.isPending ||
                            createUserMutation.isPending
                        }
                    >
                        {updateUserMutation.isPending ||
                        createUserMutation.isPending
                            ? "Saving..."
                            : readOnly
                            ? "Edit Informations"
                            : "Save Changes"}
                    </button>
                    <button
                        className="btn btn-outline-danger px-2 px-md-4"
                        onClick={handleDeleteAccount}
                        disabled={
                            deleteUserMutation.isPending ||
                            !userProfile?.user_id
                        }
                    >
                        {deleteUserMutation.isPending
                            ? "Deleting..."
                            : "Delete Account"}
                    </button>
                    <button className="btn btn-outline-secondary">
                        <MdOutlineContentCopy size={18} />
                    </button>
                </div>
            )}

            <div className="d-flex flex-column w-100 datasheet-form pt-4 px-3 px-md-0">
                {readOnly && (
                    <div className="w-100 h-100 position-absolute"></div>
                )}

                <Section title="Personal Information">
                    <InputGroup
                        label="First Name"
                        name="first_name"
                        value={formData.user.first_name}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Last Name"
                        name="last_name"
                        value={formData.user.last_name}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Middle Name"
                        name="middle_name"
                        value={formData.user.middle_name}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Suffix/Name Extension (Optional)"
                        name="suffix"
                        value={formData.user.suffix}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Nickname"
                        name="nickname"
                        value={formData.user.nickname}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Phone Number"
                        name="contact_number"
                        value={formData.user.contact_number}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Email Address"
                        name="email"
                        value={formData.user.email}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Age"
                        name="age"
                        value={formData.user.age}
                        readOnly={readOnly}
                        handleChange={handleChange}
                        type="number"
                    />
                    <div className="col mb-3 px-1">
                        <label className="form-label mb-1">Gender</label>
                        <select
                            name="gender"
                            onChange={handleChange}
                            className="form-select bg-none"
                            value={formData.user.gender}
                            disabled={readOnly}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <InputGroup
                        label="Civil Status"
                        name="civil_status"
                        value={formData.user.civil_status}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Religion"
                        name="religion"
                        value={formData.user.religion}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Birthday"
                        name="birthday"
                        value={formData.user.birthday}
                        readOnly={readOnly}
                        handleChange={handleChange}
                        type="date"
                    />
                    <InputGroup
                        label="Birthplace"
                        name="birthplace"
                        value={formData.user.birthplace}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                </Section>

                <Section title="Academic">
                    <div className="col mb-3 px-1">
                        <label className="form-label mb-1">Course</label>
                        <select
                            name="course"
                            onChange={handleChange}
                            className="form-select bg-none"
                            value={formData.user.course}
                            disabled={readOnly}
                        >
                            <option value="">Select Course</option>
                            <option value="bsit">BSIT</option>
                            <option value="btle ia">BTLE IA</option>
                            <option value="btle he">BTLE HE</option>
                            <option value="bsmb">BSMB</option>
                        </select>
                    </div>
                    <InputGroup
                        label="Year and Section"
                        name="year_section"
                        value={formData.user.year_section}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Name of Highschool"
                        name="highschool"
                        value={formData.user.highschool}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Year Graduated"
                        name="year_graduated"
                        value={formData.user.year_graduated}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                </Section>

                <Section title="Address">
                    <InputGroup
                        label="House#, Street Name"
                        name="house_number"
                        value={formData.address.house_number}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Barangay"
                        name="barangay"
                        value={formData.address.barangay}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Municipality"
                        name="municipality"
                        value={formData.address.municipality}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Zip Code"
                        name="zip_code"
                        value={formData.address.zip_code}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Province"
                        name="province"
                        value={formData.address.province}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Region"
                        name="region"
                        value={formData.address.region}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                </Section>

                <Section title="Parents/Guardian" second_title="Father">
                    <InputGroup
                        label="Father's Full Name"
                        name="father_full_name"
                        value={formData.parents_guardians.father_full_name}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Occupation"
                        name="father_occupation"
                        value={formData.parents_guardians.father_occupation}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Contact Number"
                        name="father_contact_number"
                        value={formData.parents_guardians.father_contact_number}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Status"
                        name="father_status"
                        value={formData.parents_guardians.father_status}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                </Section>

                <Section second_title="Mother">
                    <InputGroup
                        label="Mother's Full Name"
                        name="mother_full_name"
                        value={formData.parents_guardians.mother_full_name}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Occupation"
                        name="mother_occupation"
                        value={formData.parents_guardians.mother_occupation}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Contact Number"
                        name="mother_contact_number"
                        value={formData.parents_guardians.mother_contact_number}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Status"
                        name="mother_status"
                        value={formData.parents_guardians.mother_status}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                </Section>
                <Section second_title="Guardian">
                    <InputGroup
                        label="Guardian's Full Name"
                        name="guardian_occupation"
                        value={formData.parents_guardians.guardian_occupation}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Occupation"
                        name="guardian_full_name"
                        value={formData.parents_guardians.guardian_occupation}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Contact Number"
                        name="guardian_contact_number"
                        value={
                            formData.parents_guardians.guardian_contact_number
                        }
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                    <InputGroup
                        label="Status"
                        name="guardian_status"
                        value={formData.parents_guardians.guardian_status}
                        readOnly={readOnly}
                        handleChange={handleChange}
                    />
                </Section>
            </div>
        </>
    );
}

const Section = ({ title, children, second_title }) => (
    <>
        {title && (
            <div className="w-100 datasheet-header mb-2 fw-semibold text-muted text-center py-2 rounded-2">
                <h6 className="text-muted fw-semibold mb-0">{title}</h6>
            </div>
        )}

        {second_title && (
            <p className="mb-1 fw-bold text-muted">{second_title}</p>
        )}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 px-2 mb-4">
            {children}
        </div>
    </>
);

const InputGroup = ({
    label,
    name,
    value,
    readOnly,
    handleChange,
    type = "text",
}) => (
    <div className="col mb-3 px-1">
        <label className="form-label mb-1">{label}</label>
        <InputField
            name={name}
            value={value}
            readOnly={readOnly}
            handleChange={handleChange}
            type={type}
            className="form-control"
        />
    </div>
);
