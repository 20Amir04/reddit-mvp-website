import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CommunityDetailsPage from "./pages/CommunityDetailsPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout/>} />
      <Route path="/" element={<HomePage/>} />

      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />

      <Route path="/communities" element={<CommunitiesPage/>} />
      <Route path="/r/:communityName" element={<CommunityDetailsPage/>} />
      <Route path="/create-community" element={<CreateCommunityPage/>} />

      <Route path="/create-post" element={<CreatePostPage/>} />
      <Route path="/post/:postId" element={<PostDetailsPage/>} />

      <Route path="/u/:username" element={<UserProfilePage/>} />
      <Route path="/search" element={<SearchResultsPage/>} />

      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  );
}
export default App;