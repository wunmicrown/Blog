import React, { useState } from 'react';
import axios from 'axios';
import { FaBlog } from 'react-icons/fa';
import { API_URL } from '../constants/Api';
import { toast } from 'react-toastify';

const CreateCategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = { categoryName, description };

        try {
            const response = await axios.post(`${API_URL}/api/v1/categories/create`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log('Category created successfully:', response.data);
            toast.success('Category created successfully:', response.data);
            setCategoryName('');
            setDescription('');
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Error creating category:', error);
        }
    };


    return (
        <div className="mt-20  min-h-screen">
            <div className='max-w-lg mx-auto shadow-lg p-5 rounded text-gray-500'>
                <FaBlog className=" text-green-500 h-16 mx-auto w-full mt-8 mb-8" />
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="categoryName" className="block text-sm font-medium text-gray-500">Category Name</label>
                        <input type="text" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-semibold">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded-md px-3 py-2 w-full" />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 outline-none focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-green-100">Create Category</button>
                </form>
            </div>
        </div>
    );
};

export default CreateCategoryForm;
