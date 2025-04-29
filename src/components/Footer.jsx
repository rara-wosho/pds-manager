function Footer() {
    return (
        <div className="w-100 bg-white">
            <div
                style={{ maxWidth: 1100 }}
                className="w-100 mx-auto py-5 px-3 center flex-column"
            >
                <div className="d-flex align-items-center">
                    <img width={18} src="\public\vite.svg" alt="" />
                    <p className="mb-0 fw-bold text-muted ms-1 fs-7">
                        PDS MANAGER
                    </p>
                </div>
                <h4 className="mb-0 py-3">Manage Personal Data with Ease.</h4>
                <div className="d-flex align-items-center">
                    <p className="mb-0 px-3 fs-7">Features</p>
                    <p className="mb-0 px-3 fs-7">Pricing</p>
                    <p className="mb-0 px-3 fs-7">Blogs</p>
                    <p className="mb-0 px-3 fs-7">About Us</p>
                </div>
            </div>
            <div className="primary-gradient py-3">
                <div
                    className="mx-auto px-3 fs-7 text-white  d-flex justify-content-between"
                    style={{ maxWidth: 1100 }}
                >
                    <div className="text-white fs-7">
                        Developed by Israel De Vera
                    </div>
                    <div className="text-white fs-7">
                        All Rights Reserved@2025
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
