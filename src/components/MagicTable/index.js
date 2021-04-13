import React from 'react';

// STYLES
import styles from '../../styles/css/components/MagicTable.module.css';

const MagicTable = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MagicTable;
