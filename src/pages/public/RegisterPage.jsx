import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import api from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await api.post('/api/clients/inscription', data);
      return res.data;
    },
    onSuccess: (data) => {
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Inscription réussie !');
        navigate('/');
      } else {
        toast.error('Réponse inattendue du serveur.');
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Erreur lors de l'inscription");
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-2 text-center">Inscription</h1>
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
          <label className="block font-semibold mb-1">Mot de passe</label>
          <input type="password" {...register('password', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded focus:outline-none" />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>
        <button type="submit" disabled={mutation.isLoading} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow mt-2">
          {mutation.isLoading ? 'Inscription...' : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage; 