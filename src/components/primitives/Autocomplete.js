import React from 'react'
import styles from '../../styles/autosuggest.module.css'

function Autocomplete(props) {
    const {input, choiceHandler, choiceMade, allCommands} = props
    let filteredSuggestions = allCommands.filter( suggestion => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        )
    let visible = input ? true : false
    // if nothing obtained from filter op then don't show the div at all.
    let filterEmpty = filteredSuggestions.length === 0 ? true : false
    // TODOS
    // Split at '.' to create deeper autocomplete.
    // Support for chained commands, partial autocomplete as opposed to total autocomplete.
    // keyboard interaction support - checking for esc/up/down and return - checking last key pressed only    

    return (
        <> 
        {
        visible &&
            !filterEmpty &&
                (<div className={styles.suggestions}>
                        <ul>
                            {filteredSuggestions.map((option) => (
                                <li key={option.id} onClick={() => choiceHandler(option)}>{option}</li>
                            ))}
                        </ul>
                </div>)
         
        }
        </>
        
    )
}

export default Autocomplete
