import { useUsers } from "../hooks/useUsers";
import ProfileCard from "../components/ProfileCard";
import Navbar from "../components/Navbar";
import DashboardOverview from "../components/DashboardOverview";
import CourseTab from "../components/CourseTab";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import { searchUser } from "../services/api";
import SearchResults from "../components/SearchResults";

function Home() {
    const [courseFilter, setCourseFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (searchTerm !== "") {
            searchUser(searchTerm).then((data) => {
                console.log("searching: ", searchTerm);
                setResults(data);
            });

            console.log(results);
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    const {
        data: users,
        isLoading,
        isFetching,
        refetch,
        isPending,
        isError,
        error,
    } = useUsers(courseFilter);

    if (isError)
        return (
            <div className="alert alert-danger text-center">
                An error occured while fetching data. Please try refreshing the
                website or check your internet connection.
            </div>
        );

    return (
        <>
            <div
                style={{ paddingTop: "5rem" }}
                className="home-page min-h-100 mx-auto pb-3"
            >
                <Navbar />

                {/* MAIN BODY  */}
                <div
                    style={{ maxWidth: 1100 }}
                    className="wrapper mx-auto px-3"
                >
                    <DashboardOverview />
                    <div className="row">
                        <div className="col col-12 col-md-5 mb-3 d-flex align-items-center">
                            <CourseTab
                                courseFilter={courseFilter}
                                setCourseFilter={setCourseFilter}
                                setSearchTerm={setSearchTerm}
                                searchTerm={searchTerm}
                            />
                        </div>
                        <div className="col col-12 col-md-7 d-flex align-items-center justify-content-end mb-3">
                            <div className="input-group">
                                <input
                                    value={searchTerm}
                                    type="text"
                                    className="form-control border-0 rounded-3 bg-white shadow-sm"
                                    placeholder="Search user..."
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <button className="btn btn-primary input-group-text">
                                    Search
                                </button>
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="btn btn-outline-danger input-group-text"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="p-5 center">
                            <div className="spinner-border" role="status"></div>
                        </div>
                    ) : (
                        <>
                            {searchTerm !== "" ? (
                                <SearchResults
                                    results={results}
                                    searchTerm={searchTerm}
                                />
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
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
