import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Album } from "../../models/Album";
import { User } from "../../models/User";
import { getAlbums, getUsers, getAvatarUrl } from "../../services/api";
import Loading from "../../components/Loading";

const AlbumListPage = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const current = parseInt(searchParams.get("current") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [albumsData, usersData] = await Promise.all([
          getAlbums(),
          getUsers(),
        ]);
        setAlbums(albumsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (newPage: number) => {
    setSearchParams({
      current: newPage.toString(),
      pageSize: pageSize.toString(),
    });
  };

  const handleChangePageSize = (newPageSize: number) => {
    setSearchParams({ current: "1", pageSize: newPageSize.toString() });
  };

  const getUserById = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  if (loading) {
    return <Loading />;
  }

  const paginatedAlbums = albums.slice(
    (current - 1) * pageSize,
    current * pageSize
  );
  const totalPages = Math.ceil(albums.length / pageSize);

  return (
    <div className="container w-full mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Albums</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <table className="min-w-full divide-y divide-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAlbums.map((album) => {
              const user = getUserById(album.userId);
              return (
                <tr key={album.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{album.id}</td>
                  <td className="px-6 py-4">{album.title}</td>
                  <td className="px-6 py-4">
                    {user && (
                      <Link
                        to={`/users/${user.id}`}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-400"
                      >
                        <img
                          src={getAvatarUrl(user.name)}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <span>{user.name}</span>
                      </Link>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => navigate(`/albums/${album.id}`)}
                      className="inline-flex items-center justify-center px-2 py-1 border border-slate-500 hover:border-blue-500 hover:text-blue-500 rounded-md hover:bg-blue-50"
                    >
                      <VisibilityIcon className="h-4 w-4 mr-1" />
                      Show
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-700">
          Showing {(current - 1) * pageSize + 1}-
          {Math.min(current * pageSize, albums.length)} of {albums.length}
        </p>
        <div className="flex flex-row gap-2 items-center">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleChangePage(current - 1)}
              disabled={current === 1}
              className={`px-3 py-1 rounded-md ${
                current === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Only show 5 pages each time
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (current <= 3) {
                pageNum = i + 1;
              } else if (current >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = current - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handleChangePage(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    pageNum === current
                      ? "bg-blue-500 text-white"
                      : "bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => handleChangePage(current + 1)}
              disabled={current === totalPages}
              className={`px-3 py-1 rounded-md ${
                current === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
          <div className="">
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => handleChangePageSize(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumListPage;
