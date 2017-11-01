const _ = require('lodash');

const studentLoanValid = studentLoan =>
  studentLoan === 'N/A' || studentLoan === 'PLAN 1' || studentLoan === 'PLAN 2';

const calculateSalary = ({ incomeYearly, studenLoadPlan = 'N/A', age = '<69' }) => {
  if (!_.isNumber(incomeYearly)) {
    throw new Error('ERROR: incomeYearly must be a valid number');
  }

  if (!studentLoanValid(studentLoan)) {
    throw new Error(`ERROR: student loan must be either 'N/A', 'PLAN 1' or 'PLAN 2'`);
  }

  if (!(age === '<69' || age === '69-78' || age === '79+')) {
    throw new Error(`ERROR: age must be either '<69', '69-78' or '79+'`);
  }

  return {
    result: {
      totalYearly: 0.00,
      totalMonthly: 0.00,
      totalWeekly: 0.00
    }
  }
};

module.exports = calculateSalary;
