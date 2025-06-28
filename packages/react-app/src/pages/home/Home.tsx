import { SidebarLayout } from '@layouts';
import { hideSidebarAtom } from '@state/atoms';
import { useAtom } from 'jotai';
import { Breadcrumbs, MenuBar } from 'ui';

const Home = () => {
  const [hideSidebar, setHideSidebar] = useAtom(hideSidebarAtom);

  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="🏠 Home" to="/" />
          </Breadcrumbs>
        }
        onToggleSidebar={() => setHideSidebar((prev) => !prev)}
        sideBarHidden={hideSidebar}
        sideBarToggle
      />
    </SidebarLayout>
  );
};

export default Home;
