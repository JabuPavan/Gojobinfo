import React, { useState } from 'react';
import { Search, ShoppingCart, Star, ChevronLeft, ChevronRight, Plus, CheckSquare, Square } from 'lucide-react';

const CATEGORIES = [
  "Fruits & Vegetables", "Fresh Vegetables", "Fresh Fruits", 
  "Premium Fruits", "Herbs & Seasonings", "Graduate (2)", 
  "Exotic Fruits & Vegetables", "Team Size", "Detergents", 
  "Dishwash", "All Purpose Cleaners", "Fresheners & Repellents", 
  "Shoe Care", "Home Appliances", "Pet Supplies"
];

const PRODUCTS = [
  { id: 1, name: "Tuna fish", price: 450, img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "T -shirts", price: 499, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Sam f 16", price: 198, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Sam f 34", price: 98, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "ABSTRACT PRINT HOODIE", price: 4350, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "TECHNICAL TRAINERS", price: 5950, img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=400&q=80" },
  { id: 7, name: "SKATE TRAINERS", price: 1850, img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=400&q=80" },
  { id: 8, name: "Long Selfie Stick with Tripod Stand", price: 750, img: "https://images.unsplash.com/photo-1587393845941-610123514dc2?auto=format&fit=crop&w=400&q=80" },
  { id: 9, name: "Glass", price: 3000, img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80" },
  { id: 10, name: "Glass", price: 950, img: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80" },
  { id: 11, name: "Apple", price: 160, img: "https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&w=400&q=80" },
  { id: 12, name: "T-shirt", price: 300, img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: 13, name: "Aquaguard Sure Delight", price: 1200, img: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=400&q=80" }
];

export const Shopping: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<{id: number, qty: number}[]>([]);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);

  const handleAddToCart = (id: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const toggleCategory = (cat: string) => {
    setSelectedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        
        {/* Large Sponsored Banner inside container */}
        <div className="bg-black text-white p-8 sm:p-12 mb-8 flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="flex-1">
            <span className="bg-white text-black px-3 py-1 text-xs font-extrabold uppercase tracking-widest inline-block mb-4">
              Sponsored
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none mb-4">
              Mega Summer Sale
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed">
              Flat 50% Off on Selected Technical Trainers, Hoodies, and Fresh Produce! Limited time offer.
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <button className="bg-white text-black hover:bg-slate-200 font-extrabold px-8 py-4 uppercase tracking-widest text-sm transition-colors">
              Shop Now
            </button>
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Categories Filters */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="bg-white border border-slate-200 rounded-none p-6 sticky top-24">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest border-b-2 border-black pb-3 mb-4 flex justify-between items-center">
                Specialism
                {selectedCats.length > 0 && (
                  <span className="text-[10px] bg-black text-white px-2 py-0.5">{selectedCats.length}</span>
                )}
              </h2>
              <div className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {CATEGORIES.map((cat, idx) => {
                  const isChecked = selectedCats.includes(cat);
                  return (
                    <label 
                      key={idx} 
                      className="flex items-center gap-3 text-sm text-slate-700 hover:text-black hover:bg-slate-50 px-3 py-2.5 transition-colors font-medium cursor-pointer select-none border border-transparent hover:border-slate-100"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-black shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300 shrink-0" />
                      )}
                      <span className="truncate">{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Column: Products */}
          <div className="lg:col-span-6 xl:col-span-7">
            
            {/* Search Bar */}
            <div className="bg-white border-2 border-black p-1 sm:p-2 flex items-center mb-6 sm:mb-8 rounded-none shadow-sm">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-black mx-2 sm:mx-4 shrink-0" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm sm:text-base py-2 sm:py-3 font-medium placeholder-slate-400 min-w-[100px]"
              />
              <button className="bg-black text-white px-4 sm:px-8 py-2.5 sm:py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-none hover:bg-slate-800 transition-colors shrink-0">
                Search
              </button>
            </div>

            {/* Mobile Categories Dropdown */}
            <div className="lg:hidden mb-6 bg-white border border-slate-200 p-4 rounded-none">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Filter by Specialism</label>
              <select className="w-full bg-slate-50 border border-slate-200 text-sm p-3 focus:outline-none focus:border-black font-bold">
                <option value="">All Categories</option>
                {CATEGORIES.map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Header for grid */}
            <div className="flex justify-between items-end mb-6 border-b border-slate-200 pb-3">
              <h1 className="text-2xl font-extrabold text-slate-900">All Products</h1>
              <span className="text-sm text-slate-500 font-bold">{PRODUCTS.length} items found</span>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {/* Injecting an inline AD banner as the first or second item */}
              <div className="border border-slate-200 rounded-none flex flex-col justify-center items-center text-center shadow-lg group relative overflow-hidden h-full min-h-[300px]">
                {/* Background T-Shirt Image */}
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80" 
                  alt="Advertisement T-Shirt" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-500"></div>
                
                {/* Ad Content */}
                <div className="relative z-10 p-6 flex flex-col items-center">
                  <span className="text-[10px] border border-white/50 text-white px-2 py-1 uppercase tracking-widest font-bold mb-4 bg-black/20 backdrop-blur-sm">Advertisement</span>
                  <h3 className="text-xl font-black uppercase leading-tight mb-2 text-white text-shadow-sm">Premium Graphic T-Shirts</h3>
                  <p className="text-sm text-slate-200 mb-6 font-medium max-w-[200px] text-shadow-sm">Upgrade your wardrobe today with our new arrivals.</p>
                  <button className="bg-white text-black font-extrabold text-xs uppercase px-6 py-2.5 hover:bg-slate-200 transition-colors">Shop Collection</button>
                </div>
              </div>

              {PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((product) => (
                <div key={product.id} className="bg-white border border-slate-200 rounded-none group hover:border-black hover:shadow-lg transition-all flex flex-col overflow-hidden">
                  
                  {/* Image Placeholder */}
                  <div className="w-full aspect-square bg-slate-100 relative overflow-hidden border-b border-slate-100 shrink-0">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-none shadow-sm">
                      Sale
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-black fill-black" />
                        <span className="text-xs font-bold text-slate-700">4.5</span>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-extrabold text-slate-900 leading-snug mb-3 sm:mb-4 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-100 flex flex-wrap gap-2 items-center justify-between">
                      <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                        ₹{product.price}
                      </div>
                      
                      <button 
                        onClick={() => handleAddToCart(product.id)}
                        className="flex items-center justify-center gap-1 bg-black text-white hover:bg-slate-800 transition-colors font-bold text-xs uppercase tracking-wider px-3 py-2 sm:px-4 sm:py-2.5 rounded-none shrink-0 w-full sm:w-auto mt-2 sm:mt-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center items-center gap-4 mt-16 border-t border-slate-200 pt-8">
              <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-black uppercase tracking-wider px-4 py-2 border border-transparent hover:border-slate-200 transition-colors rounded-none">
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <div className="flex gap-2">
                <span className="w-10 h-10 flex items-center justify-center bg-black text-white font-bold text-sm rounded-none shadow-md">1</span>
                <span className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:border-black cursor-pointer font-bold text-sm rounded-none transition-colors">2</span>
                <span className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:border-black cursor-pointer font-bold text-sm rounded-none transition-colors">3</span>
              </div>
              <button className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-black uppercase tracking-wider px-4 py-2 border border-transparent hover:border-slate-200 transition-colors rounded-none">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Sidebar: Cart */}
          <div className="lg:col-span-3 xl:col-span-2 hidden lg:block">
            <div className="bg-white border border-slate-200 rounded-none p-6 sticky top-24 shadow-sm">
              <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
                <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <ShoppingCart className="w-4.5 h-4.5" />
                  Your Cart
                </h2>
                {cartTotalItems > 0 && (
                  <span className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-none shadow-sm">
                    {cartTotalItems} ITEMS
                  </span>
                )}
              </div>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                    <ShoppingCart className="w-6 h-6 text-slate-300" />
                  </div>
                  <p className="text-sm font-bold text-slate-500">Your cart is empty</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">Add items from the catalog to see them here.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
                    {cartItems.map((cartItem) => {
                      const product = PRODUCTS.find(p => p.id === cartItem.id);
                      if (!product) return null;
                      return (
                        <div key={cartItem.id} className="flex gap-3 border-b border-slate-100 pb-4">
                          <img src={product.img} alt={product.name} className="w-12 h-12 object-cover border border-slate-200" />
                          <div className="flex-1">
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">{product.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Qty: {cartItem.qty}</p>
                              <span className="text-xs font-black text-slate-900">₹{product.price * cartItem.qty}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-6 bg-slate-50 p-4 border border-slate-100">
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Total of Sale</span>
                      <span className="text-xl font-black text-black">
                        ₹{cartItems.reduce((acc, curr) => {
                          const p = PRODUCTS.find(x => x.id === curr.id);
                          return acc + (p ? p.price * curr.qty : 0);
                        }, 0)}
                      </span>
                    </div>
                    <button className="w-full bg-black hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest py-4 rounded-none transition-colors shadow-md">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shopping;
