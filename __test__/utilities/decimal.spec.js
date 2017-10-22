const decimal = require('../../server/utilities/decimal');

describe('decimal', () => {
  test('Will return a floating point rounded to two decimal places', () => {
    expect(decimal(1.222223)).toBe(1.22);
  });
});
