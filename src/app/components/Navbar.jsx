"use client";

import { styled } from "@mui/material/styles";
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

const Navbar = () => {
  const { state } = useReadFuc();
  const { state: user } = useCurrUserFuc();
  const { state: arrayUser } = useAddFriendFuc();

  const adminName = filter_for_UserName(arrayUser, user) || null;
  const add_Array_Ntf = filter_Show_For_Notification(state);

  return (
    <header className="bg-white shadow p-2 md:p-3 flex justify-between items-center sticky top-0 z-50">
      {/* LEFT: Logo + Search */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <h1 className="text-blue-600 font-bold text-lg md:text-2xl">
          MySocial
        </h1>

        {/* Search input: hide on small screens */}
        <input
          type="text"
          placeholder="Search MySocial"
          className="px-3 py-1 md:py-2 border rounded-full w-32 sm:w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 hidden sm:block"
        />
      </div>

      {/* RIGHT: Icons */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* HOME */}
        <Link
          href="/pages/home"
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-sm md:text-xl"
        >
          🏠
        </Link>

        {/* FRIENDS */}
        <Link
          href="/pages/home/addFriend"
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-sm md:text-xl"
        >
          👥
        </Link>

        {/* META */}
        <Link
          href="/pages/home/homeMeta"
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          <img
            className="w-6 h-4 md:w-10 md:h-6 object-contain"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86kDWkquaiBSCj1nHaJTsCTNlVPH0GR4H2w&s"
            alt="meta"
          />
        </Link>

        {/* NOTIFICATIONS */}
        <Link href="/pages/home/notification">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-blue-100 relative">
            <Badge
              badgeContent={add_Array_Ntf?.length}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#1877F2",
                  color: "white",
                  fontSize: "10px",
                  height: "16px",
                  minWidth: "16px",
                },
              }}
            >
              <NotificationsIcon sx={{ fontSize: 18, color: "#050505" }} />
            </Badge>
          </div>
        </Link>

        {/* ADMIN AVATAR */}
        <Link
          href="/pages/home/userProfile"
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
        >
          {!adminName ? (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 animate-pulse" />
          ) : (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xs md:text-base">
              {adminName}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
