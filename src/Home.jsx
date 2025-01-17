import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Client, Databases } from 'appwrite';
import Masonry from 'react-masonry-css';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const ReviewCard = ({ img, name, username, body }) => (
  <figure className="relative w-full sm:w-64 cursor-pointer m-3 overflow-hidden rounded-xl border p-4 border-gray-800 bg-gray-900 hover:bg-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <div className="flex flex-row items-center gap-2">
      <img className="rounded-full" width="32" height="32" alt="" src={img} />
      <div className="flex flex-col">
        <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
        <p className="text-xs font-medium dark:text-white/40">
          <a href={username} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </div>
    </div>
    <blockquote className="mt-2 text-sm">{body}</blockquote>
  </figure>
);

const MasonryDemo = ({ reviews }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {reviews.map((review) => (
        <ReviewCard key={review.username} {...review} />
      ))}
    </Masonry>
  );
};

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await databases.listDocuments(
          '678786150014627a96fa',
          '67878633000e5e9e8bb4'
        );
        const fetchedReviews = response.documents.map((doc) => ({
          name: doc.name,
          username: doc.linkedin,
          body: doc.review,
          img: `https://avatar.vercel.sh/${doc.name.toLowerCase()}`,
        }));
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <section className="relative flex items-center justify-center h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700">
        <div className="text-center z-10 px-4 sm:px-8 md:px-16">
          <motion.h1
            className="text-3xl text-slate-200 sm:text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to Full Stack Engg. <br /> Batch 1 Reviews
          </motion.h1>
          <motion.p
            className="text-lg text-slate-200 sm:text-xl md:text-2xl mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Find honest Full Stack Engineering Batch 1 reviews from students.
          </motion.p>
          <motion.button
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <a href="#reviews">Scroll Down</a>
          </motion.button>
        </div>
      </section>

      <section id="reviews" className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Students Say</h2>
          {loading ? (
            <div className="text-center">
              <div className="loader mt-4"></div>
            </div>
          ) : (
            reviews.length > 0 ? (
              <MasonryDemo reviews={reviews} />
            ) : (
              <p className="text-center text-lg text-white">No reviews yet.</p>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
