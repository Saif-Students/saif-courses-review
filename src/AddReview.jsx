import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Client, Databases } from 'appwrite';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddReview = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Initialize Appwrite Client
  const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite Project ID

  const databases = new Databases(client);

  const onSubmit = async (data) => {
    try {
      await databases.createDocument(
        "678786150014627a96fa", // Replace with your Database ID
        "67878633000e5e9e8bb4", // Replace with your Collection ID
        'unique()', // Unique ID, or use your own
        data // Form data to be stored
      );
      toast.success('Review submitted successfully!');
    } catch (error) {
      toast.error('Error submitting review. Please try again.');
    //   console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
      <motion.form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Add a Review</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">Student Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-3 rounded bg-gray-700 text-white"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="linkedin" className="block text-sm font-medium mb-2">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            className="w-full p-3 rounded bg-gray-700 text-white"
            {...register('linkedin', { required: 'LinkedIn URL is required' })}
          />
          {errors.linkedin && <span className="text-red-500 text-sm">{errors.linkedin.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="review" className="block text-sm font-medium mb-2">Review</label>
          <textarea
            name="review"
            id="review"
            rows="4"
            className="w-full p-3 rounded bg-gray-700 text-white"
            {...register('review', { required: 'Review is required' })}
          />
          {errors.review && <span className="text-red-500 text-sm">{errors.review.message}</span>}
        </div>

        <motion.button
          type="submit"
          className="w-full bg-indigo-600 p-3 rounded text-white font-bold hover:bg-indigo-500 transition"
          whileHover={{ scale: 1.05 }}
        >
          Submit Review
        </motion.button>
      </motion.form>

      <ToastContainer />
    </div>
  );
};

export default AddReview;
