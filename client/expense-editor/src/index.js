const Vue = require('vue/dist/vue.common');
const _ = require('lodash');

const decimal = require('../../../server/utilities/decimal');
const {
  ANNUAL_MONTHS,
  ANNUAL_WEEKS,
  ANNUAL_WORKING_DAYS
} = require('../../../server/config/constants');

const formElement = document.querySelector('form');
const dataTotalYearlyAttrValue = parseFloat(formElement.getAttribute('data-totalYearly'));
const defaultTotalYearly = _.isNaN(dataTotalYearlyAttrValue) ? 0 : dataTotalYearlyAttrValue;

const app = new Vue({
  el: 'form',
  data: {
    totalYearly: defaultTotalYearly,
    totalMonthly: decimal(defaultTotalYearly / ANNUAL_MONTHS),
    totalWeekly: decimal(defaultTotalYearly / ANNUAL_WEEKS),
    totalDaily: decimal(defaultTotalYearly / ANNUAL_WORKING_DAYS)
  },
  methods: {
    onTotalWeeklyChanged () {
      this.totalYearly = decimal(this.totalWeekly * ANNUAL_WEEKS);
      this.totalMonthly = decimal(this.totalWeekly * ANNUAL_MONTHS);
      this.totalDaily = decimal(this.totalYearly / ANNUAL_WORKING_DAYS);
    },
    onTotalMonthlyChanged () {
      this.totalYearly = decimal(this.totalMonthly * ANNUAL_MONTHS);
      this.totalWeekly = decimal(this.totalYearly / ANNUAL_WEEKS);
      this.totalDaily = decimal(this.totalYearly / ANNUAL_WORKING_DAYS);
    },
    onTotalYearlyChanged () {
      this.totalMonthly = decimal(this.totalYearly / ANNUAL_MONTHS);
      this.totalWeekly = decimal(this.totalYearly / ANNUAL_WEEKS);
      this.totalDaily = decimal(this.totalYearly / ANNUAL_WORKING_DAYS);
    },
    onTotalDailyChanged () {
      this.totalMonthly = decimal(this.totalYearly / ANNUAL_MONTHS);
      this.totalWeekly = decimal(this.totalYearly / ANNUAL_WEEKS);
      this.totalYearly = decimal(this.totalWeekly * ANNUAL_WORKING_DAYS);
    }
  }
});

