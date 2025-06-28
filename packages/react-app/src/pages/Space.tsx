import { fetchSpaces } from '@data/query';
import { hideSidebarAtom } from '@state/atoms';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useParams } from 'react-router';
import { Breadcrumbs, MenuBar } from 'ui';

const Space = () => {
  const [hideSidebar, setHideSidebar] = useAtom(hideSidebarAtom);

  const { slug } = useParams();

  const { data } = useQuery({
    queryKey: ['spaces'],
    queryFn: fetchSpaces,
  });
  const space = data?.find((item) => item.slug === slug);

  return (
    <>
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
        onToggleSidebar={() => setHideSidebar((prev) => !prev)}
        sideBarHidden={hideSidebar}
        sideBarToggle
      />
    </>
  );
};

export default Space;
