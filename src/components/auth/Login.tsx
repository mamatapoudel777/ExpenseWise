import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import image1 from '../../assets/images (1).png';
import image2 from '../../assets/images.jpeg';
import image3 from '../../assets/images.png';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (response.data.success) {
        
        localStorage.setItem('userName', response.data.user.firstname);
        
        navigate('/dashboard');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Invalid Email or Password";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center p-2 justify-center min-h-screen bg-gray-300">
      <div className="bg-white shadow-2xl border border-gray-300 rounded-4xl w-full max-w-sm">
        <a href="#" className="flex items-center p-4 w-60 h-auto mx-auto">
            <div className="text-2xl font-bold">💰 Expense <span className='text-[#00B37E] text-3xl'>Wise</span></div>
        </a>

        <form onSubmit={handleLogin} className="bg-[#00694B] p-8 rounded-4xl shadow-lg w-full mt-4">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">Log In</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-xs text-center">
              {error}
            </div>
          )}

          <input 
            type="email" 
            placeholder="Email" 
            required
            className="w-full mb-4 p-3 rounded border bg-white border-gray-300 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            className="w-full mb-4 p-3 rounded bg-white border border-gray-300 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="flex justify-between items-center text-md text-white pt-1 mb-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="hidden peer" />
              <div className="w-6 h-6 rounded border-2 border-white flex items-center justify-center hover:bg-white/20">
                <CheckCircle className="w-3 h-3 text-white fill-current hidden peer-checked:block" />
              </div>
              <span className="text-sm">Remember me</span>
            </label>
            <a href="#" className="text-xs text-gray-300 hover:underline">Forgot password?</a>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full cursor-pointer hover:bg-gray-900 bg-black text-white p-3 rounded font-bold transition-colors ${loading ? 'opacity-50' : ''}`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          
          <div className="mt-4 space-y-3">
            <p className="text-center text-xs text-white">Or Sign in with</p>
            <div className="flex justify-center space-x-4">
              <img src={image1} alt="social1" className='w-8 h-8 rounded-full bg-white cursor-pointer'/>
              <img src={image2} alt="social2" className='w-8 h-8 rounded-full bg-white cursor-pointer'/>
              <img src={image3} alt="social3" className='w-8 h-8 rounded-full bg-white cursor-pointer'/>
            </div>
            <p className="text-center text-sm text-white pt-4">
              Don't have an account? <Link to="/signup" className="font-bold hover:underline">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;