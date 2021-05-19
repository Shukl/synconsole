import React, { Component } from 'react'
import Interpreter from 'js-interpreter'
import styles from '../../styles/console.module.css'
import Autocomplete from './Autocomplete'
import jsCommands from '../lib/jsCommands'
import internalCommands from '../lib/internalCommands'
import Help from './Help'
import History from './History'
import Activity from './Activity'
var acorn = require('acorn')

class CmdInput extends Component {
    constructor(props) {
        super(props)
        this.textAreaRef = React.createRef()
        this.state = {
             internalCommands: internalCommands,
             activity: [],
             commands: [],
             response: [],
             value: '',
             result: '',
             error: '',
             helpVisible: false,
             activityVisible: true,
             historyVisible: false,
             acChosen: false,
             allCommands: jsCommands
        }
    }
    
    componentDidMount() {
        this.textAreaRef.current.focus()
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
        console.log(JSON.stringify(e.target.value))
        this.setState({value: e.target.value})
    }

    // Checks for enter/return key to interpret and record the commands
    onKeyPress = (e) => {
        // check for Enter+Shift for line break; check for Enter to interpret if value is non-null
        !(e.key === 'Enter' && e.shiftKey) && e.key === 'Enter' && this.parse();
    }

    parse = () => {
        let { value, activity, commands } = this.state
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
                        activity: [...activity, {'i': value, 'o': interpreted, 'e': false}],
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
    }




    // Autocomplete choice handler
    choiceHandler = (choice) => {
        this.setState({
            value: choice,
            acChosen: true
        })
        this.textAreaRef.current.focus()
        this.textAreaRef.current.selectionStart = 0
    }

    render() {
        const { commands, 
            internalCommands, 
            activity, 
            historyVisible, 
            activityVisible,
            value, 
            helpVisible, 
            acChosen,
            allCommands
            } = this.state
            // Could have used single presentational component for help/history/activity.
        return (
            <>  
                <Help visible={helpVisible} commands={internalCommands}/>
                <History visible={historyVisible} cmdHistory={commands}/>
                <Activity visible={activityVisible} activity={activity}/>

                <textarea 
                    value = {value}
                    className = {styles.typeArea}
                    onChange = {this.onChange}
                    ref = {this.textAreaRef}
                    onKeyDown = {this.onKeyPress}
                />
                <Autocomplete 
                    input = {value}
                    choiceHandler = {this.choiceHandler}
                    choiceMade = {acChosen}
                    allCommands = {allCommands}
                />
            </>
        )
    }
}

export default CmdInput
