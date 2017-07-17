import * as dash from './index';

const mocks = {
  // location
  Key: '14241_PC',
  // $stateProvider
  state: () => 4,
  // $urlServiceProvider
  rules: {
    initial: () => 5
  },
  // weather
  getLocation: () => 1,
  getGeoLocation: () => 1.5,
  getConditions: () => 2,
  getForecast: () => 3,
};

describe('Dash', () => {
  describe('locationResolver', () => {
    beforeEach(() => {
      spyOn(mocks, 'getLocation').and.callThrough();
      spyOn(mocks, 'getGeoLocation').and.callThrough();
    });

    it('should call weather.getLocation with a zip code', () => {
      mocks.params = () => ({
        zip: 32934,
      });
      dash.locationResolver(mocks, mocks);
      expect(mocks.getLocation).toHaveBeenCalled();
      expect(mocks.getGeoLocation).not.toHaveBeenCalled();
    });

    it('should call weather.getGeoLocation without a zip code', () => {
      mocks.params = () => ({
        lat: 28.13,
        lng: -80.69,
      });
      dash.locationResolver(mocks, mocks);
      expect(mocks.getLocation).not.toHaveBeenCalled();
      expect(mocks.getGeoLocation).toHaveBeenCalled();
    });
  });

  describe('conditionsResolver', () => {
    it('should call weather.getConditions', () => {
      spyOn(mocks, 'getConditions');
      dash.conditionsResolver(mocks, mocks);
      expect(mocks.getConditions).toHaveBeenCalled();
    });
  });

  describe('forecastResovler', () => {
    it('should call weather.getCorecast', () => {
      spyOn(mocks, 'getForecast');
      dash.forecastResovler(mocks, mocks);
      expect(mocks.getForecast).toHaveBeenCalled();
    });
  });

  describe('routeConfig', () => {
    it('should configure dash routing', () => {
      spyOn(mocks, 'state');
      spyOn(mocks.rules, 'initial');
      dash.routeConfig(mocks);
      expect(mocks.state).toHaveBeenCalled();
    });
  });
});
