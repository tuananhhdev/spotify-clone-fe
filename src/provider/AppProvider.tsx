import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { MusicProvider } from "./MusicProvider";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
        <MusicProvider>
          {children}
        </MusicProvider>
    </BrowserRouter>
  );
};

export default AppProvider;