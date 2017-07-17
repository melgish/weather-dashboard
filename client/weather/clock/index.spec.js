import { ClockController } from './index';

describe('ClockController', () => {
  const mock = {};
  mock.interval = () => 1;
  mock.interval.cancel = () => 1;

  it('should be a function', () => {
    expect(typeof ClockController).toBe('function');
  });

  describe('ctor', () => {
    let instance;
    beforeEach(() => {
       instance = new ClockController(mock.interval);
    });
    it('should set initial now value', () => {
      expect(instance).toBeDefined();
      expect(instance.now).toBeDefined();
    })
  });

  describe('$postLink', () => {
    let instance;
    beforeEach(() => {
      instance = new ClockController(mock.interval);
    });

    it('should initialize an interval timer', () => {
      instance.$postLink();
      expect(instance.ticker).toBeDefined();
    });
  });

  describe('$onDestroy', () => {
    let instance;
    beforeEach(() => {
      instance = new ClockController(mock.interval);
    });

    it('should stop interval process', () => {
      spyOn(mock.interval, 'cancel');
      instance.$postLink();
      instance.$onDestroy();
      expect(mock.interval.cancel).toHaveBeenCalled();
    });
  });
});
