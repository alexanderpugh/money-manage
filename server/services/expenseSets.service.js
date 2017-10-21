const db = require('../config/db.js');

const expenseSetsService = {};

expenseSetsService.create = async ({ name, description, userId }) => {
  try {
    const newExpenseSet = await db.expenseSets.create({
      name,
      description,
      userId
    });

    return newExpenseSet;
  } catch (error) {
    throw error;
  }
};

expenseSetsService.edit = async ({ name = null, description = null, userId, totalYearly = null, expenseSetId }) => {
  const updatedInputs = { expenseSetId, userId };
  if (name) {
    updatedInputs.name = name;
  }
  if (description) {
    updatedInputs.description = description;
  }
  if (totalYearly) {
    updatedInputs.totalYearly = totalYearly
  }

  try {
    const updated = await db.expenseSets.update(updatedInputs, {
      where: { userId, id: expenseSetId }
    });

    return updated.length === 1 ? { id: expenseSetId } : null;
  } catch (error) {
    throw error;
  }
};

expenseSetsService.addToTotalYearly = async ({ value, userId, expenseSetId }) => {
  const updatedInputs = {};

  try {
    const current = await db.expenseSets.findOne({
      where: { userId, id: expenseSetId }
    });

    const updated = await db.expenseSets.update({
      totalYearly: current.totalYearly + parseFloat(value)
    }, {
        where: { userId, id: expenseSetId }
      });

    return updated;
  } catch (error) {
    throw error;
  }
};

expenseSetsService.editTotalYearly = async ({ originalValue, newValue, userId, expenseSetId }) => {
  const updatedInputs = {};

  try {
    const current = await db.expenseSets.findOne({
      where: { userId, id: expenseSetId }
    });

    const updated = await db.expenseSets.update({
      totalYearly: (current.totalYearly - parseFloat(originalValue)) + parseFloat(newValue)
    }, {
        where: { userId, id: expenseSetId }
      });

    return updated;
  } catch (error) {
    throw error;
  }
};

expenseSetsService.fetchOne = async ({ userId, expenseSetId }) => {
  try {
    const fetchedExpenseSet = await db.expenseSets.findOne({
      where: { userId, id: expenseSetId }
    });

    return fetchedExpenseSet;
  } catch (error) {
    throw error;
  }
};

expenseSetsService.fetchAll = async ({ userId }) => {
  try {
    const fetchedExpenseSets = await db.expenseSets.findAll({
      where: { userId },
      include: {
        model: db.expenses
      }
    });

    return fetchedExpenseSets;
  } catch (error) {
    throw error;
  }
};

expenseSetsService.getTotalYearlyTotal = async ({ userId }) => {
  try {
    const fetchedExpenseSets = await db.expenseSets.findAll({
      where: { userId }
    });

    let total = 0;
    fetchedExpenseSets.forEach(set => {
      total += set.totalYearly;
    });

    return total;
  } catch (error) {
    throw error;
  }
};

expenseSetsService.delete = async ({ userId, expenseSetId }) => {
  const updatedInputs = { expenseSetId, userId };

  try {
    const deleted = await db.expenseSets.destroy( {
      where: { userId, id: expenseSetId }
    });

    return Boolean(deleted.length);
  } catch (error) {
    throw error;
  }
};

module.exports = expenseSetsService;
