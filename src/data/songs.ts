import type { Song } from "../types";
import audio1 from '../assets/audio/[CHO BẢO] 07. Feel At Home - B Ray - Prod. Ducnn [6x1yluqMuc4].mp3';
import audio2 from '../assets/audio/tlinh - nếu lúc đó.mp3';
import audio3 from '../assets/audio/Không Đau Nữa Rồi (ft. Pháp Kiều) -52Hz, Châu Bùi, ORANGE, Mỹ Mỹ.mp3';
import audio4 from '../assets/audio/HIEUTHUHAI - TRÌNH.mp3';
import audio5 from '../assets/audio/Chúng Ta Của Hiện Tại.mp3';
import audio6 from '../assets/audio/Chúng Ta Của Tương Lai.mp3';
import audio7 from '../assets/audio/HIEUTHUHAI - Nước Mắt Cá Sấu.mp3';
import audio8 from '../assets/audio/Wxrdie - MỜI EM (ft. Mcee Blue) [prod. by Machiot, Marlykid].mp3';
import audio9 from '../assets/audio/Central Cee x Dave - Sprinter [Music Video].mp3';
import audio10 from '../assets/audio/SZA - Snooze.mp3';


export const songs: Song[] = [
    {
        id: '1',
        title: 'Feel At Home',
        artist: 'Bray',
        album: 'CHOBAO',
        cover: 'https://i.scdn.co/image/ab67616d00001e024e1566cecfa3c836f48f80f6',
        audio: audio1,
        duration: '2:44',
        isLiked: true
    },
    {
        id: '2',
        title: 'NẾU LÚC ĐÓ',
        artist: 'TLINH',
        album: 'ái',
        cover: 'https://i.ytimg.com/vi/hMwJggT9WSY/maxresdefault.jpg',
        audio: audio2,
        duration: '4:12',
        isLiked: false
    },
    {
        id: '3',
        title: 'KHÔNG ĐAU NỮA RỒI',
        artist: 'Orange, Mỹ Mỹ, 52Hz, Châu Bùi, Pháp Kiều',
        album: 'EM XINH SAY HI',
        cover: 'https://static.minhtuanmobile.com/uploads/editer/2025-06/23/images/loi-bai-hat-khong-dau-nua-roi-em-xinh-say-hi-live-stag-2-2.webp',
        audio: audio3,
        duration: '5:27',
        isLiked: true
    },
    {
        id: '4',
        title: 'TRÌNH',
        artist: 'HIEUTHUHAI',
        album: '',
        cover: 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/b/0/d/5/b0d53b5760df0a3bb3e9b6f97b8d82d6.jpg',
        audio: audio4,
        duration: '4:37',
        isLiked: false
    },
    {
        id: '5',
        title: 'Chúng Ta Của Hiện Tại',
        artist: 'Sơn Tùng M-TP',
        album: 'Sky Tour',
        cover: 'https://media.vov.vn/sites/default/files/styles/large/public/2021-02/chungtacuahientai.jpg',
        audio: audio5,
        duration: '4:37',
        isLiked: true
    },
    {
        id: '6',
        title: 'Chúng Ta Của Tương Lai',
        artist: 'Sơn Tùng M-TP',
        album: 'Sky Tour',
        cover: 'https://i1.sndcdn.com/artworks-o8lIln4WeWDlDrM0-PnuIkg-t1080x1080.jpg',
        audio: audio6,
        duration: '3:23',
        isLiked: false
    },
    {
        id: '7',
        title: 'Nước Mắt Cá Sấu',
        artist: 'HIEUTHUHAI',
        album: '',
        cover: 'https://images.genius.com/243ca5539feb3606a882edff7b8810c0.1000x1000x1.png',
        audio: audio7,
        duration: '3:20',
        isLiked: true
    },
    {
        id: '8',
        title: 'MỜI EM',
        artist: 'Wxrdie',
        album: 'THE WXRDIES',
        cover: 'https://i.ytimg.com/vi/j3KCob5TbMk/mqdefault.jpg',
        audio: audio8,
        duration: '3:05',
        isLiked: false
    },
    {
        id: '9',
        title: 'Sprinter',
        artist: 'Central Cee, Dave',
        album: '',
        cover: 'https://i.ytimg.com/vi/pSY3i5XHHXo/maxresdefault.jpg',
        audio: audio9,
        duration: '3:49',
        isLiked: true
    },
    {
        id: '10',
        title: 'Snooze',
        artist: 'SZA',
        album: 'SOS',
        cover: 'https://i1.sndcdn.com/artworks-L17TcnTdcmlY-0-t500x500.jpg',
        audio: audio10,
        duration: '3:23',
        isLiked: false
    }
];