import React from 'react';

const PostPreview = ({ post, imagePreview, onClose, handlePublish, handleSaveDraft }) => {
    return (
        <>
            <div className="text-white mb-10">
                <div className="text-white mt-20 gap-4 flex justify-end">
                    <button onClick={onClose} className="p-4 rounded-sm hover:text-green-400 font-semibold  hover:cursor-pointer">
                        Edit
                    </button>
                    <button onClick={onClose} className="p-4 rounded-sm hover:text-green-400 font-semibold  hover:cursor-pointer">
                        Preview
                    </button>
                </div>
                <div className='p-6'>
                    {imagePreview && <img src={imagePreview} alt="Cover" className=' w-full h-96' />}
                </div>
                <div className=' ml-6 mb-8 mt-6 text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-darkCoolGray-900'>
                    {post.title}
                </div>
                <div>
                    <div className=' ml-6 inline-block px-3 py-1 mb-4 text-xs font-medium leading-5 text-green-500 uppercase bg-green-100 rounded-full shadow-sm'>Category: {post.category}</div>
                    <div className=' ml-6 flex items-center mb-6 gap-3 text-sm md:text-base font-small text-coolGray-500 mt-2'>
                        {post.tags.map((tag, index) => (
                            <button className='hover:bg-[#3e5b50] hover:border-1 pl-4 pr-4 rounded-sm py-1 hover:border-[#019b65] hover:text-white hover:cursor-pointer' key={index}><span className='text-green-300'>#</span>{tag}</button>
                        ))}
                    </div>
                    <div className=" ml-6 text-lg font-medium  md:text-xl text-coolGray-500 border-coolGray-100">
                        <div dangerouslySetInnerHTML={{ __html: (post.content) }}></div>
                    </div>
                </div>
                <div className="text-start mt-4 text-white pb-8 ml-4 lg:ml-10">
                    <button className="rounded-lg bg-green-500 font-medium text-lg hover:bg-green-300 p-2 mr-2" onClick={handlePublish}>Publish</button>
                    <button className="rounded-sm ms-2 text-gray-200 p-2 font-medium hover:rounded-lg hover:bg-green-400 hover:text-white" onClick={handleSaveDraft}>Save draft</button>
                </div>
            </div>
        </>
    );
};

export default PostPreview;
