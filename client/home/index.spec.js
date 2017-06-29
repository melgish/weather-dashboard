import * as Home from './index';

const mocks = {
  Key: '14241_PC',
  getLocation: () => 1,
  getConditions: () => 2,
  getForecast: () => 3,
  state: () => 4,
  rules: {
    initial: () => 5
  }
};

describe('Home', () => {
  describe('locationResolver', () => {
    it('should call weather.getLocation', () => {
      spyOn(mocks, 'getLocation').and.callThrough();
      Home.locationResolver(mocks);
      expect(mocks.getLocation).toHaveBeenCalled();
    })
  });

  describe('conditionsResolver', () => {
    it('should call weather.getConditions', () => {
      spyOn(mocks, 'getConditions');
      Home.conditionsResolver(mocks, mocks);
      expect(mocks.getConditions).toHaveBeenCalled();
    })
  });

  describe('forecastResovler', () => {
    it('should call weather.getCorecast', () => {
      spyOn(mocks, 'getForecast');
      Home.forecastResovler(mocks, mocks);
      expect(mocks.getForecast).toHaveBeenCalled();
    })
  });

  describe('routeConfig', () => {
    it('should configure home routing', () => {
      spyOn(mocks, 'state');
      spyOn(mocks.rules, 'initial');
      Home.routeConfig(mocks, mocks);
      expect(mocks.state).toHaveBeenCalled();
      expect(mocks.rules.initial).toHaveBeenCalled();
    })
  })
});
