import ProfileStatus from "./ui/ProfileStatus";
import { useUsers } from "../hooks/useUsers";

import { memo } from "react";

function DashboardOverview() {
    const { data: users, isLoading } = useUsers();

    console.log("dashboard overview rendered");
    // Count users based on their course
    const courseCounts = {
        bsit: 0,
        "btle ia": 0,
        "btle he": 0,
        bsmb: 0,
    };

    if (users && users.length > 0) {
        users.forEach((user) => {
            const course = user.course;
            if (courseCounts[course] !== undefined) {
                courseCounts[course] += 1;
            }
        });
    }

    return (
        <div className="row px-2 mb-3">
            <div className="col col-12 col-md-7 mb-2 mb-md-0 px-3">
                <div className="row row-cols-4 bg-white shadow-sm rounded-4">
                    <div className="col py-3">
                        <div className="flex-column pe-2 center border-end">
                            <h2 className="mb-0 txt-muted fw-semibold">
                                {courseCounts["bsit"]}
                            </h2>
                            <p className="mb-0 text-secondary fs-7">BSIT</p>
                        </div>
                    </div>
                    <div className="col py-3">
                        <div className="flex-column pe-2 center border-end">
                            <h2 className="mb-0 txt-muted fw-semibold">
                                {courseCounts["btle ia"]}
                            </h2>
                            <p className="mb-0 text-secondary fs-7">BTLE IA</p>
                        </div>
                    </div>
                    <div className="col py-3">
                        <div className="flex-column pe-2 center border-end">
                            <h2 className="mb-0 txt-muted fw-semibold">
                                {courseCounts["btle he"]}
                            </h2>
                            <p className="mb-0 text-secondary fs-7">BTLE HE</p>
                        </div>
                    </div>
                    <div className="col py-3">
                        <div className="flex-column pe-2 center">
                            <h2 className="mb-0 txt-muted fw-semibold">
                                {courseCounts["bsmb"]}
                            </h2>
                            <p className="mb-0 text-secondary fs-7">BSMB</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col ps-1 ps-md-2 pe-1 col-md-5 col-12">
                <ProfileStatus />
            </div>
        </div>
    );
}

export default memo(DashboardOverview);
