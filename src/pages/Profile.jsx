import { BsPatchCheckFill } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
import { FiHome } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import DatasheetForm from "../components/DatasheetForm";
import Footer from "../components/Footer";
import { getUserById } from "../services/api";

import { useQuery } from "@tanstack/react-query";

function Profile() {
    const { user: sessionId, signOutUser } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: user,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["users", id],
        queryFn: () => getUserById(id),
    });

    if (isError) console.log("error fetching user from profile", error);

    if (isLoading)
        return (
            <div className="center min-h-100 p-5">
                <div className="spinner-border" role="status"></div>
            </div>
        );

    return (
        <>
            {!user ? (
                <div className="container min-h-100 center">
                    <div className="alert alert-danger">
                        We cannot find this user. This is maybe because they
                        deleted their account or this user id doesn't exit.
                    </div>
                </div>
            ) : (
                <div
                    style={{ maxWidth: 1100 }}
                    className="profile-page align-items-center d-flex w-100 flex-column min-h-100 p-0 p-md-4 mx-auto"
                >
                    {/* header  */}
                    <div className="profile-header w-100">
                        <div className="d-flex justify-content-between p-3">
                            <div
                                onClick={() => navigate(-1)}
                                className="p-2 cursor shadow center rounded-circle bg-light"
                            >
                                <FiHome size={20} />
                            </div>
                            {sessionId?.id == id && (
                                <div
                                    style={{ zIndex: 10 }}
                                    onClick={signOutUser}
                                    className="btn shadow btn-danger fs-7 rounded-pill center px-4"
                                >
                                    <FiLogOut /> logout
                                </div>
                            )}
                        </div>
                    </div>

                    {/* body  */}
                    <div className="w-100 position-relative d-flex flex-column align-items-center profile-body px-3">
                        <div className="profile-pic-container mb-4 rounded-circle p-2 center position-relative">
                            <img
                                src={
                                    user?.image_path
                                        ? user.image_path
                                        : "/images/default-img.jpg"
                                }
                                className="rounded-circle"
                                width={165}
                                height={165}
                                alt=""
                            />
                            <div className="check-badge">
                                <BsPatchCheckFill
                                    size={42}
                                    color="rgb(160, 64, 230)"
                                />
                            </div>
                        </div>
                        <p className="text-secondary mb-2 text-center">
                            {user?.email ?? "email not set"}
                        </p>
                        <h1 className="text-muted text-center fw-bold">
                            {user?.first_name} {user?.middle_name}{" "}
                            {user?.last_name}
                        </h1>
                        {user?.barangay ||
                            user?.municipality ||
                            (user?.province && (
                                <i className="fs-4 text-muted mb-2 text-center d-flex align-items-center">
                                    {user?.barangay}
                                    {user?.municipality}
                                    {user?.province}
                                </i>
                            ))}

                        <p className="mb-0 text-secondary text-center">
                            {user?.address && user?.address}
                        </p>
                    </div>

                    <DatasheetForm
                        userProfile={user}
                        sessionId={sessionId.id}
                    />
                </div>
            )}

            <Footer />
        </>
    );
}

export default Profile;
