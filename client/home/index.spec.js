import * as Home from './index';

const mocks = {
  state: () => 4,
  rules: {
    initial: () => 5
  },
  navigator: {
    geolocation: {
      getCurrentPosition: pos => pos({
        coords: {
          latitude: 28.12345,
          longitude: 80.54321,
        },
      }),
    },
  },
};

describe('Home', () => {
  describe('routeConfig', () => {
    it('should configure home routing', () => {
      spyOn(mocks, 'state');
      spyOn(mocks.rules, 'initial');
      Home.routeConfig(mocks, mocks);
      expect(mocks.state).toHaveBeenCalled();
      expect(mocks.rules.initial).toHaveBeenCalled();
    });
  });

  describe('HomeController', () => {
    it('should be a constructor', () => {
      expect(typeof Home.HomeController).toBe('function');
    });

    describe('getGeo', () => {
      let $ctrl;
      beforeEach(() => {
        $ctrl = new Home.HomeController(mocks, mocks);
      });

      it('should set geo', () => {
        $ctrl.getGeo();
        expect($ctrl.lat).toBeDefined();
        expect($ctrl.lng).toBeDefined();
      });
    });
  });
});
