import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';

const infos = [
  {
    icon: <MapPin className="w-8 h-8 text-blue-700 mb-2" />, title: 'Lieu', text: '23BP 116 Cotonou-Bénin'
  },
  {
    icon: <Phone className="w-8 h-8 text-blue-700 mb-2" />, title: 'Numéro de Téléphone', text: '(+229) 70 41 39 42 / 90 76 16 22'
  },
  {
    icon: <Mail className="w-8 h-8 text-blue-700 mb-2" />, title: 'Email', text: 'info@monopolity.store'
  },
  {
    icon: <Globe className="w-8 h-8 text-blue-700 mb-2" />, title: 'Site Web', text: 'https://monopolity.store'
  },
];

const ContactPage = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

  const onSubmit = (data) => {
    // Ici tu pourrais envoyer les données à une API ou afficher une notification
    alert('Message envoyé !');
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 flex flex-col gap-12">
      {/* Blocs d'infos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {infos.map((info, idx) => (
          <div key={idx} className="flex flex-col items-center bg-blue-50 rounded-lg p-6 shadow text-center">
            {info.icon}
            <div className="font-bold text-blue-900 mb-1">{info.title}</div>
            <div className="text-gray-700 text-sm break-words">{info.text}</div>
          </div>
        ))}
      </div>
      {/* Formulaire de contact */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Sujet</label>
            <input type="text" {...register('sujet', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded focus:outline-none" />
            {errors.sujet && <span className="text-red-500 text-xs">{errors.sujet.message}</span>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Numéro</label>
            <input type="text" {...register('numero', { required: 'Ce champ est requis' })} className="w-full px-4 py-3 border rounded focus:outline-none" />
            {errors.numero && <span className="text-red-500 text-xs">{errors.numero.message}</span>}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Message</label>
          <textarea {...register('message', { required: 'Ce champ est requis' })} rows={6} className="w-full px-4 py-3 border rounded focus:outline-none resize-none" />
          {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
        </div>
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded shadow self-end">Envoyer</button>
        {isSubmitSuccessful && <div className="text-green-600 font-semibold text-sm mt-2">Votre message a bien été envoyé !</div>}
      </form>
    </div>
  );
};

export default ContactPage; 