import { AnalogClockController } from './index';

describe('AnalogClockController', function() {
  let $ctrl;
  beforeEach(() => {
    $ctrl = new AnalogClockController();
  });

  it('should initialize members', () => {
    expect($ctrl).toBeDefined();
  });

  describe('updateHands', () => {
    it('should set angle of second hand', () => {
      $ctrl.updateHands(new Date(2017, 10, 26, 12, 15, 30));
      expect($ctrl.second).toBe(180);
      expect($ctrl.minute).toBeGreaterThan(90);
      expect($ctrl.hour).toBeGreaterThan(0);
    });
    it('should set angle of minute hand', () => {
      $ctrl.updateHands(new Date(2017, 10, 26, 12, 15, 0));
      expect($ctrl.second).toBe(0);
      expect($ctrl.minute).toBe(90);
      expect($ctrl.hour).toBeGreaterThan(0);
    });
    it('should set angle of hour hand', () => {
      $ctrl.updateHands(new Date(2017, 10, 26, 1, 0, 0));
      expect($ctrl.second).toBe(0);
      expect($ctrl.minute).toBe(0);
      expect($ctrl.hour).toBe(30);
    });
  });

  describe('$onChanges', () => {
    it('should do nothing unless time is changed', () => {
      spyOn($ctrl, 'updateHands');
      $ctrl.$onChanges({});
      expect($ctrl.updateHands).not.toHaveBeenCalled();
    });
    it('should update time when time is changed', () => {
      $ctrl.$onChanges({
        time: {
          currentValue: new Date(2017, 10, 26, 1, 0, 0)
        },
      });
      expect($ctrl.second).toBe(0);
      expect($ctrl.minute).toBe(0);
      expect($ctrl.hour).toBe(30);
    });
  });
});
