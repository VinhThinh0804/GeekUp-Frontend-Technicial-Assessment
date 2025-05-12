import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AlbumListPage from './pages/albums/AlbumListPage';
import AlbumDetailPage from './pages/albums/AlbumDetailPage';
import UserListPage from './pages/users/UserListPage';
import UserDetailPage from './pages/users/UserDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AlbumListPage />} />
        <Route path="albums" element={<AlbumListPage />} />
        <Route path="albums/:id" element={<AlbumDetailPage />} />
        <Route path="users" element={<UserListPage />} />
        <Route path="users/:id" element={<UserDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;