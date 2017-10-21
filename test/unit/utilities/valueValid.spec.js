import test from 'ava';

import valueValid from '../../../server/utilities/valueValid.js';

test('valueValid will return true when testing a string with a matched regex', t => {
  const rule = /^([a-zA-Z0-9_-]){3,10}$/;
  const word = 'Al3xAnder';
  t.true(valueValid(rule, word));
});

test('valueValid will return false when testing a string with an unmatched regex', t => {
  const rule = /abc/;
  const word = 'zzzzzwwwgsgdsg';
  t.false(valueValid(rule, word));
});
