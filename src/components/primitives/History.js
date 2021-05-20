import React from 'react'
import styles from '../../styles/console.module.css'

function History(props) {
    const {visible, cmdHistory } = props
    return (
        <div>
            { visible && 
                <div className={styles.cmdHistory}>
                    <h2>Command History</h2>
                    <ul>
                        {cmdHistory.map((cmd) => (
                            <li key={Date.now()}>{cmd}</li>
                        ))}             
                    </ul>
                </div>
                }
        </div>
    )
}

export default History
