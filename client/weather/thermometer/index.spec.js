import * as thisModule from './index';

describe(thisModule.name, function() {
  describe(thisModule.ThermometerController.name, () => {
    let $ctrl;
    beforeEach(() => {
      this.debug = () => { };
      $ctrl = new thisModule.ThermometerController(this);
    });

    it('should initialize data members', () => {
      expect($ctrl.y).toBeDefined();
      expect($ctrl.Low).toBeDefined();
      expect($ctrl.High).toBeDefined();
    });

    describe('$onChanges', () => {
      describe('when called with a valid temp (odd)', () => {
        beforeEach(() => {
          $ctrl.$onChanges({ temperature: { currentValue: 75 } });
        });
        it('should calculate range values', () => {
          expect($ctrl.Low).toBe(60);
          expect($ctrl.High).toBe(80);
          expect($ctrl.y).toBe(27.5);
        });
      });
      describe('when called with a valid temp (even)', () => {
        beforeEach(() => {
          $ctrl.$onChanges({ temperature: { currentValue: 65 } });
        });
        it('should calculate range values', () => {
          expect($ctrl.Low).toBe(60);
          expect($ctrl.High).toBe(80);
          expect($ctrl.y).toBe(52.5);
        });
      });
      describe('when called with an in valid temp', () => {
        beforeEach(() => {
          $ctrl.$onChanges({ temperature: { currentValue: 'fred' } });
        });
        it('should present current values', () => {
          expect($ctrl.Low).toBe(50);
          expect($ctrl.High).toBe(100);
          expect($ctrl.y).toBe(25);
        });
      });
      describe('when called for other updates', () => {
        beforeEach(() => {
          $ctrl.$onChanges({ wind: { currentValue: 'fred' } });
        });
        it('should not change current values', () => {
          expect($ctrl.Low).toBe(50);
          expect($ctrl.High).toBe(100);
          expect($ctrl.y).toBe(25);
        });
      })
    });
  });
});
