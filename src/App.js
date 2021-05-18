import './App.css';
import CmdInput from './components/primitives/CmdInput';
import styles from  './styles/interface.module.css'

function App() {
  return (
    <>
      <div className={styles.consoleParent}>
        <div className="Input"> 
          <CmdInput />
        </div>
      </div>
    </>
    
  );
}

export default App;
