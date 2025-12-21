import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

function SignUp() {
  // Form state
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

  // Message state for success/error feedback
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous message
    setMessage(null);
    setIsError(false);

    // Simple client-side password match check
    if (password !== confirmpassword) {
      setIsError(true);
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        firstname,
        lastname,
        email,
        password,
      });

      // Check backend response
      if (response.data.success) {
        setMessage("Sign up successful! Redirecting to login...");
        setIsError(false);
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000);
      } else {
        setIsError(true);
        setMessage(response.data.message || "Sign up failed.");
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center p-2 justify-center min-h-screen bg-gray-300">
      <div className="bg-white shadow-2xl border border-gray-300 rounded-4xl w-full max-w-sm">
        <div className="h-5 bg-white rounded-4xl px-6 pt-5 pb-10">
          <div className="flex items-center justify-start relative z-10">
            <ArrowLeft className="w-6 h-6 text-[#1E3A24] cursor-pointer absolute left-0" />
            <h2 className="text-3xl font-extrabold text-[#1E3A24] w-full text-center">Sign Up</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#00694B] p-8 rounded-4xl shadow-lg w-full mt-4">
          <input
            type="text"
            placeholder="First Name"
            required
            className="w-full mb-4 p-3 rounded-xl border bg-white border-gray-300"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            required
            className="w-full mb-4 p-3 rounded-xl border bg-white border-gray-300"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full mb-4 p-3 rounded-xl bg-white border border-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full mb-4 p-3 rounded-xl bg-white border border-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full mb-4 p-3 rounded-xl bg-white border border-gray-300"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full cursor-pointer hover:bg-gray-900 bg-black text-white p-3 rounded"
          >
            Sign Up
          </button>

          {/* Show success or error message */}
          {message && (
            <p className={`text-center mt-4 ${isError ? 'text-red-500' : 'text-green-400'}`}>
              {message}
            </p>
          )}

          <p className="text-center text-sm text-white pt-4">
            Already have an account? <a href="/signin" className="font-bold hover:underline">Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
