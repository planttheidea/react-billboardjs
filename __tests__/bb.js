/* eslint-env jest */

import * as billboard from '../src/bb';
import { bb as bbLibrary } from 'billboard.js';

describe('bb', () => {
  it('should lazily require `billboard.js` when it is not stored', () => {
    expect(billboard.bb).toBe(null);

    const bb = billboard.getBb();

    expect(bb).toBe(bbLibrary);
    expect(billboard.bb).toBe(bbLibrary);

    const futureBb = billboard.getBb();

    expect(futureBb).toBe(bbLibrary);
  });
});
