import { WeatherService } from './index';

const mockHttp = {
  get: function() {
    return new Promise(resolve => resolve({
      data: ['fred'],
      headers: () => '3'
    }));
  },
};

describe('WeatherService', () => {
  let instance;
  beforeEach(() => {
      instance = new WeatherService(mockHttp);
  });

  it('should be a function', () => {
    expect(typeof WeatherService).toBe('function');
  });

  describe('ctor', () => {
    it('should construct the service', () => {
      expect(instance).toBeDefined();
    })
  });

  describe('getIconURL', () => {
    describe('when called with bad parameters', () => {
      it('should return undefined', () => {
        expect(instance.getIconURL()).toBeUndefined();
        expect(instance.getIconURL('fred')).toBeUndefined();
      });
    });

    describe('when called with a number', () => {
      it('should return a URL', () => {
        expect(instance.getIconURL(3)).toMatch(/api.icon.3/);
      });
    });
  });

  describe('getLocation', () => {
    it('should pass thru to $http service', done => {
      spyOn(mockHttp, 'get').and.callThrough();
      instance.getLocation()
        .then(data => {
          expect(data).toBe('fred');
          expect(mockHttp.get).toHaveBeenCalled();
          done();
        })
        .catch(() => {
          fail();
        });
    });
  });

  describe('getGeoLocation', () => {
    it('should pass thru to $http service', done => {
      spyOn(mockHttp, 'get').and.callThrough();
      instance.getGeoLocation()
        .then(data => {
          expect(data).toEqual(['fred']);
          expect(mockHttp.get).toHaveBeenCalled();
          done();
        })
        .catch(() => {
          fail();
        });
    });
  });

  describe('getConditions', () => {
    it('should pass thru to $http service', done => {
      spyOn(mockHttp, 'get').and.callThrough();
      instance.getConditions()
        .then(data => {
          expect(data).toBe('fred');
          expect(mockHttp.get).toHaveBeenCalled();
          done();
        })
        .catch(() => {
          fail();
        });
    });
  });

  describe('getForecast', () => {
    it('should pass thru to $http service', done => {
      spyOn(mockHttp, 'get').and.callThrough();
      instance.getForecast()
        .then(data => {
          expect(data).toEqual(['fred']);
          expect(mockHttp.get).toHaveBeenCalled();
          done();
        })
        .catch(() => {
          fail();
        });
    });
  });

  describe('getStats', () => {
    it('should pass thru to $http service', done => {
      spyOn(mockHttp, 'get').and.callThrough();
      instance.getStats()
        .then(data => {
          expect(data).toEqual(['fred']);
          expect(mockHttp.get).toHaveBeenCalled();
          done();
        })
        .catch(() => {
          fail();
        });
    });
  });
});
