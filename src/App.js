import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllPosts from "./components/AllPosts.js";
import OnePost from "./components/OnePost.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AllPosts />} path="/" exact />
        <Route element={<OnePost />} path="/:slug" />
      </Routes>
    </Router>
  );
}

export default App;
