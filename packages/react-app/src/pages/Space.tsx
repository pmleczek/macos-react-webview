import { SidebarLayout } from '@layouts';
import { useParams } from 'react-router';

const Space = () => {
  const { id } = useParams();

  return (
    <SidebarLayout>
      <span>Spaces &gt; {id}</span>
    </SidebarLayout>
  );
};

export default Space;
