import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AllArtists from "./pages/AllArtists";
import AllTrending from "./pages/AllTrending";
import Artist from "./pages/Artist";
import Home from "./pages/Home";
import LikedSongs from "./pages/LikedSongs";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
