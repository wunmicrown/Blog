import React from 'react'
import { Link } from "react-router-dom";
import truncatePost from "../../utils/truncatepost";
import calculateTimeDifference from '../../utils/CalculateTime';

const Posts = ({ posts }) => {

  return (
    <>

      <div className="flex flex-wrap mx-4 mb-8 md:mb-16">
        {posts.map((post) => (
          <div key={post.id} className="w-full lg:w-1/3 md:w-1/2 px-4 mb-8">
            <Link
              to={`/posts/${post.id}`}
              className="block mb-10 overflow-hidden rounded-md"
            >
              <img className="h-40 w-full" src={post?.coverImgUrl} alt={post.title} />
            </Link>

            <div className="mb-4">
              <Link
                className="inline-block py-1 px-3 text-xs leading-5 text-green-500 hover:text-green-600 font-medium uppercase bg-green-100 hover:bg-green-200 rounded-full shadow-sm"
                to={`/${post.authorUsername}`}
              >
                {post?.authorUsername}
              </Link>
            </div>
            <p className="mb-2 text-coolGray-500 font-medium">
              {calculateTimeDifference(post?.createdAt)}
            </p>
            <Link
              className="inline-block mb-4 text-2xl md:text-3xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:translate-x-1 transition-all duration-300 ease-in-out hover:text-green-300 "
              to={`/posts/${post.id}`}
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
    </>
  )
}

export default Posts