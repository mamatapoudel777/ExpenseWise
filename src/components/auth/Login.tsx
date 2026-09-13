import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, X, CheckCircle, Eye, EyeOff } from "lucide-react";

import image1 from "../../assets/images (1).png";
import image2 from "../../assets/images.jpeg";
import image3 from "../../assets/images.png";

// Validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  // Autofill remembered email on load
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setValue("email", rememberedEmail);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    try {
      /* ADMIN LOGIN */
      if (data.email === "admin123@gmail.com" && data.password === "admin123@") {
        localStorage.setItem("userName", "Admin");
        localStorage.setItem("role", "admin");

        if (data.rememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        navigate("/admin/dashboard");
        return;
      }

      /* REGULAR USER LOGIN */
      const response = await axios.post(`${baseURL}/users/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        localStorage.setItem("userId", response.data.user.id);
        localStorage.setItem("userName", response.data.user.firstname);
        localStorage.setItem("role", "user");

        if (response.data.token) {
          localStorage.setItem("authToken", response.data.token);
        }

        if (data.rememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        navigate("/user/dashboard");
      } else {
        setServerError(response.data.message || "Invalid Email or Password");
      }
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="flex items-center p-2 justify-center min-h-screen bg-gray-300">
      <div className="bg-white shadow-2xl border border-gray-300 rounded-4xl w-full max-w-sm overflow-hidden">
        {/* Navigation Header */}
        <div className="bg-white px-6 pt-5 pb-3">
          <div className="flex items-center justify-between">
            <ArrowLeft
              onClick={() => navigate(-1)}
              className="w-6 h-6 text-[#1E3A24] cursor-pointer hover:opacity-75 transition-opacity"
            />
            <div className="text-xl font-bold">
              💰 Expense <span className="text-[#00B37E] text-2xl">Wise</span>
            </div>
            <X
              onClick={() => navigate("/")}
              className="w-6 h-6 text-[#1E3A24] cursor-pointer hover:opacity-75 transition-opacity"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-[#00694B] p-8 rounded-4xl shadow-lg w-full mt-2"
        >
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Log In
          </h1>

          {/* Backend Error Banner */}
          {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-xs text-center">
              {serverError}
            </div>
          )}

          {/* Email */}
          <div className="mb-3">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl border bg-white border-gray-300 text-black focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password with Visibility Toggle */}
          <div className="mb-3">
            <div className="relative flex items-center">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 pr-10 rounded-xl bg-white border border-gray-300 text-black focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm text-white mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                {...register("rememberMe")}
                type="checkbox"
                className="hidden peer"
              />
              <div className="w-5 h-5 rounded border-2 border-white flex items-center justify-center">
                {rememberMe && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <span>Remember me</span>
            </label>

            <Link to="/forgot-password" className="text-xs text-gray-300 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white p-3 rounded-xl font-bold cursor-pointer hover:bg-gray-900 transition disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>

          {/* Social Sign-In & Footer */}
          <div className="mt-4 space-y-3">
            <p className="text-center text-xs text-white">Or Sign in with</p>

            <div className="flex justify-center space-x-4">
              <img src={image1} alt="Provider 1" className="w-8 h-8 rounded-full bg-white object-cover cursor-pointer hover:opacity-90" />
              <img src={image2} alt="Provider 2" className="w-8 h-8 rounded-full bg-white object-cover cursor-pointer hover:opacity-90" />
              <img src={image3} alt="Provider 3" className="w-8 h-8 rounded-full bg-white object-cover cursor-pointer hover:opacity-90" />
            </div>

            <p className="text-center text-sm text-white pt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;