export interface Artist {
    id: string
    name: string
    image: string
    followers: number
    isFollowing?: boolean
    songs: string[] // Array of song IDs that belong to this artist
}
