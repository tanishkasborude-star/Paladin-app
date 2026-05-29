export const router = {
  _routes: {},
  _currentScreen: null,
  _currentParams: {},

  init(routes) {
    // routes = { screenName: { render(params), onEnter(params), onLeave() } }
    this._routes = routes;
  },

  navigate(screenName, params = {}) {
    // Call onLeave for current screen if it exists
    if (this._currentScreen && this._routes[this._currentScreen]?.onLeave) {
      this._routes[this._currentScreen].onLeave();
    }

    // Hide all screens
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));

    // Show target screen
    const targetEl = document.getElementById(`screen-${screenName}`);
    if (targetEl) {
      targetEl.classList.add('active');
    }

    // Update state
    this._currentScreen = screenName;
    this._currentParams = params;

    // Call route lifecycle hooks
    const route = this._routes[screenName];
    if (route) {
      if (route.render) route.render(params);
      if (route.onEnter) route.onEnter(params);
    }
  },

  getCurrentScreen() {
    return this._currentScreen;
  },

  getParams() {
    return this._currentParams;
  }
};
