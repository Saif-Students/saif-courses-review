import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-marquee-slider';
import 'magic.css/dist/magic.min.css';
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Your Appwrite Endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your Appwrite Project ID

const databases = new Databases(client);

const ReviewCard = ({ img, name, username, body }) => (
  <figure className="relative w-64 cursor-pointer m-3 overflow-hidden rounded-xl border p-4 border-gray-800 bg-gray-900 hover:bg-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
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

const MarqueeDemo = ({ reviews }) => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="relative flex flex-col items-center justify-center border-none overflow-hidden rounded-lg border">
      <Marquee direction="rtl" velocity={15} pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee direction="ltr" velocity={15} reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee direction="rtl" velocity={15} pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee direction="ltr" velocity={15} reverse pauseOnHover className="[--duration:20s] ">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3"></div>
    </div>
  );
};

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reviews from Appwrite database
    const fetchReviews = async () => {
      try {
        const response = await databases.listDocuments(
          '678786150014627a96fa', // Replace with your Database ID
          '67878633000e5e9e8bb4' // Replace with your Collection ID
        );
        const fetchedReviews = response.documents.map((doc) => ({
          name: doc.name,
          username: doc.linkedin, // Assuming the LinkedIn URL is used as username
          body: doc.review,
          img: `https://avatar.vercel.sh/${doc.name.toLowerCase()}`, // You can replace this with a proper image URL
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
    <div className="bg-slate-900 min-h-screen text-white ">
      {/* Hero Section */}
   

<section className="relative flex items-center justify-center h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700">
  <div className="text-center z-10 magic hover:magic-wand px-4 sm:px-8 md:px-16">
    <motion.h1
      className="text-3xl text-slate-200 sm:text-4xl md:text-5xl font-bold mb-4 leading-tight sm:leading-[60px] md:leading-[70px] magic-hover magic-hover__color"
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
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition magic-hover magic-hover__up"
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <a href="#reviews">Scroll Down</a>
    </motion.button>
  </div>
</section>



      {/* Marquee Section */}
      <section id="reviews" className="py-12 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Students Say</h2>
          {loading ? (
            <div className="text-center">
         
              <div className="loader mt-4"></div> {/* Add your loading spinner here */}
            </div>
          ) : (
            reviews.length > 0 ? (
              <MarqueeDemo reviews={reviews} />
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
