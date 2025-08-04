import { createContext } from 'react';
import type { MusicContextType } from '../provider/MusicProvider';

export const MusicContext = createContext<MusicContextType | undefined>(undefined);
