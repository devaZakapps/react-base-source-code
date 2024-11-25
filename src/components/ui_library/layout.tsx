import React, { useState, useEffect } from 'react';
import VerticalMenu from './menu';
import Header from './header';
import { Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const [headerText, setHeaderText] = useState<string | undefined>('');

  const updateHeaderText = (headerValue: string | undefined) => {
    setHeaderText(headerValue);
  };
  interface MenuItem {
    name: string;
    path: string;

  }
  const menuItems: MenuItem[] = [
    {
      name: 'Overview',
      path: '/'
    },
    {
      name: 'Overview',
      path: '/dashboard'
    },
    {
      name: 'Project Generator',
      path: '/projectgenerator',
    },
    {
      name: 'SKU',
      path: '/product'
    },
    {
      name: 'Price Manager',
      path: '/price',
    },
  ];

  const getNameByPath = (path: string): string | undefined => {
    const menuItem = menuItems.find((item) => item.path === path);
    return menuItem ? menuItem.name : undefined;
  };

  useEffect(() => {
    const storedMenu = getNameByPath(pathname);
    updateHeaderText(storedMenu);
  }, [pathname]);

  return (
    <div className="flex">
      <VerticalMenu />
      <div className="w-full bg-[#F2F2F2]">
        <div>
          <Header headerValue={headerText} />
        </div>
        <div className="overflow-y-scroll scroll-smooth max-h-screen h-[calc(100vh_-_50px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
