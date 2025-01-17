import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import AddReview from './AddReview';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        {/* <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between">
            <Link to="/" className="text-lg font-bold">Course Reviews</Link>
            <div>
              <Link to="/" className="mr-4">Home</Link>
              <Link to="/add-review" className="text-indigo-400">Add Review</Link>
            </div>
          </div>
        </nav> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-review" element={<AddReview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
