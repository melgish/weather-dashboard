import { WindController } from './index';

describe('WindController', () => {
  it('should be a function', () => {
    expect(typeof WindController).toBe('function');
  });

  describe('ctor', () => {
    it('should construct an instance', () => {
      const instance = new WindController()
      expect(instance).toBeDefined();
    });
  });

  describe('$onChanges', () => {
    const keys = ['Direction', 'Speed', 'SUnit'];
    let deltas;
    let instance;

    beforeEach(() => {
      instance = new WindController();
      deltas = {
        wind: { currentValue: {
          Direction: { Degrees: 45, Localized: 'NE' },
          Speed: { Imperial: { Value: 50, Unit: 'mph' } },
        } },
        gusts: { currentValue: {
          Speed: { Imperial: { Value: 100, Unit: 'kph' } },
        } },
      };
    });

    describe('when called with valid wind data', () => {
      it('should update controller properties', () => {
        instance.$onChanges(deltas);
        expect(instance.Direction).toBe('NE');
        expect(instance.Speed).toBe(50);
        expect(instance.SUnit).toBe('mph');
        expect(instance.Gusts).toBe(100);
        expect(instance.GUnit).toBe('kph');
      });
    });

    describe('when called with no wind data', () => {
      it('should not change properties', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({});
        keys.forEach(k => expect(instance[k]).toBe(k));
      });
    });

    describe('when called broken wind data', () => {
      it('should clear broken property value(s)', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({wind:{}});
        keys.forEach(k => expect(instance[k]).toBeUndefined);
      });
    });
  });
});
