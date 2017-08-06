import * as Home from './index';

describe('Home', function() {
  describe('routeConfig', () => {
    it('should configure home routing', () => {
      this.state = jasmine.createSpy().and.callFake(() => this.state);
      this.initial = jasmine.createSpy();
      this.rules = this;
      Home.routeConfig(this, this);
      expect(this.state).toHaveBeenCalled();
      expect(this.initial).toHaveBeenCalled();
    });
  });

  describe('HomeController', () => {
    let $ctrl;
    beforeEach(() => {
      this.current = { coords: { latitude: 28, longitude: -80 } };
      this.navigator = this;
      this.geolocation = this;
      this.fake = (pos, err) => this.current ? pos(this.current) : err('error');
      this.getCurrentPosition = jasmine.createSpy().and.callFake(this.fake);
      this.error = jasmine.createSpy();
      $ctrl = new Home.HomeController(this, this);
    });

    it('should initialize members', () => {
      expect($ctrl.$log).toBe(this);
      expect($ctrl.geolocation).toBe(this);
    });

    describe('getGeo', () => {
      it('should set geo on successful call', () => {
        $ctrl.getGeo();
        expect($ctrl.lat).toBeDefined();
        expect($ctrl.lng).toBeDefined();
        expect($ctrl.alert).toBeFalsy();
        expect(this.error).not.toHaveBeenCalled();
      });

      it('should log error on failure', () => {
        this.current = null;
        $ctrl.getGeo();
        expect($ctrl.alert).toBeTruthy();
        expect(this.error).toHaveBeenCalled();
      });

      it('should not update on invalid results', () => {
        this.current.coords = null;
        $ctrl.getGeo();
        expect($ctrl.lat).not.toBeDefined();
        expect($ctrl.lng).not.toBeDefined();
        expect($ctrl.alert).toBeFalsy();
        expect(this.error).not.toHaveBeenCalled();
      });
    });
  });
});
