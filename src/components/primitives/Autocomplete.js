import React, {useState, useEffect} from 'react'
import styles from '../../styles/autosuggest.module.css'
import chev from '../../static/cursor.png'

function Autocomplete({pool, parse, activity}) {
    const textAreaRef = React.createRef()
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')

    let suggestions

    const onChange = e => {
        console.log(e.target)
        const element = e.nativeEvent.srcElement
        element.height = element.scrollHeight + 'px'

        const userInput = e.target.value
        const filteredSuggestions = pool.filter(
          suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )

        setActiveSuggestion(0)
        setFilteredSuggestions(filteredSuggestions)
        setShowSuggestions(true)
        setUserInput(e.target.value)
    }

    const onClick = e => {
        setActiveSuggestion(0)
        setFilteredSuggestions([])
        setShowSuggestions(false)
        setUserInput(e.currentTarget.innerText)
    }

    const onKeyDown = e => {
        switch (e.keyCode) {
            case 13:
                setActiveSuggestion(0)
                setShowSuggestions(false)
                setUserInput(filteredSuggestions[activeSuggestion])
                break
            case 38:
                if (activeSuggestion === 0){
                    break
                } else { 
                    setActiveSuggestion(activeSuggestion-1)
                }
                break
            case 40:
                if (activeSuggestion-1 === filteredSuggestions.length) {
                    break
                } else {
                    setActiveSuggestion(activeSuggestion+1)
                }
                break
            default:
                break
        }
    }

    (showSuggestions && userInput) &&
    filteredSuggestions.length ?
    suggestions = (
    <ul className={styles.suggestions}>
        {filteredSuggestions.map((suggestion, index) => {
        return (
            <li className={index===activeSuggestion ? styles.activeChoice : ''} key={suggestion} onClick={onClick}>
            {suggestion}
            </li>
        )
        })}
    </ul>
    ) :
    suggestions = (<></>)

    return (
        <>
            <hr className={styles.typeAreaSeparator}/>
            <div className={styles.prompt}>
                <div className={styles.cursorInput}>
                    <img src={chev} alt={'chev'} className={styles.cursorInputImg}/></div>
                <textarea 
                    type="text"
                    value = {userInput}
                    className = {styles.typeArea}
                    onChange = {onChange}
                    onKeyDown = {onKeyDown}
                    ref = {textAreaRef}
                    autoFocus
                />
                {suggestions}
            </div>
        </>
    )
}

export default Autocomplete
