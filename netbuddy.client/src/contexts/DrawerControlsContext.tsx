import React, { createContext, useContext, useState, ReactNode } from 'react';

type DrawerControlsContextType = {
    isDrawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
};

const DrawerControlsContext = createContext<DrawerControlsContextType | undefined>(undefined);

export const useDrawerControl = (): DrawerControlsContextType => {
    const context = useContext(DrawerControlsContext);
    if (!context) {
        throw new Error('useDrawerControl must be used within a DrawerControlProvider');
    }
    return context;
};

export const DrawerControlProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const contextValue: DrawerControlsContextType = {
        isDrawerOpen,
        openDrawer,
        closeDrawer,
    };

    return (
        <DrawerControlsContext.Provider value={contextValue}>
            {children}
        </DrawerControlsContext.Provider>
    );
};

export default DrawerControlsContext;
