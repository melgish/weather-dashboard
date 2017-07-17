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

    describe('isInvalidZip', () => {
      let $ctrl;
      beforeEach(() => {
        $ctrl = new Home.HomeController(mocks);
      });

      it('should return false for valid zip codes.', () => {
        expect($ctrl.isInvalidZip('00000')).toBeFalsy();
        expect($ctrl.isInvalidZip('12345')).toBeFalsy();
        expect($ctrl.isInvalidZip('54321')).toBeFalsy();
      });

      it('should return true for invalid zip codes.', () => {
        expect($ctrl.isInvalidZip()).toBeTruthy();
        expect($ctrl.isInvalidZip('0000O')).toBeTruthy();
        expect($ctrl.isInvalidZip('fred')).toBeTruthy();
        expect($ctrl.isInvalidZip('123456')).toBeTruthy();
      });
    });

    describe('isInvalidGeo', () => {
      let $ctrl;
      beforeEach(() => {
        $ctrl = new Home.HomeController(mocks);
      });

      it('should return false for valid Geo codes.', () => {
        expect($ctrl.isInvalidGeo(0, 0)).toBeFalsy();
        expect($ctrl.isInvalidGeo('90', '-180')).toBeFalsy();
        expect($ctrl.isInvalidGeo(-89.9, 179.4)).toBeFalsy();
      });

      it('should return true for invalid Geo codes.', () => {
        expect($ctrl.isInvalidGeo()).toBeTruthy();
        expect($ctrl.isInvalidGeo('A', 0)).toBeTruthy();
        expect($ctrl.isInvalidGeo(0, 'A')).toBeTruthy();
        expect($ctrl.isInvalidGeo('fred')).toBeTruthy();
        expect($ctrl.isInvalidGeo(91, 0)).toBeTruthy();
      });
    });

    describe('getGeo', () => {
      let $ctrl;
      beforeEach(() => {
        $ctrl = new Home.HomeController(mocks);
      });

      it('should set geo', () => {
        $ctrl.getGeo();
        expect($ctrl.lat).toBeDefined();
        expect($ctrl.lng).toBeDefined();
      });
    });
  });
});
