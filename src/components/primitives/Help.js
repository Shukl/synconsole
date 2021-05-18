import React from 'react'
import styles from '../../styles/console.module.css'
function Help(props) {
    const {visible, commands} = props
    return (
        <div className={styles.help}>
            <h1>
                Synconsole
            </h1>
            <p>Type :help to view the full list of commands.</p>
            <p>{process.env.REACT_APP_NAME} - version: {process.env.REACT_APP_VERSION}</p>
            { visible && 
                    <div className={styles.cmdHelp}>
                        <h2>Help</h2>
                        <p>Here's a list of internal commands -</p>
                        <ul>
                            {commands.map((helpItem) => (
                                <li key={helpItem.id}>{helpItem.value} - {helpItem.description}</li>
                            ))}             
                        </ul>
                    </div>
                }

        </div>
    )
}

export default Help
