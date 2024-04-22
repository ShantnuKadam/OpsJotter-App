import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import { blue } from '@mui/material/colors';

export const drawerWidth = 280;

export const StyledListItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  '&.Mui-selected': {
    backgroundColor: blue[500], // Using Material-UI's color for consistency
    color: theme.palette.common.white,
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: blue[700], // Darken the blue on hover
    },
  },
  '&:hover': {
    backgroundColor: blue[100], // Light blue on hover for non-selected items
  },
  borderRadius: '20px', // Round corners for all list items
}));

// Additional styles can be added here as needed.
