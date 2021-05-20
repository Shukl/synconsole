const ops = {
  ADD: "+",
  SUB: "-",
  MUL: "*",
  DIV: "/",
};

let globalScope = new Map();

class Visitor {
  visitVariableDeclaration(node) {
    return this.visitNodes(node.declarations);
  }

  visitVariableDeclarator(node) {
    const id = this.visitNode(node.id);
    const init = this.visitNode(node.init);
    globalScope.set(id, init);
    return init;
  }

  visitIdentifier(node) {
    const name = node.name;
    if (globalScope.get(name)) return globalScope.get(name);
    else return name;
  }

  visitLiteral(node) {
    return node.value;
  }

  visitBinaryExpression(node) {
    const leftNode = this.visitNode(node.left);
    const operator = node.operator;
    const rightNode = this.visitNode(node.right);
    switch (operator) {
      case ops.ADD:
        return leftNode + rightNode;
      case ops.SUB:
        return leftNode - rightNode;
      case ops.DIV:
        return leftNode / rightNode;
      case ops.MUL:
        return leftNode * rightNode;
      default:
        return null;
    }
  }

  evalArgs(nodeArgs) {
    let g = [];
    for (const nodeArg of nodeArgs) {
      g.push(this.visitNode(nodeArg));
    }
    return g;
  }

  visitCallExpression(node) {
    const type = node.expression.type;
    let result;
    switch (type) {
      case "Identifier":
        result = this.visitIdentifier(node.expression);
        break;
      case "Literal":
        result = this.visitLiteral(node.expression);
        break;
      case "BinaryExpression":
        result = this.visitBinaryExpression(node.expression);
        break;
      default:
        return null;
    }
    return result;
  }

  visitNodes(nodes) {
    let result;
    for (const node of nodes) {
      result = this.visitNode(node);
    }
    return result;
  }

  visitNode(node) {
    switch (node.type) {
      case "VariableDeclaration":
        return this.visitVariableDeclaration(node);
      case "VariableDeclarator":
        return this.visitVariableDeclarator(node);
      case "Literal":
        return this.visitLiteral(node);
      case "Identifier":
        return this.visitIdentifier(node);
      case "BinaryExpression":
        return this.visitBinaryExpression(node);
      case "ExpressionStatement":
        return this.visitCallExpression(node);
      default:
        return null;
    }
  }

  run(nodes) {
    return this.visitNodes(nodes);
  }
}

export default Visitor;