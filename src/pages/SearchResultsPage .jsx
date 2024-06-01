import React from "react";
import { useLocation } from "react-router-dom";
import Posts from "./postsFolder/Posts";

const SearchResultsPage = () => {
    const location = useLocation();
    const { posts, noResults } = location.state || { posts: [], noResults: false };

    return (
        <div className="container mx-auto p-4 mt-20">
            {noResults ? (
                <div className="text-red-800 text-center pt-80">No results match that query</div>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Search Results</h1>
                    <div>
                        <Posts posts={posts} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResultsPage;
