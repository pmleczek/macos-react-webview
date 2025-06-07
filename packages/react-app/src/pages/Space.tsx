import { SidebarLayout } from '@layouts';
import { useParams } from 'react-router';
import { Breadcrumbs, MenuBar } from 'ui';

const Space = () => {
  const { id } = useParams();

  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="Spaces" to="/spaces" />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Link label="🌎 Default" to={`/spaces/${id}`} />
          </Breadcrumbs>
        }
      />
    </SidebarLayout>
  );
};

export default Space;
