import { create } from "zustand"
import { Product } from "../types"
import { toast } from "react-hot-toast"
import { createJSONStorage, persist } from "zustand/middleware"

// Define the interface of the Cart state
interface State {
    cart: Product[]
    totalItems: number
    totalPrice: number
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
    addToCart: (Item: Product) => void
    removeFromCart: (Item: Product) => void
    removeItemFromCart: (Item: Product) => void
}

// Initialize a default state
const INITIAL_STATE: State = {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
}

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create(
    persist<State & Actions>(
        (set, get) => ({
            cart: INITIAL_STATE.cart,
            totalItems: INITIAL_STATE.totalItems,
            totalPrice: INITIAL_STATE.totalPrice,

            addToCart: (product: Product) => {
                const cart = get().cart
                const cartItem = cart.find(item => item.id === product.id)

                // If the item already exists in the Cart, increase its quantity
                if (cartItem) {
                    const updatedCart = cart.map(item =>
                        item.id === product.id ? { ...item, quantity: (item.quantity as number) + 1 } : item
                    )
                    set(state => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + 1,
                        totalPrice: state.totalPrice + product.price,
                    }))
                    toast.success("Item added to cart.");
                } else {
                    const updatedCart = [...cart, { ...product, quantity: 1 }]

                    set(state => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + 1,
                        totalPrice: state.totalPrice + product.price,
                    }))
                    toast.success("Item added to cart.");
                }
            },
            removeFromCart: (product: Product) => {
                set(state => ({
                    cart: state.cart.filter(item => item.id !== product.id),
                    totalItems: state.totalItems - product.quantity,
                    totalPrice: state.totalPrice - product.price,
                }))
                toast.success("Item removed from the cart.");
            },
            removeItemFromCart: (product: Product) => {
                const cart = get().cart
                const cartItem = cart.find(item => item.id === product.id)
                const quantity = cartItem?.quantity

                if (cartItem && quantity > 1) {
                    const updatedCart = cart.map(item =>
                        item.id === product.id ? { ...item, quantity: (item.quantity as number) - 1 } : item
                    )

                    set(state => ({
                        cart: updatedCart,
                        totalItems: state.totalItems - 1,
                        totalPrice: state.totalPrice - product.price,
                    }))
                    toast.success("Item removed from the cart.");
                }
            }

        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
            // version: 1,

            // migrate: (persistedState: any, version: number) => {
            //     if (version === 0) {
            //         // if the stored value is in version 0, we rename the field to the new name
            //         persistedState.totalProducts = persistedState.totalItems
            //         delete persistedState.totalItems
            //     }

            //     return persistedState as State & Actions
            // },
        }
    ))
