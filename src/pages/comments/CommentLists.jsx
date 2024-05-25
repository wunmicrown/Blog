const CommentsList = ({ comments }) => {
  // Filter out duplicate comments based on their _id
  const uniqueComments = comments.filter((comment, index, self) =>
    index === self.findIndex((c) => c._id === comment._id)
  );
  return (
    <div className="flex flex-col space-y-4">
      {comments?.length <= 0 ? (
        <h2></h2>
      ) : (
        uniqueComments.map((comment) => (
          <div key={comment._id}>
            <div className="bg-blue-50 px-4 py-4 sm:px-6 flex justify-between items-center">
              <div className="flex items-center">
                <img
                  src={comment.profilePic || "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"}
                  alt="avatar"
                  className="rounded-full h-12 w-12"
                />
                <div>
                  <h4 className="text-sm font-medium text-green-600 ml-4">
                    {comment.username}
                  </h4>
                  <p className="text-sm text-gray-500 ml-4">
                    {new Date(comment.createdAt).toDateString()}
                  </p>
                </div>  
              </div>
            </div>
            <div className="bg-green-50 px-4 py-3 sm:px-6">
              <p className="mt-1 text-lg text-gray-700 ml-8 font-serif leading-tight">
                {comment.content}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentsList;