import React from 'react';

// STYLES
import styles from '../../styles/css/components/Button/Button.module.css';

const Button = (props) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Button;
