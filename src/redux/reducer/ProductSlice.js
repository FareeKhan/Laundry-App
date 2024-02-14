import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "ProductSlice",
    initialState: {
        product: []
    },
    reducers: {
        getProducts: (state, action) => {
            state.product.push({ ...action.payload })
        },
        incrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => item.id == action.payload.id)
            itemPresent.quantity += 1
        },
        decrementQty: (state, action) => {
            const itemPresent = state.product.find((item) => item.id == action.payload.id)
            if (itemPresent.quantity == 1) {
                itemPresent.quantity = 0
                // const removeItem = state.product.filter((item) => item.id != action.payload.id)
                // state.product = removeItem
            } else {
                itemPresent.quantity--
            }
        },
        // removeQuantity: (state, action) => {
        //     const itemPresent =state.product.find((item) => ({...item,quantity:0}))
        // console.log(itemPresent)
        // },
        removeQuantity: (state, action) => {
            // Map through the product array and set quantity to zero for each item
            const updatedProduct = state.product.map(item => ({ ...item, quantity: 0 }));
            
            console.log(updatedProduct); // Log the updated product array with all quantities set to zero
        
            // Return the updated state with all quantities set to zero
            return { ...state, product: updatedProduct };
        }
        



    }
})

export const { getProducts, incrementQty, decrementQty,removeQuantity } = productSlice.actions
export default productSlice.reducer