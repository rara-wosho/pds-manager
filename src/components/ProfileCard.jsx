import { Link } from "react-router-dom";
import { BsPatchCheckFill } from "react-icons/bs";

function ProfileCard({ user }) {
    return (
        <Link to={`/profile/${user.user_id}`}>
            <div className="profile-card bg-white rounded-4 shadow-sm h-100 d-flex flex-column align-items-between">
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
                            className="text-accent position-absolute opacity-75"
                        >
                            <BsPatchCheckFill size={22} />
                        </div>
                    </div>

                    <h5 className="text-center text-dark card-name fs-6">
                        {user?.last_name}, {user?.first_name}
                    </h5>
                    <p className="mb-1 fs-7 text-secondary d-none d-md-inline-block">
                        {user?.email}
                    </p>
                    <p className="mb-0 text-secondary fs-7">
                        <span className="border-end pe-2">{user?.gender}</span>
                        <span className="border-start text-uppercase fw-semibold ps-2">
                            {user?.course}
                        </span>
                    </p>
                </div>

                <div className="mt-auto btns border-top">
                    <div className="btn py-2 w-100 rounded-4 text-secondary fw-bold btn-sm">
                        View PDS
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProfileCard;
