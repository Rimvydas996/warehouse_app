const sum = require("./sum");

test("prideda 1 + 2 ir gauname 3", () => {
  expect(sum(1, 2)).toBe(3);
});
