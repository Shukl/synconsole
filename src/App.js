import './App.css';
import CommandInput from './components/primitives/CommandInput';
import styles from  './styles/interface.module.css'

function App() {
  return (
    <>
      <div className={styles.consoleParent}>
        <div className="Input"> 
          <CommandInput />
        </div>
      </div>
    </>
    
  );
}

export default App;
