const _ = require('lodash');

const createObjectConstructorWithDefaults = require('../../server/utilities/createObjectConstructorWithDefaults');

describe('createObjectConstructorWithDefaults', () => {
  test('will return a function that returns an object with default values', () => {
    const result = createObjectConstructorWithDefaults({ defaultValue: 123 });
    expect(_.isFunction(result)).toBe(true);
    expect(result()).toEqual({ defaultValue: 123 });
  });
});
