require('../../server/config/jsExtensions');

describe('Date.prototype.formatForHTML', () => {
  test('Should return the html formatted date when a date object is passed in', () => {
    const date = new Date("2017-11-01T22:02:33.210Z");
    expect(date.formatForHTML()).toBe('2017-11-01');
  });
});
