const saltValue = require('../../server/utilities/saltValue');

describe('saltValue', () => {
  test('Will return a salted value when a string is provided as an argument', () => {
    const string = 'bear';
    const result = saltValue(string);
    expect(result).toBe('94805eb2cffa950f0e0545f724d1e229');
  });
});
