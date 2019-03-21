// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");
  var removeTodoForm = document.getElementById("remove-todo");
  var editTodoForm = document.getElementById("edit-todo");
  // This is the dom node where we will keep our todo

  var state = [];
  if (localStorage.getItem("userTodoList") !== null) {
    state = JSON.parse(window.localStorage.getItem("userTodoList"));
  } else {
    state = [
      {
        id: -3,
        name: "First todo title",
        desc: "First todo description",
        done: false
      },
      {
        id: -2,
        name: "Second todo title",
        desc: "Second todo description",
        done: false
      },
      {
        id: -1,
        name: "Third todo title",
        desc: "Third todo description",
        done: false
      }
    ];
  }

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
    editButton.value = todo.id;
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
  if (editTodoForm) {
    var btnsaveedit = document.getElementById("edittodo");
    btnsaveedit.addEventListener("click", function(event) {
      event.preventDefault();
      let inputEditname = document.getElementById("inputNameEdit").value;
      let inputEditDesc = document.getElementById("inputDescEdit").value;

      if (
        inputEditname.length > 17 ||
        inputEditDesc.length > 22 
      ) {
        edittodoError.style.display = "block";
      } else {
        var newState = todoFunctions.editTodo(
          state,
          btnsaveedit.name,
          inputEditname,
          inputEditDesc
        );
        console.log(inputEditDesc);
        console.log(inputEditname);
        console.log(newState);
        document.getElementById("popupEditTodo").style.display = "none";
        update(newState);
      }
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
      if (todoName.length > 17 || todoDesc.length>22  ) {
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
    document.getElementById("inputDescEdit").value = "";
    document.getElementById("inputNameEdit").value = "";
    document.getElementById("inputName").value = "";
    document.getElementById("inputDescription").value = "";
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    if (state != null) {
      state.forEach(function(todo) {
        todoListNode.appendChild(createTodoNode(todo));
      });
    }

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
    deleteTodoSetup();
    editTodoSetup(state);
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
  document.getElementById("btnCloseEdit").addEventListener("click", function() {
    document.getElementById("popupEditTodo").style.display = "none";
  });
  document
    .getElementById("floating-button")
    .addEventListener("click", function() {
      document.getElementById("popupAddTodo").style.display = "flex";
    });
  document
    .getElementById("btnCloseDelete")
    .addEventListener("click", function() {
      document.getElementById("popupRemoveTodo").style.display = "none";
    });
  deleteTodoSetup();
  editTodoSetup(state);
})();

function deleteTodoSetup() {
  for (
    let i = 0;
    i < document.getElementsByClassName("deleteBtn").length;
    i++
  ) {
    document
      .getElementsByClassName("deleteBtn")
      [i].addEventListener("click", function() {
        document.getElementById("popupRemoveTodo").style.display = "flex";
        document.getElementById("deletetodo").name = this.value;
      });
  }
}
function editTodoSetup(state) {
  for (let i = 0; i < document.getElementsByClassName("editBtn").length; i++) {
    document
      .getElementsByClassName("editBtn")
      [i].addEventListener("click", function() {
        let btnsaveedit = document.getElementById("edittodo");
        btnsaveedit.name = this.value;
        document.getElementById("popupEditTodo").style.display = "flex";
      });
  }
}
