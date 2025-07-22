import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/apiService';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const PAGE_SIZE = 10;

const SponsorForm = ({ initialData, onClose, onSuccess }) => {
  const isEdit = !!initialData;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: initialData || {},
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (isEdit) {
        return api.put(`/api/parrains/${initialData.id}`, formData);
      } else {
        return api.post('/api/parrains', formData);
      }
    },
    onSuccess: () => {
      toast.success(isEdit ? 'Parrain modifié !' : 'Parrain ajouté !');
      onSuccess();
      onClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Erreur lors de la sauvegarde');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg flex flex-col gap-4 relative">
        <button type="button" onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">×</button>
        <h2 className="text-xl font-bold mb-2">{isEdit ? 'Modifier' : 'Ajouter'} un parrain</h2>
        <div>
          <label className="block font-semibold mb-1">Nom</label>
          <input type="text" {...register('nom', { required: 'Ce champ est requis' })} className="w-full px-4 py-2 border rounded" />
          {errors.nom && <span className="text-red-500 text-xs">{errors.nom.message}</span>}
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input type="email" {...register('email')} className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Contact</label>
          <input type="text" {...register('contact')} className="w-full px-4 py-2 border rounded" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea {...register('description')} className="w-full px-4 py-2 border rounded" />
        </div>
        <button type="submit" disabled={isSubmitting || mutation.isLoading} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow mt-2">
          {isSubmitting || mutation.isLoading ? 'Enregistrement...' : (isEdit ? 'Modifier' : 'Ajouter')}
        </button>
      </form>
    </div>
  );
};

const ManageSponsors = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editSponsor, setEditSponsor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Liste parrains
  const { data, isLoading, isError } = useQuery({
    queryKey: ['parrains'],
    queryFn: async () => {
      const res = await api.get('/api/parrains');
      return res.data;
    },
  });

  // Suppression
  const deleteMutation = useMutation({
    mutationFn: async (id) => api.delete(`/api/parrains/${id}`),
    onSuccess: () => {
      toast.success('Parrain supprimé !');
      setDeleteId(null);
      queryClient.invalidateQueries(['parrains']);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Erreur lors de la suppression');
    },
  });

  // Pagination
  const parrains = Array.isArray(data) ? data : [];
  const totalPages = Math.ceil(parrains.length / PAGE_SIZE);
  const paginated = parrains.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-900">Gestion des parrains</h1>
        <button onClick={() => { setEditSponsor(null); setShowForm(true); }} className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow">Ajouter un parrain</button>
      </div>
      {/* Tableau parrains */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-8">Chargement...</td></tr>
            ) : isError ? (
              <tr><td colSpan={5} className="text-center text-red-500 py-8">Erreur lors du chargement.</td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={5} className="text-center text-gray-500 py-8">Aucun parrain trouvé.</td></tr>
            ) : paginated.map(sponsor => (
              <tr key={sponsor.id} className="border-b">
                <td className="px-4 py-2 font-semibold">{sponsor.nom}</td>
                <td className="px-4 py-2">{sponsor.email}</td>
                <td className="px-4 py-2">{sponsor.contact}</td>
                <td className="px-4 py-2">{sponsor.description}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button onClick={() => { setEditSponsor(sponsor); setShowForm(true); }} className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-3 py-1 rounded">Modifier</button>
                  <button onClick={() => setDeleteId(sponsor.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button key={num} onClick={() => setPage(num)} className={`px-3 py-1 rounded ${num === page ? 'bg-blue-700 text-white' : 'bg-gray-200'}`}>{num}</button>
          ))}
        </div>
      )}
      {/* Modale suppression */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
            <div className="text-lg font-bold mb-4">Confirmer la suppression ?</div>
            <div className="flex gap-4">
              <button onClick={() => deleteMutation.mutate(deleteId)} className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded">Oui, supprimer</button>
              <button onClick={() => setDeleteId(null)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-6 py-2 rounded">Annuler</button>
            </div>
          </div>
        </div>
      )}
      {/* Modale ajout/modif */}
      {showForm && (
        <SponsorForm
          initialData={editSponsor}
          onClose={() => setShowForm(false)}
          onSuccess={() => queryClient.invalidateQueries(['parrains'])}
        />
      )}
    </div>
  );
};

export default ManageSponsors; 