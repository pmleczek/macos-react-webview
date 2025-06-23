import { hide, quit, show } from './controls';
import { getPropertyAsync } from './properties';
import { getThemeAsync, setThemeAsync } from './theme';

const application = {
  getThemeAsync,
  setThemeAsync,
  getPropertyAsync,
  hide,
  show,
  quit,
};

export default application;
