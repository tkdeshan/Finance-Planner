// menuItems.js

import {
  dashboard,
  expenses,
  transactions,
  trend,
  investments,
  savings,
  signup,
  signin,
} from "../utils/icons";

export const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/Dashboard",
  },

  {
    id: 2,
    title: "Incomes",
    icon: trend,
    link: "/Incomes",
  },
  {
    id: 3,
    title: "Expenses",
    icon: expenses,
    link: "/Expenses",
  },
  {
    id: 4,
    title: "Investments",
    icon: investments,
    link: "/Investments",
  },
  {
    id: 5,
    title: "Savings",
    icon: savings,
    link: "/Savings",
  },
  // {
  //   id: 6,
  //   title: "Sign Up",
  //   icon: signup,
  //   link: "/signup",
  // },
  // {
  //   id: 7,
  //   title: "Sign In",
  //   icon: signin,
  //   link: "/signin",
  // },
];
