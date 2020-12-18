const CACHE_NAME = 'pvot-cache';
const urlsToCache = [
  '/',
  '/serviceWorker.js',
  '/manifest.json',
  '/index.html',
  '/script.js',
  '/logo.png',
  '/logo@2x.png',
  '/logo@3x.png'
];
console.log('loading sw');

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log('installing sw');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      const x = cache.addAll(urlsToCache);
      console.log('cache added');
      return x;
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});


// google api docs

// self.addEventListener('push', function(e) {
//   console.log("Event listener pushh!!!!!!!!")
//   var body;
//   if (e.data) {
//     body = e.data.text();
//   } else {
//     body = 'Push message no payload';
//   }

//   var options = {
//     body: body,
//     icon: 'https://www.pvot.in/logo@3x.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     },
//     actions: [
//       {action: 'explore', title: 'Explore this new world',
//         icon: 'images/checkmark.png'},
//       {action: 'close', title: 'I don\'t want any of this',
//         icon: 'images/xmark.png'},
//     ]
//   };
//   e.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });

function messageToClient(client, data) {
  return new Promise(function(resolve, reject) {
    const channel = new MessageChannel();

    channel.port1.onmessage = function(event){
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };
    console.log(":::::::::::::::::")
    console.log(data)
    console.log(":::::::::::::::::")
    client.postMessage(JSON.stringify(data), [channel.port2]);
  });
}



self.addEventListener('push', function (event) {
  if (event && event.data) {
    console.log("Event listener pushh!!!!!!!!");
    console.log(event);
      var body;
      if (event.data) {
        body = event.data.text();
      } else {
        body = 'Push message no payload';
      }
    
      var options = {
        body: body,
        title: "PVOT",
        icon: '/logo@2x.png',
        badge: '/logo@2x.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        // actions: [
        //   {action: 'explore', title: 'Explore this new world',
        //     icon: 'images/checkmark.png'},
        //   {action: 'close', title: 'I don\'t want any of this',
        //     icon: 'images/xmark.png'},
        // ]
      };

    self.pushData = options;
    if (self.pushData) {
      event.waitUntil(self.registration.showNotification(options.title, options));
    }
  }
});

// self.addEventListener('message', event => {
//   console.log(`[Message] event: `, event.data);
// });

self.addEventListener('notificationclick', event => {
  console.log( event.notification)
    let notificationObj = {
      "title" : event.notification.title,
      "body" : event.notification.body,
      "icon" : event.notification.icon,
      "timestamp" : event.notification.timestamp,
      "badge" : event.notification.badge,
      "data" : event.notification.data
    }
    clients.matchAll({type: 'window'}).then(function (clientList) {
      if (clientList.length > 0) {
        messageToClient(clientList[0], {
          message: notificationObj // suppose it is: "Hello World !"
        });
      }
    });

    event.notification.close();
    event.waitUntil(clients.openWindow('/notifications'));
    
});

self.addEventListener('notificationclose', event => {
  console.log("cancelled")
  console.log( event.notification)
  let notificationObj = {
    "title" : event.notification.title,
    "body" : event.notification.body,
    "icon" : event.notification.icon,
    "timestamp" : event.notification.timestamp,
    "badge" : event.notification.badge,
    "data" : event.notification.data
  }
  clients.matchAll({type: 'window'}).then(function (clientList) {
    if (clientList.length > 0) {
      messageToClient(clientList[0], {
        message: notificationObj  
      });
    }
  });
});