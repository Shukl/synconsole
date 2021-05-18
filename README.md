# Motivation and Research

## Using a JS Engine with a Backe
I tried to understand what the best way is to interpret the code I am going to write on this front end console. I know that the browser has a built in engine that can help me interpret and execute JS commands easily. I know that I can output values to this console from browser HTML. However I do not know how to have that console accept other commands I will send it. I knew that Node.js is a great environment as it will allow me to interpret and execute JS without much work. However to get it to do this and use a system to create that to and fro between the backend and front end seemed to be a bit much for such an exercise. 

## What should be the SoW?
I was wondering if I should deal with the overhead of adding a Node.js backend to deal with executing commands etc. However I decided to keep it relatively simple and try to do as much of this on the front end as possible. In that journey, I went over several possible solutions to this, including building a CLI with a node backend and building out a simple API to move commands to and fro using a community package or something similar. However it seemed overkill. The options are endless to be honest. There's piggybacking off a CLI tool for Node or using a compiler or an interpreter that is available for everything from vanilla JS to ES2020. 

I've instead decided to piggy back off this repo 
https://github.com/NeilFraser/JS-Interpreter which is also available as an NPM package as https://www.npmjs.com/package/js-interpreter

This takes away my concern for the backend entirely so i can focus on completing this task where i'm emulating as best as possible something which is a subset of the reference item I have been prescribed to look at https://jsconsole.com/