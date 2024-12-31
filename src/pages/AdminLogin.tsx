import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { validateAdminCredentials } from '../utils/auth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export function AdminLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  });
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const isValid = validateAdminCredentials(formData.username, formData.password);

    if (isValid) {
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials');
      toast.error('Invalid username or password');
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif font-bold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              id="username"
              name="username"
              type="text"
              required
              label="Username"
              value={formData.username}
              onChange={handleChange}
              error={error}
              autoComplete="username"
            />
            <Input
              id="password"
              name="password"
              type="password"
              required
              label="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}