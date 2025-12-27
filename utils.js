"use client";
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const filter = (data, UserId) =>
  data.filter(
    (item) =>
      item.UserId !== UserId &&
      item.usersFriend?.every((user) => user.receiverId !== UserId)
  );

export const filter_User_For_Notification = (data, UserId) =>
  data.filter((item) => item.UserId === UserId);

export const filter_Show_For_Notification = (n) => {
  const [c, l, u] = n;

  const unReadLikeFilter = c?.filter((cm) => cm?.read === false) || [];
  const unReadCommentFilter = l?.filter((li) => li?.read === false) || [];
  const unReadUserFriendFilter = u?.filter((uF) => uF?.read === false) || [];

  const all_Array_For_Notification = [
    ...unReadCommentFilter,
    ...unReadLikeFilter,
    ...unReadUserFriendFilter,
  ].flat();

  return all_Array_For_Notification;
};

export const filterUserForUserName = (data, userId) => {
  const user = data?.find((item) => item?.UserId === userId);
  return user?.userDetails[0]?.name;
};
//--------------------------- Filter_for_UserProfile_page===============

export const filter_for_UserProfile_page = (data, userId) => {
  const userArray = data?.find((item) => item?.UserId === userId);
  return userArray;
};

export const filter_for_UserName = (data, userId) => {
  const userArray = data?.find((item) => item?.UserId === userId);
  return userArray?.userDetails[0]?.name?.charAt(0)?.toUpperCase();
};
export const nameUpperCase = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// export const friendNameFuc = (data, userFriend) => {
//   const userArray = data?.find((item) => item?.UserId !== userFriend);
//   return userArray;
// };
