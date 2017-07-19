(function poll() {
  // Waits until an external function gives us the all clear that we can run (at /shared/main.js)
  if (typeof ynabToolKit !== 'undefined' && ynabToolKit.actOnChangeInit === true) {
    ynabToolKit.nightMode = (function () {
      function toggleNightMode() {
        $('button#toolkit-toggleNight').toggleClass('active');
        ynabToolKit.nightMode.enabled = !ynabToolKit.nightMode.enabled;
        updateNightMode();
      }

      function updateNightMode() {
        if (ynabToolKit.nightMode.enabled) {
          $('body').addClass('toolkit-nightMode');
          $('#toolkit-toggleNight i').removeClass('moon-1').addClass('sun-3');
        } else {
          $('body').removeClass('toolkit-nightMode');
          $('#toolkit-toggleNight i').removeClass('sun-3').addClass('moon-1');
        }
      }

      return {
        invoke() {
          ynabToolKit.nightMode.enabled = false;
          if (ynabToolKit.options.nightMode === '2') {
            if (!$('#toolkit-toggleNight').length) {
              $('nav.sidebar.logged-in .sidebar-contents').after('<button id="toolkit-toggleNight"><i class="ember-view flaticon stroke lock-1"></i></button>');
              $('body').on('click', 'button#toolkit-toggleNight', toggleNightMode);
            }
          } else if (ynabToolKit.options.nightMode === '1') {
            ynabToolKit.nightMode.enabled = true;
          }

          updateNightMode();
        }
      };
    }()); // Keep feature functions contained within this

    ynabToolKit.nightMode.invoke();
  } else {
    setTimeout(poll, 250);
  }
}());
