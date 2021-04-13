import React from 'react';

// STYLES
import styles from '../../styles/css/pages/Home/Home.module.css';

// COMPONENTS
import MagicTable from '../../components/MagicTable';
import Button from '../../components/Button';

const Home = () => {
  return (
    <MagicTable>
      <div className={styles.content}>
        <h1>Selecione a magica que deseja participar:</h1>
        <ul>
          <li>
            <Button>Leitor de Mentes</Button>
          </li>
          <li>
            <Button>Outras magicas</Button>
          </li>
        </ul>
      </div>
    </MagicTable>
  );
};

export default Home;
