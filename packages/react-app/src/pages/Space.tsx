import { fetchSpaces } from '@data/query';
import { SidebarLayout } from '@layouts';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { Breadcrumbs, MenuBar } from 'ui';

const Space = () => {
  const { slug } = useParams();

  const { data } = useQuery({
    queryKey: ['spaces'],
    queryFn: fetchSpaces,
  });
  const space = data?.find((item) => item.slug === slug);

  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          space ? (
            <Breadcrumbs>
              <Breadcrumbs.Link label="Spaces" to="/spaces" />
              <Breadcrumbs.Separator />
              <Breadcrumbs.Link
                label={`${space.emoji} ${space.title}`}
                to={`/spaces/${slug}`}
              />
            </Breadcrumbs>
          ) : null
        }
      />
    </SidebarLayout>
  );
};

export default Space;
