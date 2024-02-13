import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Root: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Root;
