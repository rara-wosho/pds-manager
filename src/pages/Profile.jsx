import { useState } from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HiSwitchHorizontal } from "react-icons/hi";
import { SiGoogletagmanager } from "react-icons/si";
import { MdOutlineContentCopy } from "react-icons/md";

function Home() {
    const [readOnly, setReadOnly] = useState(true);

    return (
        <div
            style={{ maxWidth: 900 }}
            className="profile-page d-flex flex-column align-items-center justify-content-start min-h-100 p-0 p-md-4 mx-auto"
        >
            {/* header  */}
            <div className="profile-header w-100">
                <div className="d-flex justify-content-between p-3">
                    <div className="p-2 cursor center rounded-circle bg-light">
                        <IoMdArrowRoundBack size={20} />
                    </div>
                    <div className="active-badge fs-7 rounded-pill center bg-light px-4">
                        Active
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="p-2 cursor center rounded-circle bg-light">
                            <HiSwitchHorizontal size={20} />
                        </div>
                        {/* <div className="p-2 ms-2 cursor center rounded-circle bg-light">
                            <FaHeart size={18} />
                        </div>
                        <div className="p-2 ms-2 cursor center rounded-circle bg-light">
                            <SlOptions size={18} />
                        </div> */}
                    </div>
                </div>
            </div>

            {/* body  */}
            <div className="w-100 position-relative d-flex flex-column align-items-center profile-body px-3">
                <div className="profile-pic-container mb-4 rounded-circle p-2 center position-relative">
                    <img
                        src="https://i.pinimg.com/736x/f8/0d/22/f80d22e1a337e1e7cd745c12a2b3426b.jpg"
                        className="rounded-circle"
                        width={180}
                        height={180}
                        alt=""
                    />
                    <div className="check-badge">
                        <BsPatchCheckFill size={42} color="rgb(160, 64, 230)" />
                    </div>
                </div>
                <p className="text-secondary mb-2 text-center">
                    raeldevprojects@gmail.com
                </p>
                <h1 className="text-muted text-center fw-bold">
                    Israel P. De Vera
                </h1>
                <i className="fs-4 text-muted mb-2 text-center">
                    Editorial Cartoonist
                </i>
                <p className="mb-0 text-secondary text-center">
                    Macabayao, Jimenez Misamis Occidental
                </p>

                <div
                    style={{ gap: 8 }}
                    className="d-flex align-items-center py-4"
                >
                    <button className="btn btn-success px-2 px-md-4">
                        Update Infos
                    </button>
                    <button className="btn btn-outline-danger px-2 px-md-4">
                        Delete Account
                    </button>
                    <button className="btn btn-outline-secondary">
                        <MdOutlineContentCopy size={18} />
                    </button>
                </div>
                <div className="border-bottom w-100 mt-3"></div>
            </div>

            {/* edit section */}
            <div className="w-100 px-3 profile-edit-section py-5 position-relative">
                {readOnly && <div className="edit-section-cover"></div>}
                <div className="d-flex align-items-center mb-2 justify-content-between">
                    <h5 className="text-muted mb-0">Personal informations</h5>
                    <button
                        onClick={() => setReadOnly(!readOnly)}
                        className="btn btn-sm btn-primary px-4"
                    >
                        {readOnly ? "Edit" : "Save Changes"}
                    </button>
                </div>
                <div className="row row-cols-1 row-cols-md-2 px-2">
                    <div className="col px-1">
                        <div class="mb-3">
                            <label for="firstname" class="form-label">
                                First Name
                            </label>
                            <input
                                type="email"
                                class="form-control bg-none"
                                id="firstname"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
                    <div className="col px-1">
                        <div class="mb-3">
                            <label for="lastname" class="form-label">
                                Last Name
                            </label>
                            <input
                                type="email"
                                class="form-control bg-none"
                                id="lastname"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
