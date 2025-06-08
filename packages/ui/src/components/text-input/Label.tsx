import styles from './textinput.module.css';
import type { TextInputLabelProps } from './types';

const Label = ({ htmlFor, text }: TextInputLabelProps) => {
  return (
    <label className={styles.label} htmlFor={htmlFor}>
      {text}
    </label>
  );
};

export default Label;
