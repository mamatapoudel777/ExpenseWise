import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import image1 from "../../assets/images (1).png";
import image2 from "../../assets/images.jpeg";
import image3 from "../../assets/images.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* 🔁 Load remembered email */
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      /* 🔐 HARD-CODED ADMIN LOGIN */
      if (email === "admin123@gmail.com" && password === "admin123@") {
        localStorage.setItem("userName", "Admin");
        localStorage.setItem("role", "admin");

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        navigate("/admin/dashboard");
        return;
      }

      /* 👤 NORMAL USER LOGIN */
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("userName", response.data.user.firstname);
        localStorage.setItem("role", "user");

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        navigate("/user/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center p-2 justify-center min-h-screen bg-gray-300">
      <div className="bg-white shadow-2xl border border-gray-300 rounded-4xl w-full max-w-sm">

        <div className="flex items-center justify-center p-4 mt-5">
          <div className="text-2xl font-bold">
            💰 Expense <span className="text-[#00B37E] text-3xl">Wise</span>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-[#00694B] p-8 rounded-4xl shadow-lg w-full mt-4"
        >
          <h1 className="text-3xl font-bold text-white mb-4 text-center">
            Log In
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-xs text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full mb-4 p-3 rounded border bg-white border-gray-300 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password with Eye Icon */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 rounded bg-white border border-gray-300 text-black pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex justify-between items-center text-sm text-white mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="hidden peer"
              />
              <div className="w-5 h-5 rounded border-2 border-white flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white hidden peer-checked:block" />
              </div>
              <span>Remember me</span>
            </label>

            <a href="#" className="text-xs text-gray-300 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white p-3 rounded font-bold transition ${
              loading ? "opacity-50" : "hover:bg-gray-900"
            }`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="mt-4 space-y-3">
            <p className="text-center text-xs text-white">Or Sign in with</p>

            <div className="flex justify-center space-x-4">
              <img src={image1} className="w-8 h-8 rounded-full bg-white" />
              <img src={image2} className="w-8 h-8 rounded-full bg-white" />
              <img src={image3} className="w-8 h-8 rounded-full bg-white" />
            </div>

            <p className="text-center text-sm text-white pt-4">
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
