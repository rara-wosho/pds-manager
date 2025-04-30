import React from "react";
import ProfileCard from "./ProfileCard";

function SearchResults({ results }) {
    return (
        <>
            <p className="mb-2 text-muted">
                {results.length > 1 ? "Results" : "Result"} : {results.length}
            </p>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 px-1">
                {results?.map((result) => (
                    <div key={result.user_id} className="col px-2">
                        <ProfileCard user={result} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default SearchResults;
