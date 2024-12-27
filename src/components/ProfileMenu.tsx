import { NavLink, useNavigate } from "react-router-dom";
import { HttpRequest } from "../helpers/http-request-class.helper";
import Button from "./common/Button";
import { useState } from "react";
import Alert from "./common/Alert";
import { FaRegUser, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import useAuth from "../hooks/useAuth";


interface MenuItem {
  label: string;
  link: string;
  icon: any
}

const ProfileMenu = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth()
  const menuItems: MenuItem[] = [
    { label: "User Information", link: "profile", icon: <FaRegUser className="text-xl" /> },
    { label: "Bookmarks", link: "profile/bookmarks", icon: <FaRegBookmark className="text-xl" /> },
    { label: "Likes", link: "profile/likes", icon: <FaRegHeart className="text-xl" /> },
  ];

  const handleLogout = async () => {
    try {
      const res = await HttpRequest.delete("/v1/auth/logout");
      if (res.status === 200) {
        logout()
        navigate("/");
      }
    } catch (error) {
      setError("Cannot Logout!");
    }
  };

  return (
    <>
      {error && <Alert text={error} />}
      <div className="flex flex-col justify-center items-sterch w-80 max-w-250 me-8 mx-5 space-y-4 shadow-md rounded-lg">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            end
            to={`/${item.link}`}
            className={({ isActive, isPending }) =>
              isActive ? "bg-gray-100" : ""
            }
          >
            <div className="text-lg my-3 py-3 px-4 pt-2 pb-3 flex items-center justify-center space-x-3">
              <div className={`w-full flex items-center gap-x-2`}>
                {item.icon}
                {item.label}
              </div>
            </div>
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
        >
          <div className="text-lg my-3 py-3 px-4 pt-2 pb-3 flex items-center justify-center space-x-3">
            <div className={`w-full flex items-center gap-x-2`}>
              <span>
                Logout
              </span>
              <MdLogout className="text-xl text-red-500" />
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default ProfileMenu;
