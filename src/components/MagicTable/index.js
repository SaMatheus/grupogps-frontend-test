import React from 'react';

// STYLES
import styles from '../../styles/css/components/MagicTable/MagicTable.module.css';

const MagicTable = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.illumination}></div>
      <div className={styles.table}>
        <div className={styles.tableBorder1}></div>
        {children}
      </div>
    </div>
  );
};

export default MagicTable;
