const _ = require('lodash');

const decimal = require('./decimal');

/**
 * Check if a student plan is a valid type
 *
 * @param {string} plan
 * @return {boolean}
 */
const studentLoanPlanValid = plan =>
  _.isString(plan) && (plan === 'N/A' || plan === 'PLAN_1' || plan === 'PLAN_2');

/**
 * Calculate the amount of student loan paid yearly given the annual salary and the repayment plan
 *
 * @param {number} income
 * @param {string} plan
 * @return {number}
 */
const calculateStudentLoan = (income, plan) => {
  const plan1Threshold = 18330;
  const plan2Threshold = 25000;

  switch (plan) {
    case 'N/A':
      return 0;
    case 'PLAN_1':
      return decimal((income <= plan1Threshold) ? 0 : (income - plan1Threshold) * 0.09);
    case 'PLAN_2':
      return decimal((income <= plan2Threshold) ? 0 : (income - plan2Threshold) * 0.09);
  }
};

/**
 * Calculate the national insurance paid yearly given the annual income
 *
 * @param {number} income
 * @return {number}
 */
const calculateNI = income => {
  const weekAllowance = 162;
  const mediumRange = 892;

  const basicRate = 0.12;
  const additionalRate = 0.02;

  const weeklyIncome = income / 52;
  let ni = 0;

  if (weeklyIncome > weekAllowance) {
    if (Math.floor(weeklyIncome) > mediumRange) {
      ni += ((mediumRange - weekAllowance) * basicRate) * 52;
      ni += ((weeklyIncome - mediumRange) * additionalRate) * 52;
      ni += 2;
    } else {
      ni = ((weeklyIncome - weekAllowance) * basicRate) * 52;
    }
  }

  return decimal(ni);
}

/**
 * Calculate the income tax paid yearly given the annual income
 *
 * @param {number} income
 * @return {number}
 */
const calculateIncomeTax = (income) => {
  const basicRate = 0.2;
  const higherRate = 0.4;
  const additionalRate = 0.45;

  const basicRangeEnd = 46350;
  const higherRangeEnd = 150000;

  let tax = 0;

  if (income > basicRangeEnd) {
    tax += basicRangeEnd * basicRate;

    if (income > higherRangeEnd) {
      tax += (higherRangeEnd - basicRangeEnd) * higherRate;
      tax += (income - higherRangeEnd) * additionalRate;
    } else {
      tax += (income - basicRangeEnd) * higherRate;
    }

  } else {
    tax += income * basicRate;
  }

  return decimal(tax);
};

/**
 * Calculate the amount that is income-taxable given the annual income
 *
 * @param {number} income
 * @return {number}
 */
const calculateTaxableIncome = income => {
  const personalAllowance = 11851;
  const upperLimit = 100000;
  const cutOff = 123000;

  if (income < personalAllowance) {
    return 0;
  }

  if (income > upperLimit) {
    if (income > cutOff) {
      return income;
    }

    const newPA = personalAllowance - (income - upperLimit) / 2;

    return income - newPA;
  }

  return income - personalAllowance;
};

/**
 * Calculate the actual salary after deductions
 *
 * @param {object} param
 * @param {number} param.incomeYearly - the income before reductions
 * @param {string} param.studentLoanPlan - the student loan plan someone is on - N/A, PLAN_1, PLAN_2
 */
const calculateSalary = ({ incomeYearly, studentLoanPlan }) => {
  if (!_.isNumber(incomeYearly)) {
    throw new Error('ERROR: incomeYearly must be a valid number');
  }

  if (!studentLoanPlanValid(studentLoanPlan)) {
    throw new Error(`ERROR: student loan must be either 'N/A', 'PLAN 1' or 'PLAN 2'`);
  }

  const taxableYearly = calculateTaxableIncome(incomeYearly);
  const incomeTaxYearly = calculateIncomeTax(taxableYearly);
  const nationalInsuranceYearly = calculateNI(incomeYearly);
  const studentLoanYearly = calculateStudentLoan(incomeYearly, studentLoanPlan);
  const takeHomeYearly = incomeYearly - incomeTaxYearly - nationalInsuranceYearly - studentLoanYearly;

  return {
    taxableYearly,
    incomeTaxYearly,
    nationalInsuranceYearly,
    studentLoanYearly,
    takeHomeYearly
  }
};

module.exports = calculateSalary;
