export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "All Books",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/borrow-records",
    text: "Borrow Records",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
];

export const FIELD_NAMES = {
  fullName: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "number",
  password: "password",
};

export const sorts = [
  {
    value: "oldest",
    label: "Oldest",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "available",
    label: "Available",
  },
  {
    value: "highestRated",
    label: "Highest Rated",
  },
];

export const userRoles = [
  {
    value: "user",
    label: "User",
    bgColor: "#FDF2FA",
    textColor: "#C11574",
  },
  {
    value: "admin",
    label: "Admin",
    bgColor: "#ECFDF3",
    textColor: "#027A48",
  },
];

export const borrowStatuses = [
  {
    value: "overdue",
    label: "Overdue",
    bgColor: "#FFF1F3",
    textColor: "#C01048",
  },
  {
    value: "borrowed",
    label: "Borrowed",
    bgColor: "#F9F5FF",
    textColor: "#6941C6",
  },
  {
    value: "returned",
    label: "Returned",
    bgColor: "#F0F9FF",
    textColor: "#026AA2",
  },
];
