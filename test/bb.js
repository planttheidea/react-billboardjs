// test
import test from 'ava';
import mockRequire from 'mock-require';

// src
import * as bb from 'src/bb';

let requireCount = 0;

test.after('cleanup mocks', () => {
  mockRequire.stop();
});

test.serial('if getBb will call require to get billboard.js when it does not currently exist', (t) => {
  t.is(bb.bb, null);

  const mockBb = {};
  const mockBillboard = {
    get bb() {
      requireCount++;

      return mockBb;
    }
  };

  mockRequire('billboard.js', mockBillboard);

  const result = bb.default();

  t.is(result, mockBb);
  t.is(requireCount, 1);
});

test.serial('if getBb will not require the library again if bb is populated', (t) => {
  bb.default();

  t.is(requireCount, 1);
});
