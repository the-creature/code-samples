import get from 'lodash.get';
import set from 'lodash.set';
import unset from 'lodash.unset';
import isEmpty from 'lodash.isempty';

/**
 * Performs the tracking calls to Adobe Tag Manager.
 * Pulled from https://github.com/nfl/react-metrics/blob/master/examples/vendors/AdobeTagManager.js
 * @module AdobeTagManager
 * @class
 * @internal
 */
export default class AdobeTagManager {
  constructor(options = {}) {
    this.options = options;
    this.digitalData = options.digitalData || {};
    this.pageName = '';
    this.name = 'Adobe Tag Manager';
    if (!this.options.server) {
      localStorage.setItem('sdsat_debug', this.options.debug);
    }
  }

  /**
   *
   * @method setEventInfo
   * @param {String} eventName(s)
   * @internal
   */
  setEventInfo(...args) {
    this._addEventInfo(...args);
  }

  /**
   *
   * @method track
   * @param {String} eventName
   * @param {Object} params
   * @returns {Promise}
   * @internal
   */
  track(eventName, params, shouldAddEvent) {
    if (shouldAddEvent) {
      this._addEventInfo(eventName);
    }
    if (!this.options.server) {
      return new Promise((resolve, reject) => {
        this._load()
          .then(satellite => {
            this._satellite = this._satellite || satellite;
            this._track(eventName, params);
            resolve({
              eventName,
              params
            });
          })
          .catch(error => {
            console.error('Omniture: Failed to load seed file', error);
            reject(error);
          });
      });
    } else {
      return false;
    }
  }

  /**
   *
   * @method _track
   * @param {String} eventName
   * @param {Object} params
   * @protected
   */
  _track(eventName, params) {
    const data = isEmpty(params) ? this.digitalData : params;
    window.digitalData = data;
    if (this._satellite) {
      this._satellite.track(eventName);
    }
  }

  /**
   *
   * @method _load
   * @protected
   */
  _load() {
    this._cleanAndSetData();
    return (
      this._promise ||
      (this._promise = new Promise((resolve, reject) => {
        if (window._satellite) {
          resolve(window._satellite);
        } else {
          const seedScript = document.createElement('script');

          seedScript.onload = () => {
            this._addPageBottom();
            resolve(window._satellite);
          };

          seedScript.onerror = error => {
            reject(error);
          };

          seedScript.src = this.options.seedFile;
          document.head.appendChild(seedScript);
        }
      }))
    );
  }

  _addEventInfo(names) {
    names = Array.isArray(names) ? names : [names];
    const events = names.map(name => ({ eventInfo: { eventAction: name } }));
    this.digitalData.event.push(...events);
  }

  /**
   *
   * @method _addPageBottom
   * @protected
   */
  _addPageBottom() {
    const body = document.body;
    const script = document.createElement('script');
    // Lets add to page so Adobe consultant knows we've added the pageBottom() call.
    const scriptContent = `
      "use strict";
      var _satellite = window._satellite;
      if (_satellite) {
        _satellite.pageBottom();
      }
    `;

    script.text = scriptContent;
    return body.appendChild(script);
  }

  /**
   *
   * @method _resetPage
   * @private
   */
  _resetEvents() {
    this.digitalData.event = [];
  }

  /**
   *
   * @method _set
   * @private
   */
  _set(path, value) {
    set(this.digitalData, path, value);
  }

  /**
   *
   * @method _unset
   * @private
   */
  _unset(path, value) {
    unset(this.digitalData, path);
  }

  /**
   * The following fields are what APP custom Adobe Launch script will expect.
   * Check if the required fields exist and initialize them if they do not.
   * @method _cleanAndSetData
   * @private
   */
  _cleanAndSetData() {
    const propertySearchLocationPath = 'page.attributes.propertySearchLocation';
    const propertySearchLocation = get(this.digitalData, propertySearchLocationPath);
    if (propertySearchLocation === undefined) {
      this._set(propertySearchLocationPath, '');
    }

    const propertySearchDateInfoPath = 'page.attributes.propertySearchDateInfo';
    const propertySearchDateInfo = get(this.digitalData, propertySearchDateInfoPath);
    if (propertySearchDateInfo === undefined) {
      this._set(propertySearchDateInfoPath, '00:00:00:00');
    }

    const productIDPath = 'product[0].productInfo.productID';
    const productID = get(this.digitalData, productIDPath);
    if (productID === undefined) {
      this._set('product', [{ productInfo: { productId: '' } }]);
    }

    window.digitalData = this.digitalData;
  }
}
