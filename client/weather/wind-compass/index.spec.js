import { WindCompassController } from './index';

describe('WindCompassController', () => {
  it('should be a funciton', () => {
    expect(typeof WindCompassController).toBe('function');
  });

  describe('ctor', () => {
    it('should construct an instance', () => {
      const instance = new WindCompassController()
      expect(instance).toBeDefined();
    });
  });

  describe('$onChanges', () => {
    let deltas;
    let instance;
    beforeEach(() => {
      deltas = { wind: { currentValue: { Direction: { Degrees: 45 } } } };
      instance = new WindCompassController();
    });
    describe('when called with valid wind data', () => {
      it('should update rotate angle', () => {
        instance.$onChanges(deltas);
        expect(instance.rotate).toBe(225);
      });
    });
    describe('when called with no wind data', () => {
      it('should not change rotate property', () => {
        instance.rotate = 'fred';
        instance.$onChanges({});
        expect(instance.rotate).toBe('fred');
      });
    });
    describe('when called broken wind data', () => {
      it('should change rotate property to 180', () => {
        instance.rotate = 'fred';
        instance.$onChanges({wind:{}});
        expect(instance.rotate).toBe(180);
      });
    });
  });
});
