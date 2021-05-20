import React, { Component } from 'react'
import jsCommands from '../lib/jsCommands'
import internalCommands from '../lib/internalCommands'
import Help from './Help'
import History from './History'
import Activity from './Activity'
import SyntaxComplete from './SyntaxComplete'
var acorn = require('acorn')

class CmdInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
             internalCommands: internalCommands,
             activity: [],
             commands: [],
             response: [],
             value: '',
             result: '',
             error: '',
             postEx: false,
             helpVisible: false,
             activityVisible: true,
             historyVisible: false,
             allCommands: jsCommands,
        }
    }
    
    componentDidMount() {
        // this.textAreaRef.current.focus()
        this.setState({
            postEx: false
        })
    }

    //auto adjusts the number of rows on the textarea element to ensure there is no text overflow.  
    changeTextArea = (ta) => {
        // ta.style.height = "auto"
        ta.style.height = ta.scrollHeight + 'px'
    }


    // keep track of value and keep adjusting the textarea size.
    onChange = (e) => {
        this.changeTextArea(e.target);
        (e.target.value === '\n') && (e.target.value = '')
        this.setState({value: e.target.value})
    }


    parse = (v) => {
        let { activity, commands } = this.state
        console.log('inside parser', v)
        const value = JSON.parse(v)
        console.log('parser', value)
        // let trimmedVal = value.trim()
        if (value === ':help' || value === ':clear' || value === ':history') {
            switch (value) {
                case ':help':
                    this.setState({helpVisible: true,
                        historyVisible: false,
                        commands: [...commands, value],
                        value: '',
                    })
                    break;
                case ':clear':
                    this.setState({activityVisible: false,
                        helpVisible: false,
                        historyVisible: false,
                        commands: [...commands, value],
                        value: '',
                    })
                    break;
                case ':history':
                    this.setState({historyVisible: true,
                        activityVisible: false,
                        helpVisible: false,
                        commands: [...commands, value],
                        value: '',
                    })
                    break;
                default:
                    this.setState({
                        result: 'undefined',
                        commands: [...commands, value],
                        activity: [...activity, {'i': value, 'o': 'Invalid Internal Command', 'e':false}],
                        value: '',
                        acChosen: false,
                        historyVisible: false,
                        activityVisible: true,
                        helpVisible: false,
                    })
            }
        }
        else {
            try {
                console.log('preparse', JSON.stringify(value))
                // let trim = value.trim()
                
                const interpreted = acorn.parse(value, {ecmaVersion: 2020})
                console.log('inerpreted acorn', interpreted)
                let executed = window.eval(value)

                console.log('executed', executed)
                if (executed === undefined) {
                    this.setState({
                        result: 'undefined',
                        commands: [...commands, value],
                        activity: [...activity, {'i': value, 'o': 'undefined', 'e':false}],
                        value: '',
                        acChosen: false,
                        historyVisible: false,
                        activityVisible: true,
                        helpVisible: false,
                    })
                }
                else {
                    this.setState({
                        result: executed,
                        commands: [...commands, value],
                        activity: [...activity, {'i': value, 'o': executed, 'e': false}],
                        value: '',
                        acChosen: false,
                        historyVisible: false,
                        activityVisible: true,
                        helpVisible: false,
                    })
                }
            } catch (err) {
                console.log('error', err)
                console.log('err stringify', JSON.stringify(err))
                this.setState({
                    error: err,
                    commands: [...commands, value],
                    activity: [...activity, {'i': value, 'o': JSON.stringify(err), 'e':true}],
                    value: '',
                    acChosen: false,
                    historyVisible: false,
                    activityVisible: true,
                    helpVisible: false,
                })
            }
        } 
        this.setState({postEx: true})
    }




    // Autocomplete choice handler
    choiceHandler = (choice) => {
        choice && this.setState({
            value: choice,
            acChosen: true
        })
        this.textAreaRef.current.focus()
        this.textAreaRef.current.selectionStart = 0
    }

    render() {
        const { 
            state: {
                commands, 
                internalCommands, 
                activity, 
                historyVisible, 
                activityVisible,
                value, 
                postEx,
                helpVisible, 
                allCommands,
            }
        } = this
            // Could have used single presentational component for help/history/activity.
        return (
            <>  
                <Help visible={helpVisible} commands={internalCommands}/>
                <History visible={historyVisible} cmdHistory={commands}/>
                <Activity visible={activityVisible} activity={activity}/>
                <SyntaxComplete pool={allCommands} parse={this.parse} postEx={postEx}/>
            </>
        )
    }
}

export default CmdInput
