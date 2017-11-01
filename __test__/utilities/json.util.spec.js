const jsonUtil = require('../../server/utilities/json.util');

describe('jsonUtil.isValid', () => {
  test('Should return false when an invalid json string is provided', () => {
    expect(jsonUtil.isValid('{ anerror: true }')).toBe(false);
  });

  test('Should return true when a valid json string is provided', () => {
    expect(jsonUtil.isValid('{ "noError": "correct" }')).toBe(true);
  });
});
