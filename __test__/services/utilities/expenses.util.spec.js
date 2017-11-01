const { setCollectionValid } = require('../../../server/services/utilities/expenses.util');
const mock = require('./mock');

describe('setCollectionValid', () => {
  test('Should return true when a valid json is passed in', () => {
    expect(setCollectionValid(mock.validCollection)).toBe(true);
  });

  test('Should return false when an expense prop is missing', () => {
    expect(setCollectionValid(mock['inValidCollection_MISSING_EXPENSE_PROP'])).toBe(false);
  });

  test('Should return false when an expenses is not an array', () => {
    expect(setCollectionValid(mock['inValidCollection_INVALID_EXPENSES_TYPE_PROP'])).toBe(false);
  });

  test('Should return false when an expense prop is invalid', () => {
    expect(setCollectionValid(mock['inValidCollection_INVALID_EXPENSE_PROP'])).toBe(false);
  });

  test('Should return false when an expenses is missing', () => {
    expect(setCollectionValid(mock['inValidCollection_MISSING_EXPENSES'])).toBe(false);
  });

  test('Should return false when an expenseSets is not an array', () => {
    expect(setCollectionValid(mock['inValidCollection_INVALID_EXPENSESETS_TYPE_PROP'])).toBe(false);
  });

  test('Should return false when an expenseSets object is missing a prop', () => {
    expect(setCollectionValid(mock['inValidCollection_MISSING_SET_PROP'])).toBe(false);
  });
});
