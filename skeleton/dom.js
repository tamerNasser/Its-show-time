// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo

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

    let editButton = document.createElement("button");
    editButton.className = "editBtn";

    checkButton.addEventListener("click", function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);

      update(newState);
    });

    deleteButton.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });

    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(editButton);

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

  function sortTodosFunction() {
    let sortedState = todoFunctions.cloneArrayOfObjects(state);

    s = document.getElementsByTagName("select")[0];
    if (s.value === "0") sortedState = todoFunctions.sortTodos(state);
    else if (s.value === "1")
      sortedState = todoFunctions.sortTodos(state, "done");
    else if (s.value === "2")
      sortedState = todoFunctions.sortTodos(state, "notDone");

    renderState(sortedState);
  }

  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");

  var x, i, j, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /* For each option in the original select element,
        create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
            and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];

        sortTodosFunction();

        h = this.parentNode.previousSibling;

        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
      except the current select box: */
    var x,
      y,
      i,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
})();
