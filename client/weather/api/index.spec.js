import { WeatherService } from './index';

describe('WeatherService', () => {
  it('should be a function', () => {
    expect(typeof WeatherService).toBe('function');
  });

  describe('ctor', () => {
    let instance;
    beforeEach(() => {
       instance = new WeatherService({});
    });
    it('should construct the service', () => {
      expect(instance).toBeDefined();
    })
  });
});
