const saltValue = require('../../server/utilities/saltValue');

describe('saltValue', () => {
  test('Will return a salted value when a string is provided as an argument', () => {
    const string = 'bear';
    const result = saltValue(string);
    expect(result).toBe('19ba01a0f00c5a5539329de8ee7c21f2');
  });
});
