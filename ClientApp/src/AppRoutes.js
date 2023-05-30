import Search from "./components/Search";
import SearchIncrement from "./components/SearchIncrement";

const AppRoutes = [
  {
    index: true,
    element: <Search />,
  },
  {
    path: "/increment",
    element: <SearchIncrement />,
  },
];

export default AppRoutes;
