(function poll() {
  // Waits until an external function gives us the all clear that we can run (at /shared/main.js)
  if ( typeof ynabToolKit !== "undefined"  && ynabToolKit.actOnChangeInit === true ) {

    ynabToolKit.hideAmountsButton = new function()  { // Keep feature functions contained within this

      this.setting = 'init',

      this.invoke = function() {

        $('span.currency').each(function() {$(this).contents()[0].textContent = '***'})
        

      this.observe = function(changedNodes) {

          if (changedNodes.has('ynab-grid-body')) {
        	// We found Account transactions rows
            ynabToolKit.hideAmountsButton.invoke();
          }

      };
    };

  } else {
    setTimeout(poll, 250);
  }
})();
