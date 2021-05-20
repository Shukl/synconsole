import React, {useState, useEffect} from 'react'
import styles from '../../styles/autosuggest.module.css'
import chev from '../../static/cursor.png'

function Autocomplete({pool, parse, activity}) {
    const textAreaRef = React.createRef()
    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [userActivity, setUserActivity] = useState(activity)

    let suggestions

    useEffect(() => {
        JSON.stringify(userInput) === '\n' && setUserInput('')
        return () => {
            console.log(JSON.stringify(userInput))
        }
    })

    const onChange = e => {
        e.nativeEvent.srcElement.style.height = e.nativeEvent.srcElement.scrollHeight + 'px'
        const userInput = e.target.value
        const filteredSuggestions = pool.filter(
          suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )
        console.log(filteredSuggestions)
        setActiveSuggestion(0)
        setFilteredSuggestions(filteredSuggestions)
        setShowSuggestions(true)
        setUserInput(e.target.value)
        textAreaRef.current.focus()
    }

    const onClick = e => {
        setActiveSuggestion(0)
        setFilteredSuggestions([])
        setShowSuggestions(false)
        setUserInput(e.currentTarget.innerText)
    }

    const sendParse = val => {
        console.log(JSON.stringify(val), JSON.stringify(userInput));
        val ? parse(val) : parse(userInput)
        setUserInput('')
    }

    const onKeyDown = e => {
        switch (e.keyCode) {
            case 13:
                setUserInput(filteredSuggestions[activeSuggestion])
                sendParse(filteredSuggestions[activeSuggestion])
                setActiveSuggestion(0)
                setShowSuggestions(false)
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
        <li className={styles.alignRight}>Use ⇧⇩⏎ or 🐭</li>
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
                <row>
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
                </row>
                <row>
                    {suggestions}
                </row>
            </div>
        </>
    )
}

export default Autocomplete
