import { SidebarLayout } from '@layouts';
import { Breadcrumbs, MenuBar } from 'ui';

const Home = () => {
  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="🏠 Home" to="/" />
          </Breadcrumbs>
        }
      />
    </SidebarLayout>
  );
};

export default Home;
