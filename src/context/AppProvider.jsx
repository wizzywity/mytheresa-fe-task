import * as React from 'react'
import {useCallback, useContext, useEffect, useState} from 'react'
import { apiClient } from "../service";

export const AppContext = React.createContext(null)

const AppProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([])
    const [configuration, setConfiguration] = useState({})

    useEffect(() => {
        apiClient.get('/configuration').then((res) => {
            setConfiguration(() => res?.data?.images)
        }).catch(console.log)
    },[])

    const addToWishlist = useCallback((item) => {
        if(!wishlist.find((it) => it?.id === item?.id)){
            setWishlist((prev) => [...prev, item])
        }
    },[wishlist])

    const value = {
        wishlist,
        addToWishlist,
        configuration,
        setConfiguration
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
