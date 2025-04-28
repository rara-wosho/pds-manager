import { SiGoogletagmanager } from "react-icons/si";
import { FiLogOut } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { signOutUser } = useAuth();
    return (
        <div className="navbar-wrapper bg-white mb-2 mb-md-3 position-fixed top-0 start-0 w-100">
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
                    <img
                        src="https://i.pinimg.com/736x/c7/9a/37/c79a37e13ef14be556b51143bcbb1b01.jpg"
                        width={35}
                        height={35}
                        className="rounded-circle shadow-sm"
                        alt=""
                    />
                    <div className="text-muted fw-semibold mx-2 d-none d-md-inline-block">
                        Israel De Vera
                    </div>

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
