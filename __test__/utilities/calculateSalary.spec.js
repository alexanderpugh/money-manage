const calculateSalary = require('../../server/utilities/calculateSalary');

describe('calculateSalary', () => {
  test('Should throw an error when incomeYearly in not a number', () => {
    expect(() => {
      calculateSalary({ incomeYearly: '$5005.23'} );
    }).toThrow();
  });

  test('Should throw an error when studentLoan type in not valid', () => {
    expect(() => {
      calculateSalary({ incomeYearly: 50005.23, studentLoan: 'DERRR'} );
    }).toThrow();
  });

  test('Should throw an error when age in not valid', () => {
    expect(() => {
      calculateSalary({ incomeYearly: 50005.23, studentLoan: 'PLAN 1', age: 55} );
    }).toThrow();
  });
});
