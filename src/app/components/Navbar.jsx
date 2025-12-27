"use client";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";

import { useReadFuc } from "../context/read";
import { useCurrUserFuc } from "../context/currentUserContext";
import { useAddFriendFuc } from "../context/addFriend";

import {
  filter_for_UserName,
  filter_Show_For_Notification,
} from "../../../utils";

// 🔹 Badge style
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

// 🔹 Avatar Loader
const AvatarLoader = () => {
  return <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />;
};

const Navbar = () => {
  const { state } = useReadFuc();
  const { state: user } = useCurrUserFuc();
  const { state: arrayUser } = useAddFriendFuc();

  const adminName = filter_for_UserName(arrayUser, user) || null;

  const add_Array_Ntf = filter_Show_For_Notification(state);

  return (
    <header className="bg-white shadow p-3 flex justify-between items-center sticky top-0 z-50">
      {/* LEFT */}
      <div className="flex items-center space-x-4">
        <h1 className="text-blue-600 font-bold text-2xl">MySocial</h1>
        <input
          type="text"
          placeholder="Search MySocial"
          className="px-3 py-2 border rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden md:block"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1 space-x-2">
        {/* HOME */}
        <Link
          href="/pages/home"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-xl"
        >
          🏠
        </Link>

        {/* FRIENDS */}
        <Link
          href="/pages/home/addFriend"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-xl"
        >
          👥
        </Link>

        {/* META */}
        <Link
          href="/pages/home/homeMeta"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img
            className="w-10 h-6"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86kDWkquaiBSCj1nHaJTsCTNlVPH0GR4H2w&s"
            alt="meta"
          />
        </Link>

        {/* NOTIFICATION */}
        <Link href="/pages/home/notification">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-100">
            <Badge
              badgeContent={add_Array_Ntf?.length}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#1877F2",
                  color: "white",
                  fontSize: "11px",
                  height: "18px",
                  minWidth: "18px",
                },
              }}
            >
              <NotificationsIcon sx={{ fontSize: 22, color: "#050505" }} />
            </Badge>
          </div>
        </Link>

        {/* ADMIN */}
        <Link
          href="/pages/home/userProfile"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          {!adminName ? (
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-base">
              {adminName}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
