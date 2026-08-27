import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      localStorage.setItem('token', response.data.token);
      alert("Login Success! Role: " + response.data.role);
    } catch (error) {
      alert("Login Failed: " + error.response?.data);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <span style={{color: 'red'}}>{errors.email.message}</span>}
        
        <input type="password" {...register("password")} placeholder="Password" />
        {errors.password && <span style={{color: 'red'}}>{errors.password.message}</span>}
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
}