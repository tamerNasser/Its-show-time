var test = require("tape");
var logic = require("./logic");
let todos = [{
    id: 1,
    name: "eat lunch",
    desc: "don't forget to eat salaaadd",
    done: false
  },
  {
    id: 2,
    name: "eat lunch2",
    desc: "don't forget to eat salaaadd2",
    done: true
  },
  {
    id: 3,
    name: "eat lunch3",
    desc: "don't forget to eat salaaadd3",
    done: false
  }
];

let todosMark = [{
    id: 1,
    name: "eat lunch",
    desc: "don't forget to eat salaaadd",
    done: false
  },
  {
    id: 2,
    name: "eat lunch2",
    desc: "don't forget to eat salaaadd2",
    done: false
  },
  {
    id: 3,
    name: "eat lunch3",
    desc: "don't forget to eat salaaadd3",
    done: false
  }
];

test("Testing cloneArrayOfObjects return value", function(t) {
  let actual = logic.cloneArrayOfObjects(todos);
  var expected = todos;
  t.deepEqual(actual, expected, "Should return the same array of objects");
  t.end();
});





test("Testing - adding todo", function(t) {
  var actual = logic.addTodo(todos, {
    name: "don't eat lunch",
    desc: " forget to eat salaaadd"
  });
  var expected = todos.concat(
    {
      id: 1,
      name: "don't eat lunch",
      desc: " forget to eat salaaadd",
      done: false
    }
  );
  t.deepEqual(actual, expected, "Should return the todos array with the new todo object");
  t.end();
});

test('Testing - deleting todo', function(t) {
  var actual = logic.deleteTodo([{
      id: 1,
      name: "eat lunch",
      desc: "don't forget to eat salaaadd",
      done: false
    },
    {
      id: 2,
      name: "eat lunch2",
      desc: "don't forget to eat salaaadd2",
      done: true
    },
    {
      id: 3,
      name: "eat lunch3",
      desc: "don't forget to eat salaaadd3",
      done: false
    }
  ], 2);
  var expected = [{
      id: 1,
      name: "eat lunch",
      desc: "don't forget to eat salaaadd",
      done: false
    },
    {
      id: 3,
      name: "eat lunch3",
      desc: "don't forget to eat salaaadd3",
      done: false
    }
  ];
  t.deepEqual(actual, expected, 'Should return the arra without the deleted todo');
  t.end();
});


test('Testing markTodo return value', function(t) {
  var actual = logic.markTodo(todos,2);
  var expected = todosMark;
  t.deepEqual(actual, expected, 'Should return todos with the done toggled');
  t.end();
});
