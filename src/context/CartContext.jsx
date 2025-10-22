import { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [limiteAlcanzado, setlimiteAlcanzado] = useState(false);

  // Cargar carrito desde localStorage al inicio
  useEffect(() => {

    const storedCart = localStorage.getItem("cart");
    console.log("Cargando carrito desde localStorage:", storedCart);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    console.log("Guardando carrito en localStorage:", cartItems);
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
    setSubtotal(newSubtotal);
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (producto, cantidad = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === producto.id);
      const cantidadTotal = existing ? existing.cantidad + cantidad: 0;

      if( cantidadTotal > producto.stock ){
        console.log("Cantidad solicitada excede el stock disponible.");
        setlimiteAlcanzado(true);
        return prev; 

      }
      if (existing ) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  // Eliminar producto
  const removeFromCart = (productoId) => {
    setCartItems(prev => prev.filter(item => item.id !== productoId));
  };

  // Actualizar cantidad
  const updateQuantity = (productoId, cantidad) => {
    setCartItems(prev =>
      prev.map(item =>{
       if( item.id === productoId )
       {
        if( cantidad >  item.stock ){
          console.log("Cantidad solicitada excede el stock disponible. 2");
          setlimiteAlcanzado(true);
          return item; 
        }
        return { ...item, cantidad: cantidad };
       }
       return item;
    })
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        subtotal,
        limiteAlcanzado,
        setlimiteAlcanzado
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
