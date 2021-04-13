import React from 'react';

// STYLES
import styles from '../../styles/css/pages/Home/Home.module.css';

// ROUTER
import { useHistory } from 'react-router-dom';

// COMPONENTS
import MagicTable from '../../components/MagicTable';
import Button from '../../components/Button';

const Home = () => {
  const history = useHistory();

  const handleSelectMindReader = () => {
    history.push('/magic');
  };

  const handleSelectOtherMagic = () => {
    history.push('/othermagic');
  };
  return (
    <MagicTable>
      <div className={styles.content}>
        <h1>Selecione a magica que deseja participar:</h1>
        <ul>
          <li>
            <Button onClick={handleSelectMindReader}>Leitor de Mentes</Button>
          </li>
          <li>
            <Button onClick={handleSelectOtherMagic}>Outras magicas</Button>
          </li>
        </ul>
      </div>
    </MagicTable>
  );
};

export default Home;
