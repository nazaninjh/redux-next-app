'use client'

import { Provider } from "react-redux";
import { makeStore } from "./../lib/store";
import { useRef } from "react";
import { extendedApiSlice } from "./../lib/features/users/usersSlice";
export default function StoreProvider({ children }) {
    // make sure the store only re-renders once
    const storeRef = useRef(null);
    if (!storeRef.current) {
        storeRef.current = makeStore()
      }
    storeRef.current.dispatch(extendedApiSlice.endpoints.getAllUsers.initiate());
    return <Provider store={storeRef.current}>
        {children}
    </Provider>
}