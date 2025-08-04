import React, { useState, useRef, type ReactNode } from 'react';
import { songs as initialSongs, artists as initialArtists } from '../data/index';
import type { Artist, Song } from '../types';
import { MusicContext } from '../contexts/MusicContext';

export interface MusicContextType {
    currentSong: Song | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    repeatMode: number;
    isShuffled: boolean;
    queue: Song[];
    showQueue: boolean;
    songs: Song[];
    artists: Artist[];
    playlist: Song[]; // Thêm playlist
    playSong: (song: Song) => void;
    pauseSong: () => void;
    togglePlayPause: () => void;
    nextSong: () => void;
    previousSong: () => void;
    seekTo: (time: number) => void;
    setVolume: (volume: number) => void;
    toggleRepeat: () => void;
    toggleShuffle: () => void;
    toggleQueue: () => void;
    addToQueue: (song: Song) => void;
    removeFromQueue: (songId: string) => void;
    clearQueue: () => void;
    playFromQueue: (song: Song) => void;
    toggleLike: (songId: string) => void;
    searchSongs: (query: string) => Song[];
    searchArtists: (query: string) => Artist[];
    getSongsByArtist: (artistId: string) => Song[];
    setPlaylist: (songs: Song[]) => void; // Thêm setPlaylist
}

interface MusicProviderProps {
    children: ReactNode;
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(1);
    const [repeatMode, setRepeatMode] = useState(0);
    const [isShuffled, setIsShuffled] = useState(false);
    const [queue, setQueue] = useState<Song[]>([]);
    const [showQueue, setShowQueue] = useState(false);
    const [songs, setSongs] = useState<Song[]>(initialSongs);
    const [artists] = useState<Artist[]>(initialArtists);
    const [playlist, setPlaylist] = useState<Song[]>([]); // Thêm state cho playlist

    React.useEffect(() => {
        setSongs(initialSongs);
    }, []);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    React.useEffect(() => {
        audioRef.current = new Audio();
        const audio = audioRef.current;

        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        });

        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            if (playlist.length > 0) {
                const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
                if (repeatMode === 2) {
                    audio.currentTime = 0;
                    audio.play();
                    setIsPlaying(true);
                } else if (repeatMode === 1 || currentIndex < playlist.length - 1) {
                    const nextIndex = (currentIndex + 1) % playlist.length;
                    playSong(playlist[nextIndex]);
                } else {
                    setIsPlaying(false);
                }
            }
        };

        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [repeatMode, currentSong?.id, playlist]);

    const playSong = (song: Song) => {
        if (audioRef.current) {
            if (currentSong?.id !== song.id) {
                audioRef.current.src = song.audio;
                setCurrentSong(song);
            }
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const pauseSong = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            pauseSong();
        } else if (currentSong) {
            playSong(currentSong);
        }
    };

    const nextSong = () => {
        if (playlist.length > 0) {
            const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
            const nextIndex = (currentIndex + 1) % playlist.length;
            playSong(playlist[nextIndex]);
        }
    };

    const previousSong = () => {
        if (playlist.length > 0) {
            const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
            const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
            playSong(playlist[prevIndex]);
        }
    };

    const seekTo = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const setVolume = (newVolume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            setVolumeState(newVolume);
        }
    };

    const toggleLike = (songId: string) => {
        setSongs(prevSongs =>
            prevSongs.map(song =>
                song.id === songId ? { ...song, isLiked: !song.isLiked } : song
            )
        );
    };

    const toggleRepeat = () => {
        setRepeatMode(prev => (prev + 1) % 3);
    };

    const toggleShuffle = () => {
        setIsShuffled(prev => !prev);
    };

    const toggleQueue = () => {
        setShowQueue(prev => !prev);
    };

    const addToQueue = (song: Song) => {
        setQueue(prev => [...prev, song]);
    };

    const removeFromQueue = (songId: string) => {
        setQueue(prev => prev.filter(song => song.id !== songId));
    };

    const clearQueue = () => {
        setQueue([]);
    };

    const playFromQueue = (song: Song) => {
        playSong(song);
        removeFromQueue(song.id);
    };

    const searchSongs = (query: string): Song[] => {
        const lowerCaseQuery = query.toLowerCase();
        return songs.filter(song =>
            song.title.toLowerCase().includes(lowerCaseQuery) ||
            song.artist.toLowerCase().includes(lowerCaseQuery)
        );
    };

    const searchArtists = (query: string): Artist[] => {
        const lowerCaseQuery = query.toLowerCase();
        return artists.filter(artist =>
            artist.name.toLowerCase().includes(lowerCaseQuery)
        );
    };

    const getSongsByArtist = (artistId: string): Song[] => {
        const artist = artists.find(a => a.id === artistId);
        if (!artist || !artist.songs) return [];

        return songs.filter(song => artist.songs.includes(song.id));
    };

    const value: MusicContextType = {
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        repeatMode,
        isShuffled,
        queue,
        showQueue,
        songs,
        artists,
        playlist,
        playSong,
        pauseSong,
        togglePlayPause,
        nextSong,
        previousSong,
        seekTo,
        setVolume,
        toggleRepeat,
        toggleShuffle,
        toggleQueue,
        addToQueue,
        removeFromQueue,
        clearQueue,
        playFromQueue,
        toggleLike,
        searchSongs,
        searchArtists,
        getSongsByArtist,
        setPlaylist,
    };

    return (
        <MusicContext.Provider value={value}>
            {children}
        </MusicContext.Provider>
    );
};