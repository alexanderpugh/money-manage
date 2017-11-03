const Sequelize = require('sequelize');

module.exports = (connection) => {
  const SalaryAssessment = connection.define('salaryAssessment', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    taxableYearly: {
      type: Sequelize.DECIMAL,
      required: true,
      allowNull: false
    },
    incomeTaxYearly: {
      type: Sequelize.DECIMAL,
      required: true,
      allowNull: false
    },
    nationalInsuranceYearly: {
      type: Sequelize.DECIMAL,
      required: true,
      allowNull: false
    },
    studentLoanYearly: {
      type: Sequelize.DECIMAL,
      required: true,
      allowNull: false
    },
    takeHomeYearly: {
      type: Sequelize.DECIMAL,
      required: true,
      allowNull: false
    },
    incomeYearly: {
      type: Sequelize.DECIMAL,
      required: true,
      allowNull: false
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false
    }
  });

  return SalaryAssessment;
};
