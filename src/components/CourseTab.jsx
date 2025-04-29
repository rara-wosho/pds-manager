export default function CourseTab({ courseFilter, setCourseFilter }) {
    const courses = ["all", "bsit", "btle ia", "btle he", "bsmb"];

    return (
        <div
            style={{ gap: 8 }}
            className="d-flex align-items-center w-100 course-tab pe-2"
        >
            {courses.map((course) => (
                <div
                    key={course}
                    onClick={() => setCourseFilter(course)}
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
