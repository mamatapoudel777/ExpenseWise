import { ArrowLeft, X, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

// Validation Schema
const signUpSchema = z
  .object({
    firstname: z.string().min(2, 'First name must be at least 2 characters'),
    lastname: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
      .regex(/[0-9]/, 'Must contain at least 1 number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least 1 special character'),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: 'Passwords do not match',
    path: ['confirmpassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: SignUpFormData) => {
    setServerMessage(null);
    setIsError(false);

    try {
      const response = await axios.post(`${baseURL}/users/signup`, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
        }
        setServerMessage('Sign up successful! Redirecting...');
        setIsError(false);
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setIsError(true);
        setServerMessage(response.data.message || 'Sign up failed.');
      }
    } catch (error: any) {
      setIsError(true);
      setServerMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center p-2 justify-center min-h-screen bg-gray-300">
      <div className="bg-white shadow-2xl border border-gray-300 rounded-4xl w-full max-w-sm">
        {/* Header with Back Arrow, Title, and Close 'X' Button */}
        <div className="bg-white rounded-4xl px-6 pt-5 pb-6">
          <div className="flex items-center justify-between relative">
            <ArrowLeft 
              onClick={() => window.history.back()} 
              className="w-6 h-6 text-[#1E3A24] cursor-pointer hover:opacity-75 transition-opacity" 
            />
            <h2 className="text-3xl font-extrabold text-[#1E3A24]">Sign Up</h2>
            <X 
              onClick={() => window.location.href = '/'} 
              className="w-6 h-6 text-[#1E3A24] cursor-pointer hover:opacity-75 transition-opacity" 
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-[#00694B] p-8 rounded-4xl shadow-lg w-full">
          {/* First Name */}
          <div className="mb-3">
            <input
              {...register('firstname')}
              type="text"
              placeholder="First Name"
              className="w-full p-3 rounded-xl border bg-white border-gray-300 focus:outline-none"
            />
            {errors.firstname && <p className="text-red-300 text-xs mt-1">{errors.firstname.message}</p>}
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <input
              {...register('lastname')}
              type="text"
              placeholder="Last Name"
              className="w-full p-3 rounded-xl border bg-white border-gray-300 focus:outline-none"
            />
            {errors.lastname && <p className="text-red-300 text-xs mt-1">{errors.lastname.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white border border-gray-300 focus:outline-none"
            />
            {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password with Eye Toggle */}
          <div className="mb-3">
            <div className="relative flex items-center">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full p-3 pr-10 rounded-xl bg-white border border-gray-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password with Eye Toggle */}
          <div className="mb-4">
            <div className="relative flex items-center">
              <input
                {...register('confirmpassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full p-3 pr-10 rounded-xl bg-white border border-gray-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmpassword && <p className="text-red-300 text-xs mt-1">{errors.confirmpassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer hover:bg-gray-900 bg-black text-white p-3 rounded-xl font-semibold disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>

          {serverMessage && (
            <p className={`text-center mt-4 text-sm ${isError ? 'text-red-300' : 'text-green-300'}`}>
              {serverMessage}
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