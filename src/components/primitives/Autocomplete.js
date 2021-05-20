// /$$$$$$$ /$$$$$$$$/$$$$$$$ /$$$$$$$ /$$$$$$$$ /$$$$$$  /$$$$$$ /$$$$$$$$/$$$$$$$$/$$$$$$$$/$$$$$$$ 
// | $$__  $| $$_____| $$__  $| $$__  $| $$_____//$$__  $$/$$__  $|__  $$__| $$_____| $$_____| $$__  $$
// | $$  \ $| $$     | $$  \ $| $$  \ $| $$     | $$  \__| $$  \ $$  | $$  | $$     | $$     | $$  \ $$
// | $$  | $| $$$$$  | $$$$$$$| $$$$$$$| $$$$$  | $$     | $$$$$$$$  | $$  | $$$$$  | $$$$$  | $$  | $$
// | $$  | $| $$__/  | $$____/| $$__  $| $$__/  | $$     | $$__  $$  | $$  | $$__/  | $$__/  | $$  | $$
// | $$  | $| $$     | $$     | $$  \ $| $$     | $$    $| $$  | $$  | $$  | $$     | $$     | $$  | $$
// | $$$$$$$| $$$$$$$| $$     | $$  | $| $$$$$$$|  $$$$$$| $$  | $$  | $$  | $$$$$$$| $$$$$$$| $$$$$$$/
// |_______/|________|__/     |__/  |__|________/\______/|__/  |__/  |__/  |________|________|_______/ 
                                                                                                    
// No longer using this as Autocomplete
// Required too many state changes, prop transfers and complexity by having to make constant state comparisons
// Instead i'm going to go the more tried and tested route of using a class component which combines both
// textarea and the suggestions div in one component.
                                                                                                    

import React from 'react'
import styles from '../../styles/autosuggest.module.css'

function Autocomplete(props) {
    const {input, choiceHandler, allCommands} = props


    let filteredSuggestions = allCommands.filter( suggestion => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        )
    let visible = input && allCommands ? true : false
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
                            {filteredSuggestions.map((option, i) => (
                                <li key={option} onClick={() => choiceHandler(option)}>{option}</li>
                            ))}
                        </ul>
                </div>)
         
        }
        </>
        
    )
}

export default Autocomplete
