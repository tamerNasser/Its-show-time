// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");

  var state = [
    {
      id: -3,
      name: "first1",
      desc: "first todo",
      done: false
    },
    {
      id: -2,
      name: "second2",
      desc: "second todo",
      done: false
    },
    {
      id: -1,
      name: "third3",
      desc: "third todo",
      done: false
    }
  ]; // this is our initial todoList

  // This function takes a todo, it returns the DOM node representing that todo
  let createTodoNode = function(todo) {
    let todoNode = document.createElement("li");
    todoNode.className = "todo-items";

    let todoNameNode = document.createElement("h3");
    todoNameNode.className = "todo-name";
    let todoDescNode = document.createElement("p");
    todoDescNode.className = "todo-desc";

    var deleteButtonNode = document.createElement("button");
    deleteButtonNode.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNameNode.innerText = todo.name;
    todoDescNode.innerText = todo.desc;

    let checkButton = document.createElement("input");
    checkButton.type = "checkbox";
    let labelCheckButton = document.createElement("label");
    //checkBtn.appendChild(document.)

    let container = document.createElement("div");
    container.className = "contentContainer";

    todoNode.appendChild(checkButton);
    todoNode.appendChild(labelCheckButton);

    todoNode.appendChild(container);
    container.appendChild(todoNameNode);
    container.appendChild(document.createElement("hr"));
    container.appendChild(todoDescNode);
    //  container.appendChild(deleteButtonNode);
    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn";

    let editButton = document.createElement("button");
    editButton.className = "editBtn";

    todoNode.appendChild(deleteButton);
    todoNode.appendChild(editButton);

    // add markTodo button

    // add classes for css

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      event.preventDefault();
      var description = "?"; // event.target ....
      let todoObj = {};
      todoObj.name = document.getElementById("inputName").value;
      todoObj.desc = "testDesc";
      // hint: todoFunctions.addTodo
      var newState = todoFunctions.addTodo(state, todoObj); // ?? change this!
      update(newState);
    });
  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);
})();
