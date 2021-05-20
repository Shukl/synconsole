import React, {useState } from "react";

import { Activity, Help, History, AutoComplete } from "./"
import { jsCommands, internalCommands } from "../lib"

const acorn = require("acorn")

function CommandInput(){
  const [activity, setActivity] = useState([])
  const [commands, setCommands] = useState([])
  const [value, setValue] = useState("")
  const [helpVisible, setHelpVisible] = useState(false)
  const [activityVisible, setActivityVisible] = useState(false)
  const [historyVisible, setHistoryVisible] = useState(false)
  const [allCommands, setAllCommands] = useState(jsCommands)


    const parseInternalCommands = (command) => {
        switch (command) {
        case ":help":
            setHelpVisible(true)
            setHistoryVisible(false)
            break
        case ":clear":
            setActivityVisible(false)
            setHelpVisible(false)
            setHistoryVisible(false)
            break
        case ":history":
            setActivityVisible(false)
            setHelpVisible(false)
            setHistoryVisible(true)
            break
        default:
            // setResult("undefined")
            setActivity([
            ...activity,
            { i: value, o: "Invalid Internal Command", e: true },
            ])
            setHistoryVisible(false)
            setActivityVisible(true)
            setHelpVisible(false)
        }
    }

    const parseByAcorn = (command) => {
        const root = acorn.parse(command, { ecmaVersion: 2020 })
        const body = root.body[0]
        console.log("BODY", body)
        let text
        if (body.type === "ExpressionStatement") {
        text = `${body.expression.name}`
        } else if (
        body.type === "VariableDeclaration" &&
        (body.kind === "const" || body.kind === "let")
        ) {
        text = `${body.kind} ${body.declarations[0].id.name} = ${body.declarations[0].init.raw}`
        }
        console.log("TEXT", text)
        return text
    }

    const parse = (value) => {
        setCommands([...commands, value])
        setValue("")
        if (value.startsWith(":")) {
        parseInternalCommands(value)
        } else {
        setHistoryVisible(false)
        setActivityVisible(true)
        setHelpVisible(false)
        try {
            // This needs to be fixed
            const interpreted = parseByAcorn(value)
            console.log("INTERPRETED", interpreted)
            const executed = window.eval(value)
            console.log("EXECUTED", executed)
            setActivity([
            ...activity,
            { i: value, o: executed ?? "undefined", e: false },
            ])
        } catch (err) {
            setActivity([
            ...activity,
            { i: value, o: `${err.name}: ${err.message}`, e: true },
            ])
        }
        }
    }



  // Could have used single presentational component for help/history/activity.
  return (
    <>
      <Help visible={helpVisible} commands={internalCommands} />
      <History visible={historyVisible} cmdHistory={commands} />
      <Activity visible={activityVisible} activity={activity} />
      <AutoComplete pool={allCommands} parse={parse} activity={activity}/>
    </>
  )
}

export default CommandInput