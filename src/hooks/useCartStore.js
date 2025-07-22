import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  parrainage: '',
  soutien: 0,
  addToCart: (product) => set((state) => {
    // Unicité par id produit
    if (state.items.find((item) => item.id === product.id)) return state;
    return { items: [...state.items, { ...product, quantity: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  resetCart: () => set({ items: [], parrainage: '', soutien: 0 }),
  setParrainage: (code) => set({ parrainage: code }),
  setSoutien: (montant) => set({ soutien: montant }),
  setQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) => item.id === id ? { ...item, quantity } : item)
  })),
  getTotal: () => get().items.reduce((sum, item) => sum + (item.prix || item.prixActuel || 0) * (item.quantity || 1), 0),
}));

export default useCartStore; 