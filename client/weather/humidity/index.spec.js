import { HumidityController } from './index';

describe('HumidityController', () => {
  it('should be a function', () => {
    expect(typeof HumidityController).toBe('function');
  });

  describe('ctor', () => {
    it('should construct an instance', () => {
      const instance = new HumidityController()
      expect(instance).toBeDefined();
    });
  });

  describe('$onChanges', () => {
    const keys = ['Humidity'];
    let deltas;
    let instance;

    beforeEach(() => {
      instance = new HumidityController();
      deltas = {
        humidity: { currentValue: 50 },
      };
    });

    describe('when called with valid humitidy data', () => {
      it('should update controller properties', () => {
        instance.$onChanges(deltas);
        expect(instance.Humidity).toBe(50);
        expect(instance.Unit).toBe('%');
      });
    });

    describe('when called with no humitidy data', () => {
      it('should not change properties', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({});
        keys.forEach(k => expect(instance[k]).toBe(k));
      });
    });

    describe('when called broken humitidy data', () => {
      it('should clear broken property value(s)', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({humidity:{}});
        keys.forEach(k => expect(instance[k]).toBeUndefined);
      });
    });
  });
});
