const valueValid = require('../../server/utilities/valueValid');

describe('valueValid', () => {
  test('Will return true when testing a string with a matched regex', () => {
    const rule = /^([a-zA-Z0-9_-]){3,10}$/;
    const word = 'Al3xAnder';
    expect(valueValid(rule, word)).toBe(true);
  });

  test('Will return false when testing a string with an unmatched regex', () => {
    const rule = /abc/;
    const word = 'zzzzzwwwgsgdsg';
    expect(valueValid(rule, word)).toBe(false);
  });
});
