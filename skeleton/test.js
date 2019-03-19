var test = require("tape");
var logic = require("./logic");

test("Testing cloneArrayOfObjects return value", function(t) {
  let actual = logic.cloneArrayOfObjects([{
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
  ]);
  var expected = [{
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
  t.deepEqual(actual, expected, "Should return the same array of objects");
  t.end();
});





test("Testing - adding todo", function(t) {
  var actual = logic.addTodo([{
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
  ],
   {
    id: 4,
    name: "don't eat lunch",
    desc: " forget to eat salaaadd",
    done: false
  });
  var expected = [{
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
    },
    {
      id: 4,
      name: "don't eat lunch",
      desc: " forget to eat salaaadd",
      done: false
    }
  ];
 t.deepEqual(actual, expected, "Should return the todos array with the new todo object");
 t.end();
});
