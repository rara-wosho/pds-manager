function ProfileStatus() {
    return (
        <div className="rounded-4 bg-white shadow-sm h-100 p-3">
            <p className="text-muted mb-0 fw-semibold">Your Profile Status</p>
            <p className="fs-7 fw-light mb-1">70% Completed</p>
            <div className="profile-status-bar rounded-pill position-relative overflow-hidden">
                <div className="bar rounded-pill"></div>
            </div>
        </div>
    );
}

export default ProfileStatus;
