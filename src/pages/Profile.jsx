import { FiLogOut } from "react-icons/fi";
import { FiHome } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import DatasheetForm from "../components/DatasheetForm";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Footer from "../components/Footer";
import { getUserById } from "../services/api";

import { useQuery } from "@tanstack/react-query";
import Avatar from "../components/Avatar";

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
                    <div className="profile-header w-100 position-relative">
                        {user?.role === "admin" && (
                            <div
                                style={{
                                    border: "2px solid white",
                                    left: "50%",
                                    transform:
                                        "translateX(-50%) translateY(3rem)",
                                }}
                                className="admin-badge center px-3 rounded-pill position-absolute text-white primary-gradient fs-7"
                            >
                                <MdOutlineAdminPanelSettings className="me-1" />
                                ADMIN
                            </div>
                        )}
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
                        {/* avatar  */}
                        <Avatar
                            initialAvatarUrl={user.image_path}
                            userId={user.user_id}
                            sessionId={sessionId}
                        />
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
