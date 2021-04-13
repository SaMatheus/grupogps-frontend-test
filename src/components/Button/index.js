import React from 'react';

// STYLES
import styles from '../../styles/css/components/Button/Button.module.css';

const Button = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Button;
