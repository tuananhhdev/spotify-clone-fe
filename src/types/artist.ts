export interface Artist {
    id: string
    name: string
    image: string
    background: string
    followers: number
    isFollowing?: boolean
    songs: string[]
}
