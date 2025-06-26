import { SidebarLayout } from '@layouts';
import { Breadcrumbs, MenuBar } from 'ui';

const Settings = () => {
  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="⚙️ Settings" to="/settings" />
          </Breadcrumbs>
        }
      />
    </SidebarLayout>
  );
};

export default Settings;
