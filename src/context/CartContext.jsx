import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const CartContext = createContext(null)

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const stored = localStorage.getItem('sv_cart')
        if (stored) {
            try { setCartItems(JSON.parse(stored)) } catch { }
        }
    }, [])

    const saveCart = (items) => {
        setCartItems(items)
        localStorage.setItem('sv_cart', JSON.stringify(items))
    }

    const addToCart = (product, qty = 1) => {
        const existing = cartItems.find(i => i.id === product.id)
        if (existing) {
            const updated = cartItems.map(i =>
                i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
            )
            saveCart(updated)
            toast.success(`${product.name} quantity updated!`)
        } else {
            saveCart([...cartItems, { ...product, quantity: qty }])
            toast.success(`${product.name} added to cart!`)
        }
    }

    const removeFromCart = (id) => {
        saveCart(cartItems.filter(i => i.id !== id))
        toast.info('Item removed from cart')
    }

    const updateQuantity = (id, qty) => {
        if (qty < 1) { removeFromCart(id); return }
        saveCart(cartItems.map(i => i.id === id ? { ...i, quantity: qty } : i))
    }

    const clearCart = () => {
        saveCart([])
    }

    const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0)
    const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    )
}
