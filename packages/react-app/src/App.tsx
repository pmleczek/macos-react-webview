import 'ui/dist/index.css';

import { Menu } from '@components/context-menu';
import RootProvider from '@utils/providers';
import rootRouter from '@utils/routing';
import { RouterProvider } from 'react-router';

const App = () => {
  return (
    <RootProvider>
      <RouterProvider router={rootRouter} />
      <Menu />
    </RootProvider>
  );
};

export default App;
