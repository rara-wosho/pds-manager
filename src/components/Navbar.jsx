import { SiGoogletagmanager } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";

import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Navbar({ image_path }) {
    const { user, signOutUser, currentUser } = useAuth();
    return (
        <div
            style={{ zIndex: 999 }}
            className="navbar-wrapper bg-white mb-2 mb-md-3 position-fixed top-0 start-0 w-100 border-bottom"
        >
            <div
                style={{ maxWidth: 1100 }}
                className="py-3 d-flex align-items-center mx-auto px-3"
            >
                <a
                    href=""
                    className="fw-bold text-dark text-uppercase d-flex align-items-center text-primary"
                >
                    <div className="primary-gradient p-1 center rounded-circle me-2">
                        <SiGoogletagmanager color="white" size={17} />
                    </div>
                    PDS MANAGER
                </a>

                <div className="avatar-container d-flex align-items-center ms-auto">
                    <Link to={`/profile/${user.id}`}>
                        <img
                            src="/images/default-img.jpg"
                            width={35}
                            height={35}
                            className="rounded-circle shadow-sm"
                            alt=""
                        />
                        <div className="text-muted fw-medium mx-2 d-none d-md-inline-flex align-items-center">
                            {currentUser?.first_name} {currentUser?.last_name}
                        </div>
                    </Link>

                    <div
                        onClick={signOutUser}
                        className="btn btn-sm ms-3 fw-semibold btn-outline-danger"
                    >
                        <FiLogOut />
                        <p className="mb-0 ms-1 d-none d-md-inline-block">
                            Log Out
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
