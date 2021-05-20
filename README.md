# Motivation and Research

## Naive Approach
I tried to understand what the best way is to interpret the code I am going to write on this front end console. I know that the browser has a built in engine that can help me interpret and execute JS commands easily. I know that I can output values to this console from browser HTML. However I do not know how to have that console accept other commands I will send it. I knew that Node.js is a great environment as it will allow me to interpret and execute JS without much work. However to get it to do this and use a system to create that to and fro between the backend and front end seemed to be a bit much for such an exercise. 

I was wondering if I should deal with the overhead of adding a Node.js backend to deal with executing commands etc. However I decided to keep it relatively simple and try to do as much of this on the front end as possible. In that journey, I went over several possible solutions to this, including building a CLI with a node backend and building out a simple API to move commands to and fro using a community package or something similar. However it seemed overkill. The options are endless to be honest. There's piggybacking off a CLI tool for Node or using a transpiler or a plain interpreter that is available for everything ECMA present down to ES5. Very quickly and after having gone through the JsConsole codebase a bit, I learnt that the core of this app in terms of piggybacking on an API to interpret and evaluate was the eval fn available in the window object.

Once I discovered this (and it took two sittings to arrive at this simple hack), I starting hacking on the react front end. I went ahead with the naive approach yet again, using a mix of class/functional components and making state changes as and where required to the point where I had to choose between integrating redux or converting everything to more elegant functional components and breaking down state changes into neater individual mutation calls which react with manage for me. Within some time I chose to not take the additional overhead of the common store and just power through with functional components and trim the fat. I also realised that I was making way too many re-renders so memos would definitely help with that. All that said, I still had the Interpreter part to take care of in a substantial way.

## TODOs
* Better interpreter - I realise perhaps that I should have used babel instead of acorn for my AST generation.
* Latest support - at the moment const/let etc. don't seem to be working
* Empty console behaviour - Arrow up Down on empty console shows past commands
* Better pre-parsing to handle console.log etc.


## RUN
Nothing complex
```npm install
npm start```
should suffice