const _ = require('lodash');

const createFactory = require('../../server/utilities/createFactory');

describe('createFactory', () => {
  test('will return a function that returns an object with default values', () => {
    const result = createFactory({ defaultValue: 123 });
    expect(_.isFunction(result)).toBe(true);
    expect(result()).toEqual({ defaultValue: 123 });
  });
});
