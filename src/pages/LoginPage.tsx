import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../api/loginApi";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateLoginForm } from "../utils/loginValidation";
import { Toaster, toast } from "sonner";
import useUserStore from "../store/userStore";

const LoginPage = () => {
  const { setUser } = useUserStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [generalError, setGeneralError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { errors, isValid, isAnyFieldEmpty } = validateLoginForm(
      email,
      password
    );
    setErrors(errors);

    if (isAnyFieldEmpty) {
      setGeneralError("All fields must be filled out.");
      toast.error("All fields must be filled out.");
      return;
    } else {
      setGeneralError("");
    }

    if (isValid) {
      try {
        const result = await postLogin(email, password);
        if ("error" in result) {
          switch (result.status) {
            case 404:
              toast.error("User not found with this email");
              break;
            case 401:
              toast.error("Password does not match");
              break;
            default:
              toast.error(result.message);
          }
          return;
        }
        if (result.data.accessToken) {
          localStorage.setItem("token", result.data.accessToken);

          setUser({
            id: result.data.existingUser._id,
            username: result.data.existingUser.username,
            email: result.data.existingUser.email,
            image: result.data.existingUser.image || null,
          });

          toast.success("Login successful");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center font-sans"
      style={{
        backgroundImage:
          "url('https://pomodo.s3.eu-north-1.amazonaws.com/blog.png')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-full max-w-md p-8 rounded-lg backdrop-blur-md bg-white bg-opacity-20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>
        {generalError && (
          <p className="text-red-500 mb-4 text-center">{generalError}</p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
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

          <Button
            type="submit"
            disabled={false}
            className="w-full py-2 px-4 bg-[#7B5C4C] hover:bg-white hover:text-[#7B5C4C] rounded-lg text-white font-semibold transition duration-300"
          >
            Login
          </Button>
          <div>
            <p className="text-white">
              New User ?{" "}
              <Link to="/signup" className="">
                Singup
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default LoginPage;
