import React from 'react';
import { Link } from 'react-router-dom';
import truncatePost from '../../utils/truncatepost';
import calculateTimeDifference from '../../utils/calculateReadingtime';

const UserPosts = ({ posts, isCreator, openConfirmationModal }) => {
  return (
    <div className="flex flex-wrap mx-4 mb-8 md:mb-16">
      {posts.map((post) => (
        <div key={post._id} className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8 relative">
          <Link
            to={`/posts/${post._id}`}
            className="block mb-10 overflow-hidden rounded-md"
          >
            <img className="h-40 w-full" src={post?.coverImgUrl} alt={post.title} />
          </Link>
          <div className="mb-4">
            <Link
              className="inline-block py-1 px-3 text-xs leading-5 text-green-500 hover:text-green-600 font-medium uppercase bg-green-100 hover:bg-green-200 rounded-full shadow-sm"
              to={`/user/${post.authorId}`}
            >
              {post?.authorUsername}
            </Link>

            {isCreator && (
            <div className="absolute bg-red-600 top-0 right-0 flex flex-col space-y-2 m-2">
              <Link
                to={`/update-post/${post._id}/edit`}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {/* Edit icon SVG path */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 3v2a2 2 0 002 2h2M15 21v-2a2 2 0 00-2-2h-2"
                  />
                </svg>
              </Link>
              <button
                onClick={() => openConfirmationModal(post._id)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {/* Delete icon SVG path */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          )}
          </div>
          <p className="mb-2 text-coolGray-500 font-medium">
            {calculateTimeDifference(post?.createdAt)}
          </p>
          <Link
            className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:translate-x-1 transition-all duration-300 ease-in-out hover:text-green-300"
            to={`/posts/${post._id}`}
          >
            {post?.title}
          </Link>
          <div className="mb-4">
            {post.tags.map((tag, index) => (
              <button key={index} className="hover:bg-[#3f6155] hover:border-1 pl-4 pr-4 rounded-sm py-1 hover:border-[#019b65] hover:text-white hover:cursor-pointer">
                <span className='text-green-300'>#</span> {tag}
              </button>
            ))}
          </div>
          <div className="mb-4 text-coolGray-500">
            <div dangerouslySetInnerHTML={{ __html: truncatePost(post?.content) }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
