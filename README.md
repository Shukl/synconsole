# Motivation and Research

## Naive Approach
I tried to understand what the best way is to interpret the code I am going to write on this front end console. I know that the browser has a built in engine that can help me interpret and execute JS commands easily. I know that I can output values to this console from browser HTML. However I do not know how to have that console accept other commands I will send it. I knew that Node.js is a great environment as it will allow me to interpret and execute JS without much work. However to get it to do this and use a system to create that to and fro between the backend and front end seemed to be a bit much for such an exercise. 

Still, I was wondering if I should deal with the overhead of adding a Node.js backend to deal with executing commands etc. I decided to keep it relatively simple and try to do as much of this on the front end as possible. In that journey, I went over several possible solutions to this, including building a CLI with a node backend and building out a simple API to move commands to and fro using a community package or something similar. However it seemed overkill. The options are endless to be honest. There's piggybacking off a CLI tool for Node or using a transpiler or a plain interpreter that is available for everything ECMA present down to ES5. Very quickly and after having gone through the JsConsole codebase a bit, I learnt that the core of this app in terms of piggybacking on an API to interpret and evaluate was the eval fn available in the window object.

Once I discovered this (and it took two sittings to arrive at this simple hack), I starting hacking on the react front end. I went ahead with the naive approach yet again, using a mix of class/functional components and making state changes as and where required to the point where I had to choose between integrating redux or converting everything to more elegant functional components and breaking down state changes into neater individual mutation calls which react will manage for me. Within some time I chose to not take the additional overhead of the common store and just power through with functional components and trim the fat. I also realised that I was making way too many re-renders so memos would definitely help with that. All that said, I still had the Interpreter part to take care of in a substantial way.

## TODOs
* Better interpreter - boilerplate acorn + eval was not sufficient at all.
* Empty console behaviour - Arrow up Down on empty console shows past commands
* Better pre-parsing to handle console.log etc.


## Evolution
As I read a bit more about ASTs and how compilers/transpilers work, the limitations of my current approach became abundantly clear. Hence as a last ditch effort, given the Thursday time limit I have assumed for this, I have put together a new branch called 'acorn' that explores a deeper traversal, interpretation and as a result, a slightly better final implementation for a modern JS interpeter. However, I have a limited set of functionality in one branch and a limited set in the other branch. As part of discussion we can talk a little about both of these branches and what makes them different. 

## Known Limitations and Bugs
* After the first command executes on the terminal a leading '\n' is added to the textarea even in null state. This is caused by erroneous or improper state handling. This does not affect parsing of statement/expression but it does break autocomplete. To use autocomplete get rid of the leading '\n' and empty the console manually.
* up and down arrow keys should show last commands from the activity constant which records these. However, this hasn't been implemented so these do not work.
* Pressing return on the autocomplete list item of your choice changes userInput but additionally also parses and executes the line as is. This is erroneous. Ideal behavior will allow your cursor to return to the textarea and execute command manually.
* Tab does not complete your partial userInput as per active suggestion. However this would have been a better implementation than the return key perhaps.


## Screenshots
![Console 1](./screenshots/empty.png?raw=true "Empty Console")
![Console 2](./screenshots/autocomplete.png?raw=true "Auto Complete")
![Console 3](./screenshots/fn.png?raw=true "Executing Function")



## RUN
Nothing complex
```npm install```
```npm start```
should suffice
