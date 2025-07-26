import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { MusicProvider } from "../contexts/MusicContext";
import { NotificationProvider } from "../contexts/NotificationContext";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <MusicProvider>
          {children}
        </MusicProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default AppProvider;