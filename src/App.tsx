import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AllArtists from "./pages/AllArtists";
import AllTrending from "./pages/AllTrending";
import Artist from "./pages/Artist";
import Home from "./pages/Home";
import LikedSongs from "./pages/LikedSongs";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="artist/:id" element={<Artist />} />
        <Route path="liked" element={<LikedSongs />} />
        <Route path="trending" element={<AllTrending />} />
        <Route path="artists" element={<AllArtists />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
