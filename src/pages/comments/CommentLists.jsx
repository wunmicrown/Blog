// CommentsList.jsx
import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <div className="flex-none">
          <img
            src="https://via.placeholder.com/50"
            alt="avatar"
            className="rounded-full h-12 w-12"
          />
        </div>
        <div className="flex-grow">
          <div>
            {comments?.length <= 0 ? (
              <h2>No Comments</h2>
            ) : (
              comments.map((comment) => (
                <div key={comment._id}>
                  <div className="bg-blue-50 px-4 py-3 sm:px-6 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium text-green-600">
                        {comment?.author}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(comment?.createdAt).toDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 px-4 py-3 sm:px-6">
                    <p className="mt-1 text-sm text-gray-700">
                      {comment?.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
