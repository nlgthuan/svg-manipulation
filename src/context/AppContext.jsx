import { signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

function createAppState() {
  const svgContent = signal('');
  const selectedElement = signal(null);

  return { svgContent, selectedElement };
}

const AppContext = createContext();

export function AppProvider({ children }) {
  return (
    <AppContext.Provider value={createAppState()}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
