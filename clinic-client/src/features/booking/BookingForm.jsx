import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../../services/api';

// Validation Schema using Zod
const bookingSchema = z.object({
  doctorId: z.string().min(1, 'කරුණාකර වෛද්‍යවරයෙකු තෝරන්න'),
  appointmentDate: z.string().min(1, 'කරුණාකර දිනයක් සහ වේලාවක් තෝරන්න'),
});

// GET /api/doctors - වෛද්‍යවරුන් ලැයිස්තුව ලබා ගැනීම
const fetchDoctors = async () => {
  const response = await api.get('/doctors');
  return response.data;
};

// POST /api/appointments - වෙන්කිරීම සිදු කිරීම
const createAppointment = async (bookingData) => {
  const response = await api.post('/appointments', {
    doctorId: parseInt(bookingData.doctorId),
    appointmentDate: new Date(bookingData.appointmentDate).toISOString(),
  });
  return response.data;
};

export default function BookingForm() {
  // TanStack Query: వෛද්‍යවරුන් Fetch කිරීම
  const { data: doctors, isLoading, isError } = useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
  });

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  // TanStack Mutation: Booking Submit කිරීම
  const bookingMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: (data) => {
      alert('වෙන්කිරීම සාර්ථකයි!');
      reset();
    },
    onError: (error) => {
      alert(error.response?.data || 'වෙන්කිරීම අසාර්ථකයි!');
    },
  });

  const onSubmit = (data) => {
    bookingMutation.mutate(data);
  };

  if (isLoading) return <p>වෛද්‍යවරුන්ගේ ලැයිස්තුව ලෝඩ් වෙමින් පවතී...</p>;
  if (isError) return <p>දත්ත ලබාගැනීමට අපොහොසත් විය.</p>;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>සායන වෙන්කරගැනීම (Book Appointment)</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Doctor Selection Dropdown */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>වෛද්‍යවරයා තෝරන්න:</label>
          <select {...register('doctorId')} style={{ width: '100%', padding: '8px' }}>
            <option value="">-- වෛද්‍යවරයෙකු තෝරන්න --</option>
            {doctors?.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name || `Doctor ID: ${doctor.id}`} - {doctor.specialization} (ගාස්තුව: LKR {doctor.fee})
              </option>
            ))}
          </select>
          {errors.doctorId && <span style={{ color: 'red' }}>{errors.doctorId.message}</span>}
        </div>

        {/* Date and Time Picker */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>දිනය සහ වේලාව:</label>
          <input
            type="datetime-local"
            {...register('appointmentDate')}
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.appointmentDate && <span style={{ color: 'red' }}>{errors.appointmentDate.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={bookingMutation.isPending}
          style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          {bookingMutation.isPending ? 'වෙන්කරමින් පවතී...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
}