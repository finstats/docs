/*
 * Phones: the menu is a sheet that rises from the bar at the bottom, and a drag down on its title closes it. The
 * drag starts on the title only, so scrolling the list is untouched. It sets inline !important transforms because
 * the stylesheet's open and closed states are !important. Listening on document survives instant navigation,
 * which swaps the sidebar without a page load.
 */
(function () {
  var bp = window.matchMedia("(max-width: 76.1875em)");
  var HANDLE = ".md-sidebar--primary .md-nav--primary > .md-nav__title";

  var sheet = null;
  var startY = 0;
  var delta = 0;
  var dragging = false;
  var active = false;

  function drawer() {
    return document.getElementById("__drawer");
  }

  document.addEventListener("touchstart", function (e) {
    if (!bp.matches) return;
    var title = e.target.closest && e.target.closest(HANDLE);
    if (!title) return;
    sheet = title.closest(".md-sidebar--primary");
    if (!sheet) return;
    active = true;
    dragging = false;
    delta = 0;
    startY = e.touches[0].clientY;
    sheet.style.setProperty("transition", "none", "important");
  }, { passive: true });

  document.addEventListener("touchmove", function (e) {
    if (!active || !sheet) return;
    delta = Math.max(0, e.touches[0].clientY - startY); // down only
    if (delta > 6) dragging = true;
    if (dragging) {
      e.preventDefault(); // neither the page scrolls nor the title's tap closes it
      sheet.style.setProperty("transform", "translateY(" + delta + "px)", "important");
    }
  }, { passive: false });

  function finish(e) {
    if (!active) return;
    active = false;
    var s = sheet;
    sheet = null;
    if (!s) return;
    s.style.removeProperty("transition");
    if (!dragging) return; // a plain tap closes it the usual way
    if (e && e.cancelable) e.preventDefault();

    if (delta > Math.min(140, s.offsetHeight * 0.28)) {
      // Far enough: the rest of the way down, then closed.
      s.style.setProperty("transform", "translateY(100%)", "important");
      var closed = false;
      var done = function (ev) {
        if (ev && ev.propertyName && ev.propertyName !== "transform") return;
        if (closed) return;
        closed = true;
        var d = drawer();
        if (d) d.checked = false;
        s.style.removeProperty("transform");
        s.removeEventListener("transitionend", done);
      };
      s.addEventListener("transitionend", done);
      setTimeout(done, 350); // in case transitionend never comes
    } else {
      s.style.removeProperty("transform"); // not far enough: back up
    }
    dragging = false;
  }

  document.addEventListener("touchend", finish, { passive: false });
  document.addEventListener("touchcancel", finish, { passive: true });
})();

/*
 * Phones: a tap anywhere on the bar's empty space or title opens the menu, not only the small button. The bar's own
 * controls (search, the theme switch, the repository, the buttons) keep what they do.
 */
(function () {
  var bp = window.matchMedia("(max-width: 76.1875em)");
  document.addEventListener("click", function (e) {
    if (!bp.matches) return;
    if (!(e.target.closest && e.target.closest(".md-header"))) return;
    if (e.target.closest('a, button, input, label, .md-search, [data-md-component="palette"], .md-header__source, .md-tabs')) return;
    var d = document.getElementById("__drawer");
    if (d) d.checked = !d.checked;
  });
})();
