import { Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment } from 'react'

const Modal = () => {
  const URL = `${API_URL}/api/v1/posts`;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
};

  const deletePostHandler = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('User is not authenticated.');
            return;
        }
        const response = await axios.delete(`${URL}/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            navigate('/profile');
            toast.error("post delete successfully")
            setShowConfirmation(false);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};
  return (
    <>
      {/* Modal */}
      <Transition
                show={showConfirmation}
                as={Fragment}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="mb-4">Are you sure you want to delete this article?</p>
                        <div className="flex justify-end">
                            <button
                                className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={deletePostHandler} // Call deletePostHandler to delete the post
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                                onClick={closeConfirmationModal} // Close modal without deleting
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
    </>
  )
}

export default Modal