import { CashPipe } from './cash.pipe';

describe('CashPipe', () => {
  it('create an instance', () => {
    const pipe = new CashPipe();
    expect(pipe).toBeTruthy();
  });
});
