import React from "react";
import ProfileCard from "./ProfileCard";

function SearchResults({ results, searchTerm }) {
    return (
        <>
            <p className="mb-2 text-muted">
                {results.length > 1 ? "Results for" : "Result for"} {searchTerm}{" "}
                : {results.length}
            </p>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 px-1">
                {results?.map((result) => (
                    <div key={result.user_id} className="col px-2 mb-2 mb-md-3">
                        <ProfileCard user={result} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default SearchResults;
