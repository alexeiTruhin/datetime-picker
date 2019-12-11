import { Datetime } from './datetime';

describe('basic-datetime', () => {
  it('builds', () => {
    expect(new Datetime()).toBeTruthy();
  });
});
