import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/apiService';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const SettingsPage = () => {
  const queryClient = useQueryClient();
  // Paramètres actuels
  const { data: params, isLoading, isError } = useQuery({
    queryKey: ['parametres-commission'],
    queryFn: async () => {
      const res = await api.get('/api/parametres-commission/actuels');
      return res.data;
    },
  });
  // Historique
  const { data: historique, isLoading: loadingHist, isError: errorHist } = useQuery({
    queryKey: ['parametres-commission-historique'],
    queryFn: async () => {
      const res = await api.get('/api/parametres-commission/historique');
      return res.data;
    },
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    values: params || {},
  });

  // Mutation
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return api.put('/api/parametres-commission/modifier', formData);
    },
    onSuccess: () => {
      toast.success('Paramètres mis à jour !');
      queryClient.invalidateQueries(['parametres-commission']);
      queryClient.invalidateQueries(['parametres-commission-historique']);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Erreur lors de la modification');
    },
  });

  // Remplir le formulaire quand params change
  React.useEffect(() => {
    if (params) reset(params);
  }, [params, reset]);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 flex flex-col gap-12">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">Paramètres de commission</h1>
      {/* Formulaire */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <div>
          <label className="block font-semibold mb-1">Pourcentage de commission (%)</label>
          <input type="number" step="0.01" min={0} max={100} {...register('pourcentageCommission', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded" />
          {errors.pourcentageCommission && <span className="text-red-500 text-xs">{errors.pourcentageCommission.message}</span>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Pourcentage de réduction (%)</label>
          <input type="number" step="0.01" min={0} max={100} {...register('pourcentageReduction', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded" />
          {errors.pourcentageReduction && <span className="text-red-500 text-xs">{errors.pourcentageReduction.message}</span>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Prix du soutien (FCFA)</label>
          <input type="number" min={0} {...register('prixSoutien', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded" />
          {errors.prixSoutien && <span className="text-red-500 text-xs">{errors.prixSoutien.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting || mutation.isLoading} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow mt-2">
          {isSubmitting || mutation.isLoading ? 'Enregistrement...' : 'Mettre à jour'}
        </button>
      </form>
      {/* Historique */}
      <div>
        <h2 className="text-lg font-bold mb-2 text-blue-900">Historique des modifications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Commission (%)</th>
                <th className="px-4 py-2">Réduction (%)</th>
                <th className="px-4 py-2">Prix soutien (FCFA)</th>
              </tr>
            </thead>
            <tbody>
              {loadingHist ? (
                <tr><td colSpan={4} className="text-center py-8">Chargement...</td></tr>
              ) : errorHist ? (
                <tr><td colSpan={4} className="text-center text-red-500 py-8">Erreur lors du chargement.</td></tr>
              ) : Array.isArray(historique) && historique.length > 0 ? (
                historique.map((h, idx) => (
                  <tr key={h.id || idx} className="border-b">
                    <td className="px-4 py-2">{h.dateModification ? h.dateModification.split('T')[0] : '-'}</td>
                    <td className="px-4 py-2">{h.pourcentageCommission}</td>
                    <td className="px-4 py-2">{h.pourcentageReduction}</td>
                    <td className="px-4 py-2">{h.prixSoutien}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="text-center text-gray-500 py-8">Aucune modification trouvée.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 