const calculateSalary = require('../../server/utilities/calculateSalary');

describe('calculateSalary', () => {
  test('Should throw an error when incomeYearly in not a number', () => {
    expect(() => {
      calculateSalary({ incomeYearly: '$5005.23' });
    }).toThrow();
  });

  test('Should throw an error when studentLoanPlan type in not valid', () => {
    expect(() => {
      calculateSalary({ incomeYearly: 50005.23, studentLoanPlan: 'DERRR' });
    }).toThrow();
  });

  test('Should return the correct takeHomeYearly value', () => {
    const result = calculateSalary({ incomeYearly: 160000, studentLoanPlan: 'PLAN_2' });
    expect(result.takeHomeYearly).toBe(82969.68);
  });
});

describe('calculateSalary income tax', () => {
  test('Should return the correct income tax for a salary less than the personal allowance', () => {
    const result = calculateSalary({ incomeYearly: 10000, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(0);
  });

  test('Should return the correct income tax for a basic rate salary', () => {
    const result = calculateSalary({ incomeYearly: 25000, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(2700);
  });

  test('Should return the correct income tax for a higer rate salary', () => {
    const result = calculateSalary({ incomeYearly: 60000, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(12700);
  });

  test('Should return the correct income tax for a higer rate salary with reduced personal allowance', () => {
    const result = calculateSalary({ incomeYearly: 110000, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(34700);
  });

  test('Should return the correct income tax for additional rate salary', () => {
    const result = calculateSalary({ incomeYearly: 160000, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(57800);
  });

  test('Should return the correct income tax for a salary that is equal to the personal allowance', () => {
    const result = calculateSalary({ incomeYearly: 11500, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(0);
  });

  test('Should return the correct income tax for a salary that is slightly above the personal allowance', () => {
    const result = calculateSalary({ incomeYearly: 11503, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(0.6);
  });

  test('Should return the correct income tax for a salary that is equal to the basic range end', () => {
    const result = calculateSalary({ incomeYearly: 45000, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(6700);
  });

  test('Should return the correct income tax for a salary that is slightly above the basic range end', () => {
    const result = calculateSalary({ incomeYearly: 45003, studentLoanPlan: 'PLAN_2' });
    expect(result.incomeTaxYearly).toBe(6701.20);
  });
});

describe('calculateSalary National insurance', () => {
  test('Should return the correct NI for a salary less than the allowance each week', () => {
    const result = calculateSalary({ incomeYearly: 7800, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(0);
  });

  test('Should return the correct NI for a salary that doesnt pay the additional rate', () => {
    const result = calculateSalary({ incomeYearly: 12000, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(460.32);
  });

  test('Should return the correct NI for a salary that does pay the additional rate', () => {
    const result = calculateSalary({ incomeYearly: 50000, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(4520.32);
  });

  test('Should return the correct NI for a salary that is really high', () => {
    const result = calculateSalary({ incomeYearly: 98765432.12, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(1978828.96);
  });

  test('Should return the correct NI for a salary that is equal to the allowance', () => {
    const result = calculateSalary({ incomeYearly: 8164.0, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(0);
  });

  test('Should return the correct NI for a salary that slightly above the allowance', () => {
    const result = calculateSalary({ incomeYearly: 8167.0, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(0.36);
  });

  test('Should return the correct NI for a salary that is equal to the upper range', () => {
    const result = calculateSalary({ incomeYearly: 44980, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(4417.92);
  });

  test('Should return the correct NI for a salary that slightly above the upper range (annually)', () => {
    const result = calculateSalary({ incomeYearly: 44983, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(4418.28);
  });

  test('Should return the correct NI for a salary that slightly above the upper range (weekly)', () => {
    const result = calculateSalary({ incomeYearly: 45136, studentLoanPlan: 'PLAN_2' });
    expect(result.nationalInsuranceYearly).toBe(4423.04);
  });
});

describe('calculateSalary Student Loan', () => {
  test('Should return the correct student loan for a salary less than the the payment amount for plan 1', () => {
    const result = calculateSalary({ incomeYearly: 16000, studentLoanPlan: 'PLAN_1' });
    expect(result.studentLoanYearly).toBe(0);
  });

  test('Should return the correct student loan for a salary less than the the payment amount for plan 2', () => {
    const result = calculateSalary({ incomeYearly: 20000, studentLoanPlan: 'PLAN_2' });
    expect(result.studentLoanYearly).toBe(0);
  });

  test('Should return the correct student loan for a salary more than the the payment amount for plan 1', () => {
    const result = calculateSalary({ incomeYearly: 18000, studentLoanPlan: 'PLAN_1' });
    expect(result.studentLoanYearly).toBe(20.25);
  });

  test('Should return the correct student loan for a salary more than the the payment amount for plan 2', () => {
    const result = calculateSalary({ incomeYearly: 25000, studentLoanPlan: 'PLAN_2' });
    expect(result.studentLoanYearly).toBe(360);
  });

   test('Should return the 0 student loan if plan is N/A', () => {
    const result = calculateSalary({ incomeYearly: 25000, studentLoanPlan: 'N/A' });
    expect(result.studentLoanYearly).toBe(0);
  });

  test('Should return the correct student loan for a 1000000 salary for plan 1', () => {
    const result = calculateSalary({ incomeYearly: 1000000, studentLoanPlan: 'PLAN_1' });
    expect(result.studentLoanYearly).toBe(88400.25);
  });

  test('Should return the correct student loan for a 1000000 salary for plan 2', () => {
    const result = calculateSalary({ incomeYearly: 1000000, studentLoanPlan: 'PLAN_2' });
    expect(result.studentLoanYearly).toBe(88110);
  });

  test('Should return the correct student loan for a salary that is equal to the plan 1 threshold', () => {
    const result = calculateSalary({ incomeYearly: 17775, studentLoanPlan: 'PLAN_1' });
    expect(result.studentLoanYearly).toBe(0);
  });

  test('Should return the correct student loan for a salary that is equal to the plan 2 threshold', () => {
    const result = calculateSalary({ incomeYearly: 21000, studentLoanPlan: 'PLAN_2' });
    expect(result.studentLoanYearly).toBe(0);
  });

  test('Should return the correct student loan for a salary that is slightly above the plan 1 threshold', () => {
    const result = calculateSalary({ incomeYearly: 17778, studentLoanPlan: 'PLAN_1' });
    expect(result.studentLoanYearly).toBe(0.27);
  });

  test('Should return the correct student loan for a salary that is slightly above the plan 2 threshold', () => {
    const result = calculateSalary({ incomeYearly: 21003, studentLoanPlan: 'PLAN_2' });
    expect(result.studentLoanYearly).toBe(0.27);
  });
});
