import { NavController } from './index';

describe('NavController', () => {
  let mocks;
  let instance;
  beforeEach(() => {
    mocks = {};
    instance = new NavController(mocks);
  });

  it('should return empty string for invaild limit', () => {
    expect(instance.limits).toBe('');
    mocks.limit = 3;
    expect(instance.limits).toBe('');
    delete mocks.limit;
    mocks.remaining = 5;
  });

  it('should return a value for valid limits', () => {
    mocks.limit = 10;
    mocks.remaining = 5;
    expect(instance.limits).toBe('5 / 10');
  });
});
