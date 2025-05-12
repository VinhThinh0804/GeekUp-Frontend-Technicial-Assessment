import { NavLink, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import PeopleIcon from '@mui/icons-material/People';

const Sidebar = () => {
  const location = useLocation();
  return (
    <Box className="w-[17%] bg-white shadow-md">
      <Box className="p-4">
        <img src="https://geekup.vn/Icons/geekup-logo-general.svg" alt="GeekUp Logo" className="h-8 mx-auto cursor-pointer" />
      </Box>
      <List>
        <ListItem 
          component={NavLink} 
          to="/albums"
          sx={(theme) => {
            const isActive = location.pathname === '/albums';
            return {
              backgroundColor: isActive ? 'rgb(239 246 255)' : 'transparent',
              color: isActive ? 'rgb(37 99 235)' : 'rgb(55 65 81)',
              '&:hover': {
                backgroundColor: isActive ? 'rgb(239 246 255)' : 'rgb(243 244 246)'
              }
            }
          }}
        >
          <ListItemIcon>
            <PhotoAlbumIcon className="text-inherit" />
          </ListItemIcon>
          <ListItemText primary="Albums" />
        </ListItem>
        <ListItem 
          component={NavLink} 
          to="/users"
          sx={(theme) => {
            const isActive = location.pathname === '/users';
            return {
              backgroundColor: isActive ? 'rgb(239 246 255)' : 'transparent',
              color: isActive ? 'rgb(37 99 235)' : 'rgb(55 65 81)',
              '&:hover': {
                backgroundColor: isActive ? 'rgb(239 246 255)' : 'rgb(243 244 246)'
              }
            }
          }}
        >
          <ListItemIcon>
            <PeopleIcon className="text-inherit" />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;


