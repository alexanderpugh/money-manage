import Vue from 'vue/dist/vue.common';
import _ from 'lodash';

import decimal from '../../../server/utilities/decimal';

const formElement = document.querySelector('form');
const dataTotalYearlyAttrValue = parseFloat(formElement.getAttribute('data-totalYearly'));
const defaultTotalYearly = _.isNaN(dataTotalYearlyAttrValue) ? 0 : dataTotalYearlyAttrValue;

const app = new Vue({
  el: 'form',
  data: {
    totalYearly: defaultTotalYearly,
    totalMonthly: decimal(defaultTotalYearly / 12),
    totalWeekly: decimal(defaultTotalYearly / 52)
  },
  methods: {
    onTotalWeeklyChanged () {
      this.totalYearly = decimal(this.totalWeekly * 52);
      this.totalMonthly = decimal(this.totalWeekly * 12);
    },
    onTotalMonthlyChanged () {
      this.totalYearly = decimal(this.totalMonthly * 12);
      this.totalWeekly = decimal(this.totalYearly / 52);
    },
    onTotalYearlyChanged () {
      this.totalMonthly = decimal(this.totalYearly / 12);
      this.totalWeekly = decimal(this.totalYearly / 52);
    }
  }
});

