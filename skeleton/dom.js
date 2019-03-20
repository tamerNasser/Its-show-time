// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");
  var removeTodoForm = document.getElementById("remove-todo");
  // This is the dom node where we will keep our todo

  var state = [{
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
  ];

  var dynamicState = state;

  document
    .getElementsByTagName("select")[0]
    .addEventListener("change", sortTodosFunction, false);

  // This function takes a todo, it returns the DOM node representing that todo
  let createTodoNode = function(todo) {
    let todoNode = document.createElement("li");
    todoNode.className = "todo-items";

    let todoNameNode = document.createElement("h3");
    todoNameNode.className = "todo-name";
    let todoDescNode = document.createElement("p");
    todoDescNode.className = "todo-desc";

    //var deleteButtonNode = document.createElement("button");

    todoNameNode.innerText = todo.name;
    todoDescNode.innerText = todo.desc;

    let checkButton = document.createElement("input");
    checkButton.type = "checkbox";

    if (todo.done) checkButton.checked = true;
    else checkButton.checked = false;

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

    let buttonsContainer = document.createElement("div");
    todoNode.appendChild(buttonsContainer);
    buttonsContainer.className = "buttonsContainer";

    let deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn";
deleteButton.value = todo.id;
    let editButton = document.createElement("button");
    editButton.className = "editBtn";

    checkButton.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);

      update(newState);
      sortTodosFunction();
    });





    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(editButton);

    // add markTodo button

    // add classes for css

    return todoNode;
  };
  if (removeTodoForm) {

    document
      .getElementById("deletetodo")
      .addEventListener("click", function(event) {
        event.preventDefault();

        var newState = todoFunctions.deleteTodo(state, parseInt(this.name));
        document.getElementById("popupRemoveTodo").style.display = "none";
        update(newState);
      });
  }
  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      // https://developer.mozilla.org/en-US/docs/Web/Events/submit
      // what does event.preventDefault do?
      // what is inside event.target?
      let todoName = document.getElementById("inputName").value;
      let todoDesc = document.getElementById("inputDescription").value;
      let addtodoError = document.getElementById("addtodoError");
      event.preventDefault();
      if (todoName.length > 17) {
        addtodoError.style.display = "block";
      } else {
        let todoObj = {};
        todoObj.name = todoName;
        todoObj.desc = todoDesc;
        var newState = todoFunctions.addTodo(state, todoObj);
        document.getElementById("popupAddTodo").style.display = "none";
        update(newState);
      }
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

  function sortTodosFunction() {
    let sortedState = todoFunctions.cloneArrayOfObjects(state);

    s = document.getElementsByTagName("select")[0];
    if (s.value === "1") sortedState = todoFunctions.sortTodos(state);
    else if (s.value === "2")
      sortedState = todoFunctions.sortTodos(state, "done");
    else if (s.value === "3")
      sortedState = todoFunctions.sortTodos(state, "notDone");

    renderState(sortedState);
  }

  document.getElementById("btnClose").addEventListener("click", function() {
    document.getElementById("popupAddTodo").style.display = "none";
  });
  document
    .getElementById("floating-button")
    .addEventListener("click", function() {
      document.getElementById("popupAddTodo").style.display = "flex";
    });
    for(let i=0;i<document.getElementsByClassName("deleteBtn").length;i++){
      document
        .getElementsByClassName("deleteBtn")[i]
        .addEventListener("click", function() {
          document.getElementById("popupRemoveTodo").style.display = "flex";
          document.getElementById("deletetodo").name = this.value;
        });
    }

})();
