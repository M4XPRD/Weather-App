import React from 'react';
import SidebarInfo from './SidebarInfo';
import SidebarSearch from './SidebarSearch';

const Sidebar = () => (
  <aside className="sidebar">
    <SidebarInfo />
    <SidebarSearch />
  </aside>
);

export default Sidebar;
