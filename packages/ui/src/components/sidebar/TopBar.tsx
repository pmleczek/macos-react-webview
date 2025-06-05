import { useNavigate } from 'react-router';

import Button from '../button';
import styles from './sidebar.module.css';

const TopBar = () => {
  const navigate = useNavigate();

  const canGoBack = window.history.length > 1 && window.history.state.idx !== 0;
  const canGoForward = window.history.state.idx < window.history.length - 1;

  return (
    <div className={styles.drag_area}>
      <Button.Icon
        className={styles.drag_area_button}
        disabled={!canGoBack}
        icon="arrow_left"
        iconProps={{ size: 16 }}
        onClick={() => navigate(-1)}
      />
      <Button.Icon
        className={styles.drag_area_button}
        disabled={!canGoForward}
        icon="arrow_right"
        iconProps={{ size: 16 }}
        onClick={() => navigate(1)}
      />
    </div>
  );
};

export default TopBar;
