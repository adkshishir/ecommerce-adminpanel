'use client';
import {
  HomeIcon,
  LineChartIcon,
  LucideIcon,
  LucideProps,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';

const SideNavBar = () => {
  const [activeNav, setActiveNav] = React.useState<number>(0);
  const navbar = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: HomeIcon,
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCartIcon,
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: PackageIcon,
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: Package2Icon,
    },
    {
      name: 'Parent Categories',
      href: '/admin/parent-category',
      icon: LineChartIcon,
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: UsersIcon,
    },
  ];
  return (
    <>
      {navbar.map((item, index) => (
        <Link
          key={item.name}
          onClick={() => {
            setActiveNav(index);
          }}
          className={` ${
            activeNav === index
              ? 'text-gray-900 bg-gray-600 dark:text-gray-50'
              : ''
          } flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
          href={item.href}>
          <item.icon className='h-5 w-5' />
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default SideNavBar;
