import multiply from "./multiply";

test("multiplies 2 * 3 to equal 6", () => {
  expect(multiply(2, 3)).toBe(6);
});

test("multiplies 5 * 5 to equile 25", () => {
  expect(multiply(5, 5)).toBe(25);
});
