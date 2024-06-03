import React from 'react';
import { useParams } from 'react-router-dom';

const CoverImageView = () => {
    const { imageUrl } = useParams();

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="block select-none mx-auto bg-gray-300 transition-colors duration-300">
                <img
                    src={decodeURIComponent(imageUrl)}
                    alt="Cover"
                    className="w-[1000px] h-[420px] overflow-hidden"
                />
            </div>
        </div>
    );
};

export default CoverImageView;
