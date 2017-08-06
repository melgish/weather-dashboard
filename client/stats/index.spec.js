import * as thisModule from './index';

describe(thisModule.name, function() {
  let $ctrl;
  beforeEach(() => {
    $ctrl = new thisModule.StatsController(this);
  });

  describe('ctor', () => {
    it('should initialize members.', () => {
      expect($ctrl.weather).toBe(this);
    });
  });

  describe('$onInit', () => {
    beforeEach(() => {
      this.stats = { limit: 10, remaining: 5 };
      this.value = { then: fn => fn(this.stats) };
      this.getStats = jasmine.createSpy().and.returnValue(this.value);
    });
    it('should get stats from server.', () => {
      $ctrl.$onInit();
      expect(this.getStats).toHaveBeenCalled();
      expect($ctrl.limit).toBe(10);
      expect($ctrl.remaining).toBe(5);
    });

    it ('should ignore invalid results.', () => {
      this.stats.remaining = NaN;
      $ctrl.$onInit();
      expect(this.getStats).toHaveBeenCalled();
      expect($ctrl.limit).not.toBeDefined();
      expect($ctrl.remaining).not.toBeDefined();
    });
  });
});
