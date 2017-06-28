import { PressureController } from './index';

describe('PressureController', () => {
  it('should be a function', () => {
    expect(typeof PressureController).toBe('function');
  });

  describe('ctor', () => {
    it('should construct an instance', () => {
      const instance = new PressureController()
      expect(instance).toBeDefined();
    });
  });

  describe('$onChanges', () => {
    const keys = ['Temp', 'Unit'];
    let deltas;
    let instance;

    beforeEach(() => {
      instance = new PressureController();
      deltas = {
        pressure: { currentValue: {
          Imperial: { Value: 50, Unit: 'F' },
        } },
      };
    });

    describe('when called with valid pressure data', () => {
      it('should update controller properties', () => {
        instance.$onChanges(deltas);
        expect(instance.Pressure).toBe(50);
        expect(instance.Unit).toBe('F');
      });
    });

    describe('when called with no pressure data', () => {
      it('should not change properties', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({});
        keys.forEach(k => expect(instance[k]).toBe(k));
      });
    });

    describe('when called broken pressure data', () => {
      it('should clear broken property value(s)', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({pressure:{}});
        keys.forEach(k => expect(instance[k]).toBeUndefined);
      });
    });
  });
});
