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
    <div className="fixed left-0 top-0 h-full flex flex-col w-48 justify-between bg-green-500">
      <div className="flex items-center justify-center">
        <img src={logo} alt="Invenflow Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-white text-xl font-bold">invenflow</h1>
      </div>
      <div>
        <NavLink to="/profile">
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-2 ${isActive ? 'bg-blue-500' : ''}`}>
              <ProfileIcon className="mr-2" />
              Profile
            </button>
          )}
        </NavLink>
        <NavLink to="/tags">
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-2 ${isActive ? 'bg-blue-500' : ''}`}>
              <TagsIcon className="mr-2" />
              Tags
            </button>
          )}
        </NavLink>
        <NavLink to="/warehouse" >
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-2 ${isActive ? 'bg-blue-500' : ''}`}>
              <WarehouseIcon className="mr-2" />
              Warehouse
            </button>
          )}
        </NavLink>
        <NavLink to="/reports" >
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-2 ${isActive ? 'bg-blue-500' : ''}`}>
              <ReportsIcon className="mr-2" />
              Reports
            </button>
          )}
        </NavLink>
        <NavLink to="/orders">
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-2 ${isActive ? 'bg-blue-500' : ''}`}>
              <OrdersIcon className="mr-2" />
              Orders
            </button>
          )}
        </NavLink>
        <NavLink to="/items">
          {({isActive}) => (
            <button className={`flex items-center w-full text-left mt-2 ${isActive ? 'bg-blue-500' : ''}`}>
              <ItemsIcon className="mr-2" />
              Items
            </button>
          )}
        </NavLink>
      </div>
      <div className="h-230px"></div>
    </div>
  );
};

export default SideBar;



