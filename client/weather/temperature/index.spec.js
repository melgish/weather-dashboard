import { TemperatureController } from './index';

describe('TemperatureController', () => {
  it('should be a function', () => {
    expect(typeof TemperatureController).toBe('function');
  });

  describe('ctor', () => {
    it('should construct an instance', () => {
      const instance = new TemperatureController()
      expect(instance).toBeDefined();
    });
  });

  describe('$onChanges', () => {
    const keys = ['Temp', 'Unit'];
    let deltas;
    let instance;

    beforeEach(() => {
      instance = new TemperatureController();
      deltas = {
        temperature: { currentValue: {
          Imperial: { Value: 50, Unit: 'F' },
        } },
      };
    });

    describe('when called with valid temperature data', () => {
      it('should update controller properties', () => {
        instance.$onChanges(deltas);
        expect(instance.Temp).toBe(50);
        expect(instance.Unit).toBe('F');
      });
    });

    describe('when called with no temperature data', () => {
      it('should not change properties', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({});
        keys.forEach(k => expect(instance[k]).toBe(k));
      });
    });

    describe('when called broken temperature data', () => {
      it('should clear broken property value(s)', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({temperature:{}});
        keys.forEach(k => expect(instance[k]).toBeUndefined);
      });
    });
  });
});
