import { useQuery, useMutation } from '@tanstack/react-query';
import api from '../../../services/apiService';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Profile = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/api/clients/profile');
      return res.data;
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    values: data || {},
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await api.put('/api/clients/profile', formData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Profil mis à jour !');
      refetch();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Erreur lors de la mise à jour');
    },
  });

  if (isLoading) return <div className="text-center py-10">Chargement...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Erreur lors du chargement du profil.</div>;

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Mon profil</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <div>
          <label className="block font-semibold mb-1">Nom</label>
          <input type="text" {...register('nom', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded focus:outline-none" />
          {errors.nom && <span className="text-red-500 text-xs">{errors.nom.message}</span>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input type="email" {...register('email', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded focus:outline-none" />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Numéro</label>
          <input type="text" {...register('numero', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded focus:outline-none" />
          {errors.numero && <span className="text-red-500 text-xs">{errors.numero.message}</span>}
        </div>
        <button type="submit" disabled={mutation.isLoading} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow mt-2">
          {mutation.isLoading ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  );
};

export default Profile; 