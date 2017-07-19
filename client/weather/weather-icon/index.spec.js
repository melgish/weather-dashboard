import { IconController } from './index';

const mockWeatherService = {
  getIconURL: function(icon) {
    return 'url' + icon;
  }
}

describe('IconController', () => {
  it('should be a function', () => {
    expect(typeof IconController).toBe('function');
  });

  describe('ctor', () => {
    it('should construct an instance', () => {
      const instance = new IconController(null, mockWeatherService);
      expect(instance).toBeDefined();
      expect(instance.getIconURL).toBe(mockWeatherService.getIconURL);
    });
  });

  describe('$onChanges', () => {
    const keys = ['iconURL', 'altText'];
    let deltas;
    let instance;

    beforeEach(() => {
      instance = new IconController(null, mockWeatherService);
      deltas = {
        day: { currentValue: {
          Icon: 12,
          IconPhrase: 'test icon phrase',
        } },
      };
    });

    describe('when called with valid forcast', () => {
      it('should update controller properties', () => {
        instance.$onChanges(deltas);
        expect(instance.iconURL).toBe('url12');
        expect(instance.altText).toBe('test icon phrase');
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
        instance.$onChanges({day:{}});
        keys.forEach(k => expect(instance[k]).toBeUndefined);
      });
    });
  });
});
