import { ForecastController } from './index';

describe('ForecastController', () => {
  it('should be a function', () => {
    expect(typeof ForecastController).toBe('function');
  });

  describe('ctor', () => {
    it('should construct an instance', () => {
      const instance = new ForecastController()
      expect(instance).toBeDefined();
    });
  });

  describe('$onChanges', () => {
    const keys = ['Date', 'Day', 'Night', 'Low', 'High', 'Unit'];
    let now = new Date().toISOString();
    let deltas;
    let instance;

    beforeEach(() => {
      instance = new ForecastController();
      deltas = {
        forecast: { currentValue: {
          Date: now,
          Day: 'Day',
          Night: 'Night',
          Temperature: {
            Minimum: { Value: 50, Unit: 'F' },
            Maximum: { Value: 100, Unit: 'C' },
          },
        } },
      };
    });

    describe('when called with valid forecast data', () => {
      it('should update controller properties', () => {
        instance.$onChanges(deltas);
        expect(instance.Date).toBe(now);
        expect(instance.Night).toBe('Night');
        expect(instance.Low).toBe(50);
        expect(instance.High).toBe(100);
        expect(instance.Unit).toBe('F');
      });
    });

    describe('when called with no forecast data', () => {
      it('should not change properties', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({});
        keys.forEach(k => expect(instance[k]).toBe(k));
      });
    });

    describe('when called broken forecast data', () => {
      it('should clear broken property value(s)', () => {
        keys.forEach(k => instance[k] = k);
        instance.$onChanges({forecast:{}});
        keys.forEach(k => expect(instance[k]).toBeUndefined);
      });
    });
  });
});
