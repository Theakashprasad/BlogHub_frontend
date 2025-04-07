import React, { useState } from "react";
import { postSignup } from "../api/signupApi";
import Input from "../components/Input";
import Button from "../components/Button";
import "../App.css";
import { validateSignupForm } from "../utils/sigupValidation";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [generalError, setGeneralError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { errors, isValid, isAnyFieldEmpty } = validateSignupForm(
      username,
      email,
      password,
      confirmPassword
    );
    console.log("asd", username, email, password);
    setErrors(errors);
    if (isAnyFieldEmpty) {
      setGeneralError("All fields must be filled out.");
      return;
    } else {
      setGeneralError("");
    }
    if (isValid) {
      try {
        const response = await postSignup(username, email, password);

        if (response) {
          if (response.status === 201) {
            toast.success("Signup completed. Login again to continue");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else if (response.status === 200) {
            toast.error("User already exists with this email");
          }
        } else {
          toast.error("An unexpected error occurred");
        }
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center font-sans"
      style={{
        backgroundImage:
          "url('https://pomodo.s3.eu-north-1.amazonaws.com/blog-signup.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 w-1/2 flex flex-col justify-center items-center text-white px-12">
        {/* <h1 className="text-5xl font-bold mb-6">Welcome to Our Platform</h1> */}
        <h1 className="text-5xl font-bold mb-6">BloggerHub</h1>
        <p className="text-xl mb-8">
          Join our community and experience the best of what we have to offer.
          Sign up today to get started on your journey with us.
        </p>
        {/* <ul className="list-disc list-inside text-lg">
          <li>Access exclusive content</li>
          <li>Connect with like-minded individuals</li>
          <li>Stay updated with the latest trends</li>
          <li>Enjoy a seamless user experience</li>
        </ul> */}
      </div>
      <div className="relative z-10 w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md p-8 rounded-lg backdrop-blur-md bg-white bg-opacity-20">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Sign Up
          </h2>
          {generalError && (
            <p className="text-red-500 mb-4 text-center">{generalError}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                type="text"
                value={username}
                placeholder="Enter your username"
                className="w-full px-4 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <Input
                type="email"
                value={email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            {/* password */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 pr-10 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5-10-5s1.928-2.701 5.162-4.373m6.713 8.198a9.995 9.995 0 01-4.43 1.005c-5.523 0-10-5-10-5s1.928-2.701 5.162-4.373m1.258-1.158a4 4 0 115.656 5.656m-5.656-5.656L3 3m18 18l-3.25-3.25"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            {/* confirm password */}
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="Enter your password"
                className="w-full px-4 py-2 pr-10 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-5-10-5s1.928-2.701 5.162-4.373m6.713 8.198a9.995 9.995 0 01-4.43 1.005c-5.523 0-10-5-10-5s1.928-2.701 5.162-4.373m1.258-1.158a4 4 0 115.656 5.656m-5.656-5.656L3 3m18 18l-3.25-3.25"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={false}
              className="w-full py-2 px-4 bg-[#7B5C4C] hover:bg-white hover:text-[#7B5C4C] rounded-lg text-white font-semibold transition duration-300"
            >
              Sign Up
            </Button>
            <div>
              <p className="text-white">
                Already Have An Account ? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default SignupPage;
