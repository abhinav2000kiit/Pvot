const run = function() {
  console.log('loading');
  // Service worker for Progressive Web App
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/serviceWorker.js', {
        scope: '.' // THIS IS REQUIRED FOR RUNNING A PROGRESSIVE WEB APP FROM A NON_ROOT PATH
      })
      .then(
        function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        },
        function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        }
      );
  }
};
window.addEventListener('load', run);
