import React from 'react'
import styles from '../../styles/console.module.css'

function History({visible, cmdHistory }) {
    return (
        <>
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
        </>
    )
}

export default History
