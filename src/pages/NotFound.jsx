import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [isBeating, setIsBeating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBeating((prevIsBeating) => !prevIsBeating);
    }, 500); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-screen bg-cust-white">
        <motion.div
          className={`text-6xl font-bold mb-8 flicker ${
            isBeating ? "beating" : ""
          }`}
          animate={{ scale: isBeating ? 1.5 : 1 }}
        >
          404
        </motion.div>
        <motion.div
          className="text-3xl mb-4 font-bold"
          animate={{
            scale: [1.0, 1.1, 1.0],
            x: [-5, 5, -5, 5, 0], // Shake along X-axis
            transition: { duration: 0.5, repeat: Infinity },
          }}
        >
          Uh-oh! You found a page that doesn't exist.
        </motion.div>
        <motion.div
          className="text-xl mb-8"
          animate={{
            y: [-5, 5, -5, 5, 0],
            transition: { duration: 0.5, repeat: Infinity },
          }}
        >
          It looks like you took a wrong turn. Don't worry, it happens to the
          best of us!
        </motion.div>
        <motion.div
          className="text-center mb-8"
          animate={{
            x: [
              -20, -10, 0, 10, 20, 20, 20, 20, 20, 10, 0, -10, -20, -20, -20,
              -20, -20,
            ],
            y: [
              -20, -20, -20, -20, -20, -10, 0, 10, 20, 20, 20, 20, 20, 10, 0,
              -10, -20,
            ],
            transition: { duration: 5, repeat: Infinity },
          }}
        >
          <img
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzU4bjl6bWd6em4ybDVzdjM0anY0MzhiNGkzOWUxOHF2cG81eGRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g01ZnwAUvutuK8GIQn/giphy.gif"
            alt="Confused Travolta"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
        <button
          className="rainbow-btn transition-all duration-300 hover:scale-125"
          type={"button"}
          onClick={() => navigate("/")}
        >
          Go back home before someone notices!
        </button>
      </div>
    </MainLayout>
  );
};

export default NotFound;
