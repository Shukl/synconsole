import React, { Component } from 'react'
import styles from '../../styles/autosuggest.module.css'
import chev from '../../static/cursor.png'

class SyntaxComplete extends Component {
    constructor(props) {
        super(props)
        this.textAreaRef = React.createRef()
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ''
        }
    }
    
    onChange = e => {
        const element = e.nativeEvent.srcElement
        element.height = element.scrollHeight + 'px'

        const { pool } = this.props
        const userInput = e.currentTarget.value
      
        const filteredSuggestions = pool.filter(
          suggestion =>
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
            })
      }

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        })
    }

    onKeyDown = e => {
        const {parse} = this.props
        const { activeSuggestion, filteredSuggestions, showSuggestions, userInput } = this.state
        if (e.keyCode === 13) {
            this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion]
            }, () => {
                parse(JSON.stringify(userInput)) 
            })
        } else if (e.keyCode === 38) {
          if (activeSuggestion === 0) {
            return
          }
          this.setState({ activeSuggestion: activeSuggestion - 1 })
        }
        else if (e.keyCode === 40) {
          if (activeSuggestion - 1 === filteredSuggestions.length) {
            return
          }
          this.setState({ activeSuggestion: activeSuggestion + 1 })
        }
      }


    componentDidMount() {
        console.log('executed', this.props.postEx)
        this.props.postEx && this.setState({userInput:''})
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this
        let suggestions

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
              )
            :
              suggestions = (
                <></>
              )
          

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
                        ref = {this.textAreaRef}
                        autoFocus
                    />
                    {suggestions}
                </div>
            </>
        )
    }
}

export default SyntaxComplete
