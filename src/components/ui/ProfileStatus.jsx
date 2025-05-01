function ProfileStatus() {
    return (
        <div className="rounded-4 bg-white border h-100 p-3 position-relative profile-status overflow-hidden">
            <div className="overlay center">
                <p className="mb-0 fw-bold text-muted">Upcoming Feature</p>
            </div>
            <p className="text-muted mb-0 fw-semibold">Your Profile Status</p>
            <p className="fs-7 fw-light mb-1">70% Completed</p>
            <div className="profile-status-bar rounded-pill position-relative overflow-hidden">
                <div className="bar rounded-pill"></div>
            </div>
        </div>
    );
}

export default ProfileStatus;
