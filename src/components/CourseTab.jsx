export default function CourseTab({
    courseFilter,
    setCourseFilter,
    setSearchTerm,
    searchTerm,
}) {
    const courses = ["all", "bsit", "btle ia", "btle he", "bsmb"];

    const handleSetCourse = (i) => {
        if (searchTerm !== "") {
            setSearchTerm("");
        }
        setCourseFilter(courses[i]);
    };
    return (
        <div
            style={{ gap: 8 }}
            className="d-flex align-items-center w-100 course-tab pe-2"
        >
            {courses.map((course, i) => (
                <div
                    key={course}
                    onClick={() => handleSetCourse(i)}
                    className={`px-3 btn-sm flex-shrink-0 fs-7 d-flex btn text-uppercase ${
                        courseFilter === course
                            ? "btn-primary"
                            : "btn-outline-secondary"
                    }`}
                    style={{ cursor: "pointer" }}
                >
                    {course === "all" ? "ALL" : course}
                </div>
            ))}
        </div>
    );
}
