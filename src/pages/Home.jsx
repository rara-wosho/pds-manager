import { useUsers } from "../hooks/useUsers";
import ProfileCard from "../components/ProfileCard";
import Navbar from "../components/Navbar";
import DashboardOverview from "../components/DashboardOverview";
import CourseTab from "../components/CourseTab";

import { useState } from "react";

function Home() {
    const [courseFilter, setCourseFilter] = useState("all");

    const {
        data: users,
        isLoading,
        isFetching,
        isPending,
        isError,
        error,
    } = useUsers(courseFilter);

    console.log("User data: ", users);

    if (isError)
        return (
            <div className="alert alert-danger text-center">
                An error occured while fetching data. Please try refreshing the
                website or check your internet connection.
            </div>
        );

    return (
        <div
            style={{ paddingTop: "5rem" }}
            className="home-page min-h-100 mx-auto"
        >
            <Navbar />

            {/* MAIN BODY  */}
            <div style={{ maxWidth: 1100 }} className="wrapper mx-auto px-3">
                <DashboardOverview />
                <div className="row">
                    <div className="col col-12 col-md-5 mb-3 d-flex align-items-center">
                        <CourseTab
                            courseFilter={courseFilter}
                            setCourseFilter={setCourseFilter}
                        />
                    </div>
                    <div className="col col-12 col-md-7 d-flex align-items-center mb-3">
                        <input
                            placeholder="Search..."
                            type="text"
                            className="w-100 border-0 form-control ms-auto"
                        />
                        <button className="btn btn-primary btn-sm ms-2">
                            Search
                        </button>
                        <button className="btn btn-outline-danger btn-sm ms-2">
                            Reset
                        </button>
                    </div>
                </div>
                {isLoading ? (
                    <div className="p-5 center">
                        <div className="spinner-border" role="status"></div>
                    </div>
                ) : (
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 px-1">
                        {users?.map((user) => {
                            return (
                                <div
                                    key={user.user_id}
                                    className="col px-1 px-md-2 mb-2 mb-md-3"
                                >
                                    <ProfileCard user={user} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
