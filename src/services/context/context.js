import { createContext, useState } from "react";

export const AppContext = createContext(); //component level

export const ContextProvider = ({ children }) => {
    const [showBottomTab, setShowBottomTab] = useState(true);

    const value = {
        showBottomTab,
        setShowBottomTab
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}