import { LocationController } from './index';

describe('LocationController', () => {
  it('should be a function', () => {
    expect(typeof LocationController).toBe('function');
  });

  describe('ctor', () => {
    it('should construct an instance', () => {
      const instance = new LocationController()
      expect(instance).toBeDefined();
    });
  });

  describe('$onChanges', () => {
    const keys = ['City', 'State', 'Country', 'Region'];
    let deltas;
    let instance;

    beforeEach(() => {
      instance = new LocationController();
      deltas = {
        location: { currentValue: {
          LocalizedName: 'emerald city',
          AdministrativeArea: { LocalizedName: 'oz' },
          Country: { LocalizedName: 'not in kansas' },
          Region: {  LocalizedName: 'anymore' },
        } },
      };
    });

    describe('when called with valid pressure data', () => {
      it('should update controller properties', () => {
        instance.$onChanges(deltas);
        expect(instance.City).toBe('emerald city');
        expect(instance.State).toBe('oz');
        expect(instance.Country).toBe('not in kansas');
        expect(instance.Region).toBe('anymore');
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
        instance.$onChanges({location:{}});
        keys.forEach(k => expect(instance[k]).toBeUndefined);
      });
    });
  });
});
