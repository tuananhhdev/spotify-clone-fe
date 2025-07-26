export interface Song {
    id: string
    title: string
    artist: string
    album?: string
    cover: string
    audio: string
    duration: string
    isLiked?: boolean
}
