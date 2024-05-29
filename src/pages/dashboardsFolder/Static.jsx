import React from 'react';
import { Link } from 'react-router-dom';

const Static = ({ user, userStats }) => {
  return (
    <>
      {user && userStats !== null && (
        <div className='mx-auto w-full max-w-screen-lg mt-16 px-4 text-center'>
          <div key={userStats._id} className='flex-row md:grid-cols-2 gap-4 grid lg:grid-cols-3 grid-cols-2'>
            <div className='bg-[rgb(55,65,81)] text-white pl-4 pr-6 pt-6 pb-6 rounded-lg'>
              <strong className=' text-xl bg-[#82888a] pl-1 pr-1 rounded-lg'>{userStats.totalComments}</strong>
              <p className='text-sm whitespace-nowrap'>Total post comments</p>
            </div>
            <div className='bg-[rgb(55,65,81)] text-white pl-4 pr-6 pt-6 pb-6 rounded-lg'>
              <strong className=' text-xl bg-[#82888a] pl-1 pr-1 rounded-lg'>{userStats.totalPostLikes}</strong>
              <p className='text-sm whitespace-nowrap'>Total post likes</p>
            </div>
            <Link to={`/${userStats._id}/drafts`}>
            <div className='bg-[rgb(55,65,81)] text-white pl-4 pr-6 pt-6 pb-6 rounded-lg'>
              <strong className=' text-xl bg-[#82888a] pl-1 pr-1 rounded-lg'>{userStats.draft}</strong>
              <p className='text-sm whitespace-nowrap'>Draft Posts</p>
            </div>
            </Link>
            <Link to={`/${userStats.authorUsername}/posts`}>
              <div className='bg-[rgb(55,65,81)] text-white pl-4 pr-6 pt-6 pb-6 rounded-lg'>
                <strong className=' text-xl bg-[#82888a] pl-1 pr-1 rounded-lg'>{userStats.published}</strong>
                <p className='text-sm whitespace-nowrap font-bold'>Published Posts</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Static;
