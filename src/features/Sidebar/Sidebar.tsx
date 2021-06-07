import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, withRouter } from 'react-router-dom';
import { menuItems } from './SidebarData';
import { IconContext } from 'react-icons';
import './Sidebar.scss';

function Navbar(): JSX.Element {
  const [sidebar, setSidebar] = useState<boolean>(false);

  const showSidebar = ():void => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars data-testid='menu-button' onClick={showSidebar} />
          </Link>
          <div className='users-container'>
            <div className='users'>
              <h2>
                Users
              </h2>
            </div>
            <div className='contact-info'>
              <div className='contact-avatar'>
                MK
              </div>
            </div>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <h1>
                INVENTORIUM
              </h1>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {menuItems.map((item, index) => {
              return (
                <li key={index} className={item.classnames}>
                  <Link to={item.path}>
                    {item.Icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default withRouter(Navbar);