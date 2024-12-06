import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api';
import { END_POINT } from '../../api/UrlProvider';
import { LocalStorage } from '../../utils/localStorage';
import { toast } from 'react-toastify';

const SigninWithPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await API.postAuthAPI(
        formData,
        END_POINT.LOGIN,
        "",
        navigate
      );
      console.log({response});
      
      if (response.data) {
        // Store token and user data
        // LocalStorage.setStringData('token', response.data.token);
        // LocalStorage.setStringData('user', JSON.stringify(response.data.user));
        
        toast.success('Login successful!');
        navigate('/'); // Redirect to dashboard
      } else if (response.error) {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          required
        />
      </div>

      <div>
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          required
        />
      </div>

      <div className="mt-5">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
};

export default SigninWithPassword;