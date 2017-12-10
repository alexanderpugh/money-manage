const Vue = require('vue/dist/vue.common');
const _ = require('lodash');

const decimal = require('../../../server/utilities/decimal');

const formElement = document.querySelector('form');
const dataTotalYearlyAttrValue = parseFloat(formElement.getAttribute('data-totalYearly'));
const defaultTotalYearly = _.isNaN(dataTotalYearlyAttrValue) ? 0 : dataTotalYearlyAttrValue;

const app = new Vue({
  el: 'form',
  data: {
    totalYearly: defaultTotalYearly,
    totalMonthly: decimal(defaultTotalYearly / 12),
    totalWeekly: decimal(defaultTotalYearly / 52),
    totalDaily: decimal(defaultTotalYearly / 365.25)
  },
  methods: {
    onTotalWeeklyChanged () {
      this.totalYearly = decimal(this.totalWeekly * 52);
      this.totalMonthly = decimal(this.totalWeekly * 12);
      this.totalDaily = decimal(this.totalYearly / 365.25);
    },
    onTotalMonthlyChanged () {
      this.totalYearly = decimal(this.totalMonthly * 12);
      this.totalWeekly = decimal(this.totalYearly / 52);
      this.totalDaily = decimal(this.totalYearly / 365.25);
    },
    onTotalYearlyChanged () {
      this.totalMonthly = decimal(this.totalYearly / 12);
      this.totalWeekly = decimal(this.totalYearly / 52);
      this.totalDaily = decimal(this.totalYearly / 365.25);
    },
    onTotalDailyChanged () {
      this.totalMonthly = decimal(this.totalYearly / 12);
      this.totalWeekly = decimal(this.totalYearly / 52);
      this.totalYearly = decimal(this.totalWeekly * 365.25);
    }
  }
});

