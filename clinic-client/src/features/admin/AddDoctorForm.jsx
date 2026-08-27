import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDoctor } from '../../services/api';

// Zod Validation Schema
const doctorSchema = z.object({
  userId: z.coerce.number().min(1, 'කරුණාකර නිවැරදි User ID එකක් ඇතුළත් කරන්න'),
  specialization: z.string().min(2, 'විශේෂඥතාවය ඇතුළත් කිරීම අනිවාර්යයි'),
  fee: z.coerce.number().min(0, 'ගාස්තුව 0 ට වඩා වැඩි විය යුතුය'),
});

export default function AddDoctorForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(doctorSchema),
  });

  // TanStack Query Mutation
  const mutation = useMutation({
    mutationFn: createDoctor,
    onSuccess: () => {
      alert('වෛද්‍යවරයා පද්ධතියට සාර්ථකව ඇතුළත් කරන ලදී!');
      reset();
      queryClient.invalidateQueries({ queryKey: ['doctors'] });
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'වෛද්‍යවරයා ඇතුළත් කිරීම අසාර්ථක විය.');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>අලුත් වෛද්‍යවරයෙක් ඇතුළත් කිරීම (Admin)</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* User ID Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>User ID:</label>
          <input
            type="number"
            {...register('userId')}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.userId && <p style={{ color: 'red', fontSize: '12px' }}>{errors.userId.message}</p>}
        </div>

        {/* Specialization Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Specialization (විශේෂඥතාවය):</label>
          <input
            type="text"
            placeholder="උදා: Cardiologist"
            {...register('specialization')}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.specialization && <p style={{ color: 'red', fontSize: '12px' }}>{errors.specialization.message}</p>}
        </div>

        {/* Fee Field */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Fee (ගාස්තුව):</label>
          <input
            type="number"
            step="0.01"
            placeholder="2500.00"
            {...register('fee')}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.fee && <p style={{ color: 'red', fontSize: '12px' }}>{errors.fee.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={mutation.isPending}
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {mutation.isPending ? 'ඇතුළත් කරමින් පවතී...' : 'වෛද්‍යවරයා එකතු කරන්න'}
        </button>
      </form>
    </div>
  );
}