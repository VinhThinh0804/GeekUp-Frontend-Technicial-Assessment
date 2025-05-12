import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Album } from "../../models/Album";
import { User } from "../../models/User";
import { getAlbum, getUser, getAvatarUrl } from "../../services/api";
import Loading from "../../components/Loading";

const AlbumDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const albumData = await getAlbum(parseInt(id));
        setAlbum(albumData);

        const userData = await getUser(albumData.userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!album || !user) {
    return <p className="text-lg">Album not found</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm mb-4">
          <Link to="/albums" className="text-gray-500 hover:text-blue-500">
            Albums
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Show</span>
        </div>

        <div className="flex items-center mb-6">
          <Link to="/albums" className="mr-2">
            <ArrowBackIcon className="text-gray-600" />
          </Link>
          <h1 className="text-xl font-medium">Show Album</h1>
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
              <h2 className="text-lg font-medium">
                <Link
                  to={`/users/${user.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.name}
                </Link>
              </h2>
              <a className="text-blue-500 text-sm hover:text-blue-400 cursor-pointer" href={`mailto:${user.email}`}>{user.email}</a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm p-6">
          <p className="text-gray-800">{album.title}</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailPage;
