class Interpreter {
    constructor(visitor) {
      this.visitor = visitor;
    }
  
    interpret(nodes) {
      return this.visitor.run(nodes);
    }
  }
  
  export default Interpreter;