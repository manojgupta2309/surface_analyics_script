import React from 'react';
import { Typography, Button, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import './Sidebar.scss';
import SideBarNavIcons from '~/app/constants/SideBarNavConstants';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Typography variant="h5" component="h1" className="logo">
          <span className="logo-surface">surface</span>
          <span className="logo-labs">labs</span>
        </Typography>
      </div>
      <Divider />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon fontSize="small" style={{ marginRight: '8px' }} />
            My Workspace
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <nav className="sidebar-nav">
      {SideBarNavIcons.map(({label,Icon}, index) => (
        <Button
          id={'sidebar-button-'+label}
          key={index}
          className={`sidebar-item ${index === 0 ? 'selected' : ''}`}
          variant="text"
          fullWidth
          startIcon={<Icon />}
        >
          {label}
        </Button>
      ))}
    </nav>
        </AccordionDetails>
      </Accordion>

      <Divider />
      <div className="sidebar-footer">
        <div className="profile">
          <img src="https://via.placeholder.com/40" alt="Profile" className="profile-pic" />
          <div>
            <Typography variant="body2" className="full-name">Chris Hood</Typography>
            <Typography variant="caption" color="textSecondary" className="email">hello@example.com</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
