module.exports.validCollection = {
  expenseSets: [
    {
      name: "Set Name",
      description: "This is a description",
      totalYearly: 15550.22,
      expenses: [
        {
          name: "Travel Money",
          description: "Travel money to spend",
          totalYearly: 1800
        },
        {
          name: "Other Money",
          description: "other money to spend",
          totalYearly: 2232
        }
      ]
    }
  ]
};

module.exports['inValidCollection_MISSING_EXPENSE_PROP'] = {
  expenseSets: [
    {
      name: "Missing / Typo expense prop",
      description: "This is a description",
      totalYearly: 15550.22,
      expenses: [
        {
          nam: "Travel Money",
          description: "Travel money to spend",
          totalYearly: 1800
        },
        {
          name: "Other Money",
          description: "other money to spend",
          totalYearly: 2232
        }
      ]
    }
  ]
};

module.exports['inValidCollection_INVALID_EXPENSE_PROP'] = {
  expenseSets: [
    {
      nam: "Set Name",
      description: "This is a description",
      totalYearly: 15550.22,
      expenses: [
        {
          name: "Travel Money",
          description: true,
          totalYearly: '1800'
        },
        {
          name: "Other Money",
          description: "other money to spend",
          totalYearly: 2232
        }
      ]
    }
  ]
};

module.exports['inValidCollection_MISSING_SET_PROP'] = {
  expenseSets: [
    {
      name: "Set Name",
      totalYearly: 15550.22,
      expenses: [
        {
          name: "Travel Money",
          description: "Travel money to spend",
          totalYearly: 1800
        }
      ]
    }
  ]
};

module.exports['inValidCollection_INVALID_EXPENSE_PROP'] = {
  expenseSets: [
    {
      nam: "Set Name",
      description: "This is a description",
      totalYearly: 15550.22,
      expenses: [
        {
          name: "Travel Money",
          description: "Travel money to spend",
          totalYearly: 1800
        }
      ]
    }
  ]
};

module.exports['inValidCollection_INVALID_EXPENSES_TYPE_PROP'] = {
  expenseSets: [
    {
      name: "Set Name",
      description: "This is a description",
      totalYearly: 15550.22,
      expenses: false
    }
  ]
};

module.exports['inValidCollection_MISSING_EXPENSES'] = {
  expenseSets: [
    {
      name: "Set Name",
      description: "This is a description",
      totalYearly: 15550.22
    }
  ]
};

module.exports['inValidCollection_INVALID_EXPENSESETS_TYPE_PROP'] = {
  expenseSets: 'nothing'
};
