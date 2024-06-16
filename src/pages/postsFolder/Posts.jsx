import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import truncatePost from '../../utils/truncatepost';
import calculateTimeDifference from '../../utils/CalculateTime';
import { Card, CardBody } from 'reactstrap';

const Posts = ({ posts }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <CardBody className="flex flex-wrap mx-4 mb-8 md:mb-16">
        {isLoading ? (
          // Skeleton loader
          posts.map((post) => (
            <div key={post.id} className="w-full pt-2 lg:mx-3 shadow rounded-xl lg:w-[30.1%] md:w-[46%] md:mx-3 px-4 mb-8">
              <div className="flex flex-col w-full h-90 animate-pulse rounded-xl p-4 gap-4">
                <div className="bg-neutral-400/50 w-full object-cover h-40 animate-pulse block rounded-md"></div>
                <div className="flex flex-col gap-6">
                  <div className="bg-neutral-400/50 w-[40%] inline-block p-1 h-4 animate-pulse rounded-md"></div>
                  <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
                  <div className="bg-neutral-400/50 w-[90%] h-4 animate-pulse rounded-md"></div>
                  <div className="bg-neutral-400/50 w-[25%] h-4 animate-pulse rounded-md"></div>
                  <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="w-full pt-2 lg:mx-3 shadow rounded-xl lg:w-[30.1%] md:w-[46%] md:mx-3 px-4 mb-8">
              <Link
                to={`/posts/${post.id}`}
                className="block mb-8 overflow-hidden rounded-md"
              >
                <img className="h-40 w-full object-cover" src={post?.coverImgUrl} alt={post.title} />
              </Link>

              <div className="mb-5">
                <Link
                  className="inline-block p-1 px-3 text-xs leading-5 text-[#0a4429] hover:text-green-600 font-medium uppercase bg-green-100 hover:bg-green-200 rounded-full shadow-sm"
                  to={`/${post.authorUsername}`}
                >
                  {post?.authorUsername}
                </Link>
              </div>
              <p className="mb-2 text-coolGray-500 font-medium">
                {calculateTimeDifference(post?.createdAt)}
              </p>
              <Link
                className="inline-block mb-4 md:text-xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:translate-x-1 transition-all duration-300 ease-in-out hover:text-green-300"
                to={`/posts/${post.id}`}
              >
                <h1>{post?.title}</h1>
              </Link>
              <div className="mb-4">
                {post.tags.map((tag, index) => (
                  <button key={index} className="hover:bg-[#3f6155] hover:border-1 pl-4 pr-4 rounded-sm py-1 hover:border-[#019b65] hover:text-white hover:cursor-pointer">
                    <span className="text-green-300">#</span> {tag}
                  </button>
                ))}
              </div>
              <div className="mb-4 text-coolGray-500">
                <div dangerouslySetInnerHTML={{ __html: truncatePost(post?.content) }}></div>
              </div>
            </Card>
          ))
        )}
      </CardBody>
    </>
  );
};

export default Posts;
