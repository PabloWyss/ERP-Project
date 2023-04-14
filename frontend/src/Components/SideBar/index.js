import { NavLink } from "react-router-dom";
import { ReactComponent as ProfileIcon } from '../../Assets/Icons//profile.svg';
import { ReactComponent as TagsIcon } from '../../Assets/Icons//tags.svg';
import { ReactComponent as WarehouseIcon } from '../../Assets/Icons/warehouse.svg';
import { ReactComponent as ReportsIcon } from '../../Assets/Icons/reports.svg';
import { ReactComponent as OrdersIcon } from '../../Assets/Icons/orders.svg';
import { ReactComponent as ItemsIcon } from '../../Assets/Icons/items.svg';
import logo from '../../Assets/Logos/logo_white.svg';

const SideBar = () => {
  return (
    <div className="fixed py-10 left-0 top-0 h-full flex flex-col w-48 bg-gradient-to-b from-gradientFrom to-gradientTo">
      <div className="flex items-center justify-center">
        <img src={logo} alt="Invenflow Logo" className="w-8 h-8 mr-5" />
        <h1 className="text-white text-xl font-bold">invenflow</h1>
      </div>
      <div className="mt-10">
        <NavLink to="/items">
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text text-rgba(58, 89, 84, 1)' : 'text-white'}`}>
              <ItemsIcon className="mr-2" />
              Items
            </button>
          )}
        </NavLink>
        <NavLink to="/orders">
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1)' : 'text-white'}`}>
              <OrdersIcon className="mr-2" />
              Orders
            </button>
          )}
        </NavLink>
        <NavLink to="/reports" >
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1)' : 'text-white'}`}>
              <ReportsIcon className="mr-2" />
              Reports
            </button>
          )}
        </NavLink>
        <NavLink to="/tags">
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1)' : 'text-white'}`}>
              <TagsIcon className="mr-2" />
              Tags
            </button>
          )}
        </NavLink>
        <NavLink to="/warehouses" >
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1)' : 'text-white'}`}>
              <WarehouseIcon className="mr-2" />
              Warehouses
            </button>
          )}
        </NavLink>
        <NavLink to="/profile">
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-4 ${isActive ? 'bg-white bg-opacity-60 text-rgba(58, 89, 84, 1)' : 'text-white'}`}>
              <ProfileIcon className="mr-2" />
              Profile
            </button>
          )}
        </NavLink>

      </div>
    </div>
  );
};

export default SideBar;



