import { NavLink } from "react-router-dom";
import { ReactComponent as ProfileIcon } from '../../Assets/Icons//profile.svg';
import { ReactComponent as TagsIcon } from '../../Assets/Icons//tags.svg';
import { ReactComponent as WarehouseIcon } from '../../Assets/Icons/warehouse.svg';
import { ReactComponent as ReportsIcon } from '../../Assets/Icons/reports.svg';
import { ReactComponent as OrdersIcon } from '../../Assets/Icons/orders.svg';
import { ReactComponent as ItemsIcon } from '../../Assets/Icons/items.svg';
import { Button } from 'tailwind-react-ui';

const SideBar = () => {
  return (
    <div className="fixed left-0 top-0 h-full flex flex-col w-48 justify-between bg-green-500">
      <div className="mt-8">
        <NavLink to="/profile" activeClassName="bg-blue-500">
          <Button className="flex items-center w-full text-left">
            <ProfileIcon className="mr-2" />
            Profile
          </Button>
        </NavLink>
        <NavLink to="/tags" activeClassName="bg-blue-500">
          <Button className="flex items-center w-full text-left mt-2">
            <TagsIcon className="mr-2" />
            Tags
          </Button>
        </NavLink>
        <NavLink to="/warehouse" activeClassName="bg-blue-500">
          <Button className="flex items-center w-full text-left mt-2">
            <WarehouseIcon className="mr-2" />
            Warehouse
          </Button>
        </NavLink>
        <NavLink to="/reports" activeClassName="bg-blue-500">
          <Button className="flex items-center w-full text-left mt-2">
            <ReportsIcon className="mr-2" />
            Reports
          </Button>
        </NavLink>
        <NavLink to="/orders" activeClassName="bg-blue-500">
          <Button className="flex items-center w-full text-left mt-2">
            <OrdersIcon className="mr-2" />
            Orders
          </Button>
        </NavLink>
        <NavLink to="/items" activeClassName="bg-blue-500">
          <Button className="flex items-center w-full text-left mt-2">
            <ItemsIcon className="mr-2" />
            Items
          </Button>
        </NavLink>
      </div>
      <div className="h-230px"></div>
    </div>
  );
};

export default SideBar;

