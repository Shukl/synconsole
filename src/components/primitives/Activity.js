import React from 'react'
import styles from '../../styles/console.module.css'

function Activity(props) {
    const {visible, activity} = props
    return (
        <div>
            {visible &&
                    <div>
                        {activity.map( (action) => (
                            <>
                                <p className={styles.historicalInput}> {">"} {action.i}</p>
                                { action.e === true ? <p className={styles.historicalOutputError}>{'<*'} {action.o}</p>
                                : <p className={styles.historicalOutput}>{'<*'} {action.o}</p>
                                } 
                            </>
                        ))}
                    </div>
                }
        </div>
    )
}

export default Activity
