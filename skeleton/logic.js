// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
  // todoFunctions.generateId() will give you a unique id
  // You do not need to understand the implementation of this function.
  generateId: (function() {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),

  //cloneArrayOfObjects will create a copy of the todos array
  //changes to the new array don't affect the original
  cloneArrayOfObjects: function(todos) {
    let newObj = [{}];
    if (todos == null) return newObj;
    return todos.map(function(todo) {
      return JSON.parse(JSON.stringify(todo));
    });
  },

  addTodo: function(todos, newTodo) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // returns a new array, it should contain todos with the newTodo added to the end.
    // add an id to the newTodo. You can use the generateId function to create an id.
    // hint: array.concat
    let clonedNewTodo = JSON.parse(JSON.stringify(newTodo));
    clonedNewTodo.id = this.generateId();
    clonedNewTodo.done = false;
    let clonedTodos = this.cloneArrayOfObjects(todos);
    window.localStorage.setItem(
      "userTodoList",
      JSON.stringify(clonedTodos.concat(clonedNewTodo))
    );
    return clonedTodos.concat(clonedNewTodo);
  },
  deleteTodo: function(todos, idToDelete) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // return a new array, this should not contain any todo with an id of idToDelete
    // hint: array.filter
    window.localStorage.setItem(
      "userTodoList",
      JSON.stringify(todos.filter(object => object.id !== idToDelete))
    );

    return todos.filter(object => object.id !== idToDelete);
  },
  markTodo: function(todos, idToMark) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // in the new todo array, all elements will remain unchanged except the one with id: idToMark
    // this element will have its done value toggled
    // hint: array.map
    return todos.reduce(function(updatedTodos, currentTodo) {
      if (currentTodo.id === idToMark) {
        if (!currentTodo.done) currentTodo.done = true;
        else currentTodo.done = false;
      }
      window.localStorage.setItem(
        "userTodoList",
        JSON.stringify(updatedTodos.concat(currentTodo))
      );
      return updatedTodos.concat(currentTodo);
    }, []);
  },
  sortTodos: function(todos, filterString) {
    // stretch goal! Do this last
    // should leave the input arguement todos unchanged (you can use cloneArrayOfObjects)
    // sortFunction will have same signature as the sort function in array.sort
    // hint: array.slice, array.sort

    doneTodos = todos.filter(todo => todo.done === true);
    notDoneTodos = todos.filter(todo => todo.done === false);
    originalTodos = todos.reverse();
    return filterString === "done"
      ? doneTodos
      : filterString === "notDone"
      ? notDoneTodos
      : originalTodos;
  },
  editTodo: function(todos, idToEdit, newName, newDesc) {
    let clonedTodos = this.cloneArrayOfObjects(todos);
    return clonedTodos.reduce(function(todosAcc, currentTodo) {
      if (currentTodo.id == idToEdit) {
        currentTodo.name = newName;
        currentTodo.desc = newDesc;
      }
      window.localStorage.setItem(
        "userTodoList",
        JSON.stringify(todosAcc.concat(currentTodo))
      );
      return todosAcc.concat(currentTodo);
    }, []);
  },
  todoObj: function(todos, id) {
    return todos.filter(object => object.id === id);
  }
};

// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details:
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== "undefined") {
  module.exports = todoFunctions;
}
