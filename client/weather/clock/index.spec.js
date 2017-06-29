import { ClockController } from './index';

describe('ClockController', () => {
  const mock = {};
  mock.cleanup = () => 1;
  mock.interval = () => {
    return mock.cleanup;
  };

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
      spyOn(mock, 'cleanup');
      instance.$postLink();
      instance.$onDestroy();
      expect(mock.cleanup).toHaveBeenCalled();
    });
  });
});
