import AdobeTagManager from './AdobeTagManager';
import set from 'lodash.set';

describe('AdobeTagManager', () => {
  let options = {};

  beforeEach(() => {
    options = {
      debug: true,
      digitalData: {
        foo: 'bar',
        event: []
      },
      seedFile: '//seedfile.com/file'
    };
  });

  afterEach(() => {
    global.window._satellite = null;
  });

  describe('constructor', () => {
    it('should construct with default values', () => {
      global.localStorage = { setItem: jest.fn() };
      const manager = new AdobeTagManager(options);
      expect(manager.digitalData).toEqual(options.digitalData);
      expect(manager.pageName).toBeDefined();
      // Tried many different ways, but not able to mock localStorage. Get an
      // error that global.localStorage.setItem is not a spy or mock
      // expect(global.localStorage.setItem).toHaveBeenCalledWith('sdsat_debug', opti ons.debug);
      expect(global.localStorage.getItem('sdsat_debug')).toBe(options.debug.toString());
    });
  });

  describe('track', () => {
    it('should track event with data', async () => {
      const script = document.createElement('script');
      global.document.createElement = jest.fn(name => script);
      global.document.head.appendChild = jest.fn(() => {
        const evt = new Event('load');
        script.dispatchEvent(evt);
      });

      global.window._satellite = {
        pageBottom: jest.fn(),
        track: jest.fn()
      };
      const manager = new AdobeTagManager(options);

      expect.assertions(3);
      await manager.track('tester', options.digitalData);
      expect(manager._satellite).toBeDefined();
      expect(window.digitalData).toEqual(options.digitalData);
      expect(manager._satellite.track).toHaveBeenCalled();
    });
  });

  describe('_load', () => {
    it('should load seed script', async () => {
      const script = document.createElement('script');
      global.document.createElement = jest.fn(name => script);
      global.document.head.appendChild = jest.fn(() => {
        const evt = new Event('load');
        script.dispatchEvent(evt);
      });

      const manager = new AdobeTagManager(options);
      expect.assertions(1);
      await manager._load();
      expect(script.src).toBe(`http:${options.seedFile}`);
    });
  });

  describe('setEventInfo', () => {
    it('should set event info', () => {
      const manager = new AdobeTagManager(options);
      manager.setEventInfo('larry');
      expect(manager.digitalData).toMatchSnapshot();
    });

    it('should set event info', () => {
      const manager = new AdobeTagManager(options);
      manager.setEventInfo(['moe', 'curly']);
      expect(manager.digitalData).toMatchSnapshot();
    });

    it('should set event info', () => {
      const manager = new AdobeTagManager(options);
      manager.setEventInfo('larry');
      manager.setEventInfo(['moe', 'curly']);
      expect(manager.digitalData).toMatchSnapshot();
    });
  });
});
