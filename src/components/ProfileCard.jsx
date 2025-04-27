import { Link } from "react-router-dom";
import { BsPatchCheckFill } from "react-icons/bs";

function ProfileCard({ user }) {
    return (
        <div className="profile-card bg-white rounded-4 shadow-sm overflow-hidden">
            <Link to="/profile">
                <div className="flex-column center pt-3 pt-md-4 px-3 px-md-4 pb-3">
                    <div className="profile-card-img mb-3 rounded-circle p-1 position-relative">
                        <img
                            style={{ objectFit: "cover" }}
                            src={user.image_path || "/images/default-img.jpg"}
                            width={90}
                            height={90}
                            className="rounded-circle"
                            alt=""
                        />
                        <div
                            style={{ bottom: 0, right: 0 }}
                            className="txt-primary position-absolute opacity-75"
                        >
                            <BsPatchCheckFill size={22} />
                        </div>
                    </div>

                    <h5 className="text-center text-dark card-name fs-6">
                        {user?.first_name} {user?.last_name}
                    </h5>
                    <p className="mb-0 text-secondary fs-7">
                        {user?.gender}, <span>{user?.age}</span>
                    </p>
                </div>
            </Link>
            <div className="center border-top btns">
                <Link className="btn py-2 w-100 rounded-4 text-secondary fw-bold btn-sm">
                    View PDS
                </Link>
            </div>
        </div>
    );
}

export default ProfileCard;
