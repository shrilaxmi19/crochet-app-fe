import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import logo from "../assets/trokes (2).png"


const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-orange-500"
        >
           <img src={logo} alt="logo" style={{ width: '200px', height: '100px' }} />
        </Link>
        <div className="md:hidden">
          <MobileNav/>
        </div>
        <div className="hidden md:block">
          <MainNav/>
        </div>
      </div>
    </div>
  );
};

export default Header;
