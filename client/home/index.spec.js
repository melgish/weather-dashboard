import * as Home from './index';

const mocks = {
  state: () => 4,
  rules: {
    initial: () => 5
  }
};

describe('Home', () => {
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
