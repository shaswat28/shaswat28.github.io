/* Runs before the page paints so a saved theme never flashes the other one. */
(function () {
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}
})();
