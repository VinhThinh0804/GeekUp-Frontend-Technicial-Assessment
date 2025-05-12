import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Album } from '../../models/Album';
import { User } from '../../models/User';
import { getUser, getAlbumsByUser, getAvatarUrl } from '../../services/api';
import Loading from '../../components/Loading';

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const userData = await getUser(parseInt(id));
        setUser(userData);
        
        const albumsData = await getAlbumsByUser(userData.id);
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  if (loading) {
    return (
      <Loading/>
    );
  }
  
  if (!user) {
    return <p className="text-lg">User not found</p>;
  }
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm mb-4">
          <Link to="/users" className="text-gray-500 hover:text-blue-500">Users</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Show</span>
        </div>
        
        <div className="flex items-center mb-6">
          <Link to="/users" className="mr-2">
            <ArrowBackIcon className="text-gray-600" />
          </Link>
          <h1 className="text-xl font-medium">Show User</h1>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-6 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <img
                src={getAvatarUrl(user.name)}
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-medium">{user.name}</h2>
              <a href={`mailto:${user.email}`} className="text-blue-500 text-sm cursor-pointer hover:text-blue-400">{user.email}</a>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-md shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4">Albums</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 w-20">ID</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Title</th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-500 w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {albums.map((album) => (
                  <tr key={album.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{album.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{album.title}</td>
                    <td className="py-3 px-4 text-right">
                      <Link to={`/albums/${album.id}`}>
                        <button className="inline-flex items-center px-3 py-1 border border-1 border-slate-400 hover:border-blue-400 hover:text-blue-400 rounded text-sm text-gray-700">
                          <VisibilityIcon className="h-4 w-4 mr-1" />
                          Show
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;

