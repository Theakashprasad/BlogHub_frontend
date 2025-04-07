// components/NotFound.tsx
import  { useEffect } from "react";
import lottie from "lottie-web";

const NotFound = () => {
  useEffect(() => {
    const body = document.body;
    const interval = setInterval(createStar, 100);

    function createStar() {
      const right = Math.random() * 500;
      const top = Math.random() * window.innerHeight;
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${top}px`;
      body.appendChild(star);

      let currentRight = right;

      const move = setInterval(() => { 
        if (currentRight >= window.innerWidth) {
          star.remove();
          clearInterval(move);
        } else {
          currentRight += 3;
          star.style.right = `${currentRight}px`;
        }
      }, 10);
    }

    lottie.loadAnimation({
      container: document.getElementById("lottie")!,
      path: "/json/404.json",
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white text-center bg-gradient-to-t from-gray-900 to-gray-500 overflow-hidden">
      <style>{`
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #fff;
          right: 0;
          animation: starTwinkle 3s infinite linear;
        }

        @keyframes starTwinkle {
          0% { background: rgba(255, 255, 255, 0.4); }
          25% { background: rgba(255, 255, 255, 0.8); }
          50% { background: rgba(255, 255, 255, 1); }
          75% { background: rgba(255, 255, 255, 0.8); }
          100% { background: rgba(255, 255, 255, 0.4); }
        }
      `}</style>

      <div className="w-6/12 mx-auto animate-pulse" id="lottie"></div>
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-2xl">Oops! The page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="text-white font-bold hover:text-blue-500 mt-4 inline-block"
      >
        Back to Home
      </a>
    </div>
  );
};

export default NotFound;
