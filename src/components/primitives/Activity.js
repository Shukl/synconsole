import React from 'react'
import styles from '../../styles/console.module.css'

function Activity({visible, activity}) {
    return visible ? (
            <div>
                {activity.map( (action, i) => (
                        <span key={i}>
                            <p className={styles.historicalInput}> {">"} {action.i}</p>
                            { action.e === true ? <p className={styles.historicalOutputError}>{'<*'} {action.o}</p>
                            : <p className={styles.historicalOutput}>{'<*'} {action.o}</p>
                            } 
                        </span>
                ))}
            </div>
    ) : <></>
}

export default React.memo(Activity)
