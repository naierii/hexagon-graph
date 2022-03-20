import HexagonGraph from 'components/HexagonGraph';
import './App.css';
import styles from './App.module.scss'

import {GiArchiveResearch, GiPublicSpeaker, GiTeacher} from 'react-icons/gi'
import {FaPeopleCarry, FaTasks} from 'react-icons/fa'
import {DiGoogleAnalytics} from 'react-icons/di'

const test = {
  top:90,
  topRight: 100,
  bottomRight: 70,
  bottom:70,
  bottomLeft:33,
  topLeft:75,
  max:100,
}

function App() {
  return (
    <div className="App">
      <div id={styles.body}>
        <div id={styles.heroCont}>
          <div id={styles.personSection}>
            <img src="images/sample.jpg" alt="" />
            <span className={styles.sideGrad}/>
          </div>
          <div className={styles.hexagonExample}>
            <span className={styles.top}><GiTeacher className={styles.icon}/> Leadership</span>
            <span className={styles.topRight}><FaPeopleCarry className={styles.icon}/> Teamwork</span>
            <span className={styles.bottomRight}><GiPublicSpeaker className={styles.icon}/> Public<br/> Speaking</span>
            <span className={styles.bottom}><DiGoogleAnalytics className={styles.icon}/> Analytical</span>
            <span className={styles.bottomLeft}><FaTasks className={styles.icon}/> Multi-<br/>tasking</span>
            <span className={styles.topLeft}><GiArchiveResearch className={styles.icon}/> Research</span>
            <HexagonGraph data={test}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
