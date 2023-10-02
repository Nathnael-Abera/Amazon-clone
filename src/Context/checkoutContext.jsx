import { useContext, createContext, useReducer } from "react";
 const CheckoutContext = createContext();
 const intialState = {
    basket: [],
    user:null
}
 const reducer = (state, action) => {
     if (action.type === 'ADD_TO_BASKET') {
		return { ...state, basket: [...state.basket, action.item] };
     }
     if (action.type === 'SETUSER') {
		return { ...state, user:action.user };
     }
     if (action.type === 'EMPTY_BASKET') {
         return {
             ...state,
           basket: []
         };
     }
     if (action.type === 'REMOVE') {
		let index = state.basket?.findIndex(
			(item) => item.id === action.item.id
		);
		// console.log(state.basket)
        // console.log(action.item)
		let newBasket = [...state.basket];
		newBasket.splice(index, 1);
		return { ...state, basket: newBasket };
	}
    
}



export const CheckoutProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, intialState);
    return(
     < CheckoutContext.Provider value={{...state,dispatch}}>
           {children}
    </CheckoutContext.Provider >
    )
}
   

;
export const useCheckoutContext = () => { return useContext(CheckoutContext); };



export default reducer
