import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Interface du contexte
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// 2. Création du contexte
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// 3. Provider
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// 4. Hook personnalisé pour utiliser le contexte
export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('❌ useSidebar must be used within a <SidebarProvider>');
  }
  return context;
};
