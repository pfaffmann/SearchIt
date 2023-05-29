import { Home } from './components/Home';
import Search from './components/Search';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },

  {
    path: '/search',
    element: <Search />,
  },
];

export default AppRoutes;
