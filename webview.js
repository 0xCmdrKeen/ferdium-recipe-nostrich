function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  Ferdium.handleDarkMode(isEnabled => {
    // Nostrich stores the theme setting on a per-account basis
    const accounts = JSON.parse(localStorage.getItem('nostrich.accounts'));
    const account = accounts?.active ?? 'anon';
    const theme = isEnabled ? 'slate' : 'light';

    localStorage.setItem(
      `nostrich:theme::${account}`,
      JSON.stringify({ v: theme, at: Date.now() })
    );
  });

  const getMessages = () => {
    const hasNotifications = 
      !!document.querySelector('a[href="/notifications"] span.rounded-full');

    const hasDMs = 
      !!document.querySelector('a[href="/chat"] span.rounded-full');

    const hasNewPosts = 
      !!document.querySelector('a[href="/"] span.rounded-full');

    Ferdium.setBadge(0, hasNotifications || hasDMs ? 1 : 0);
  };
  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
