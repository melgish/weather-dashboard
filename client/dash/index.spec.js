import * as Dash from './index';

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
  getConditions: () => 2,
  getForecast: () => 3,
  // $transition$
  params: () => ({
    zipCode: '32934'
  }),
};

describe('Dash', () => {
  describe('locationResolver', () => {
    it('should call weather.getLocation', () => {
      spyOn(mocks, 'getLocation').and.callThrough();
      Dash.locationResolver(mocks, mocks);
      expect(mocks.getLocation).toHaveBeenCalled();
    });
  });

  describe('conditionsResolver', () => {
    it('should call weather.getConditions', () => {
      spyOn(mocks, 'getConditions');
      Dash.conditionsResolver(mocks, mocks);
      expect(mocks.getConditions).toHaveBeenCalled();
    });
  });

  describe('forecastResovler', () => {
    it('should call weather.getCorecast', () => {
      spyOn(mocks, 'getForecast');
      Dash.forecastResovler(mocks, mocks);
      expect(mocks.getForecast).toHaveBeenCalled();
    });
  });

  describe('routeConfig', () => {
    it('should configure Dash routing', () => {
      spyOn(mocks, 'state');
      spyOn(mocks.rules, 'initial');
      Dash.routeConfig(mocks);
      expect(mocks.state).toHaveBeenCalled();
    });
  });
});
