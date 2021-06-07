
import { IoMdPaper, IoMdPeople } from 'react-icons/io';
import { CgScreen,  } from 'react-icons/cg';
import { GiPapers, GiPaperClip } from 'react-icons/gi';
import { HiDocument } from 'react-icons/hi';
import { BsGear } from 'react-icons/bs';
import { IconType } from 'react-icons';

export interface IMenuItems {
  title: string;
  path: string;
  Icon: IconType | any;
  classnames: string;
}


export const menuItems: Array<IMenuItems> = [
  {
    title: 'Point of Sales',
    path: '/pos',
    Icon: <CgScreen />,
    classnames: 'nav-text'
  },
  {
    title: 'Invoices & Returns',
    path: '/invoices',
    Icon: <IoMdPaper />,
    classnames: 'nav-text'
  },
  {
    title: 'Contacts',
    path: '/contacts',
    Icon: <IoMdPeople />,
    classnames: 'nav-text'
  },
  {
    title: 'Inventory',
    path: '/inventory',
    Icon: <GiPapers />,
    classnames: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    Icon: <HiDocument />,
    classnames: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    Icon: <BsGear />,
    classnames: 'nav-text'
  },
  {
    title: 'Imprint',
    path: '/imring',
    Icon: <GiPaperClip />,
    classnames: 'nav-text'
  }
];