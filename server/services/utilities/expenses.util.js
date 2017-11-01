const _ = require('lodash');

/**
 * Check that an expense or set has the common props
 *
 * @param {object}
 * @return {boolean}
 */
const hasCommonProps = obj => _.has(obj, 'name') && _.has(obj, 'description') && _.has(obj, 'totalYearly');

/**
 * Check if the types are valid
 *
 * @param {object}
 * @return {boolean}
 */
const typesValid = ({ name, description, totalYearly }) =>
  _.isString(name) && _.isString(description) && _.isNumber(totalYearly);

/**
 * Check if an expense object is valid
 *
 * @param {object} expense
 * @return {boolean}
 */
const expenseValid = expense => hasCommonProps(expense) && typesValid(expense);

/**
 * Check if an expenses array is valid
 *
 * @param {array} expenses
 * @return {boolean}
 */
const expensesValid = expenses => _.every(expenses, expense => {
  return expenseValid(expense)
});

/**
 * Check if the format of the json is valid
 *
 * @param {object} json
 * @return {boolean}
 */
const setValid = json =>
  hasCommonProps(json) && _.has(json, 'expenses') && _.isArray(json.expenses) && typesValid(json) && expensesValid(json.expenses)

/**
 * Check if the collection of sets is valid
 *
 * @param {object} json
 * @return {boolean}
 */
const setCollectionValid = json =>
  _.has(json, 'expenseSets') && _.isArray(json.expenseSets) && _.every(json.expenseSets, set => {
    return setValid(set);
  });

module.exports = {
  setCollectionValid
};
