// /**
//  * GCCI Nanyuki Website Service Worker
//  * Provides offline functionality and caching for better performance
//  */

// const CACHE_NAME = 'gcci-nanyuki-v1.0.0';
// const OFFLINE_URL = '404.html';

// // Files to cache for offline functionality
// const STATIC_CACHE_URLS = [
//     '/',
//     '/index.html',
//     '/church.html',
//     '/statement-of-faith.html',
//     '/satellite-churches.html',
//     '/community-programmes.html',
//     '/childrens-church.html',
//     '/gallery.html',
//     '/events.html',
//     '/resources.html',
//     '/give.html',
//     '/404.html',
//     '/styles.css',
//     '/script.js',
//     '/favicon.ico'
// ];

// // Install event - cache static resources
// self.addEventListener('install', event => {
//     console.log('Service Worker: Installing...');
    
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(cache => {
//                 console.log('Service Worker: Caching static files');
//                 return cache.addAll(STATIC_CACHE_URLS);
//             })
//             .then(() => {
//                 console.log('Service Worker: All static files cached');
//                 return self.skipWaiting();
//             })
//             .catch(error => {
//                 console.error('Service Worker: Cache installation failed:', error);
//             })
//     );
// });

// // Activate event - clean up old caches
// self.addEventListener('activate', event => {
//     console.log('Service Worker: Activating...');
    
//     event.waitUntil(
//         caches.keys()
//             .then(cacheNames => {
//                 return Promise.all(
//                     cacheNames.map(cacheName => {
//                         if (cacheName !== CACHE_NAME) {
//                             console.log('Service Worker: Deleting old cache:', cacheName);
//                             return caches.delete(cacheName);
//                         }
//                     })
//                 );
//             })
//             .then(() => {
//                 console.log('Service Worker: Activated');
//                 return self.clients.claim();
//             })
//     );
// });

// // Fetch event - serve cached content when offline
// self.addEventListener('fetch', event => {
//     // Skip cross-origin requests
//     if (!event.request.url.startsWith(self.location.origin)) {
//         return;
//     }
    
//     // Handle navigation requests
//     if (event.request.mode === 'navigate') {
//         event.respondWith(
//             fetch(event.request)
//                 .catch(() => {
//                     return caches.open(CACHE_NAME)
//                         .then(cache => {
//                             return cache.match(OFFLINE_URL);
//                         });
//                 })
//         );
//         return;
//     }
    
//     // Handle other requests with cache-first strategy
//     event.respondWith(
//         caches.match(event.request)
//             .then(cachedResponse => {
//                 if (cachedResponse) {
//                     // Return cached version
//                     return cachedResponse;
//                 }
                
//                 // Fetch from network
//                 return fetch(event.request)
//                     .then(response => {
//                         // Don't cache non-successful responses
//                         if (!response || response.status !== 200 || response.type !== 'basic') {
//                             return response;
//                         }
                        
//                         // Clone the response for caching
//                         const responseToCache = response.clone();
                        
//                         // Cache certain file types
//                         if (shouldCache(event.request.url)) {
//                             caches.open(CACHE_NAME)
//                                 .then(cache => {
//                                     cache.put(event.request, responseToCache);
//                                 });
//                         }
                        
//                         return response;
//                     })
//                     .catch(() => {
//                         // Return offline page for HTML requests
//                         if (event.request.headers.get('accept').includes('text/html')) {
//                             return caches.match(OFFLINE_URL);
//                         }
//                     });
//             })
//     );
// });

// // Determine if a URL should be cached
// function shouldCache(url) {
//     // Cache images, CSS, JS, and HTML files
//     return url.match(/\.(html|css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i) ||
//            url.endsWith('/') ||
//            !url.includes('.');
// }

// // Background sync for form submissions (when supported)
// self.addEventListener('sync', event => {
//     if (event.tag === 'contact-form') {
//         event.waitUntil(handleContactFormSync());
//     }
// });

// // Handle background sync for contact forms
// async function handleContactFormSync() {
//     try {
//         // In a real implementation, this would process queued form submissions
//         console.log('Service Worker: Processing background sync for contact forms');
        
//         // Example: Send queued form data to server
//         // const queuedForms = await getQueuedForms();
//         // for (const form of queuedForms) {
//         //     await submitForm(form);
//         // }
        
//     } catch (error) {
//         console.error('Service Worker: Background sync failed:', error);
//         throw error;
//     }
// }

// // Push notification handler (for future use)
// self.addEventListener('push', event => {
//     console.log('Service Worker: Push event received');
    
//     const options = {
//         body: event.data ? event.data.text() : 'New update from GCCI Nanyuki',
//         icon: '/favicon.ico',
//         badge: '/favicon.ico',
//         vibrate: [200, 100, 200],
//         data: {
//             url: '/'
//         },
//         actions: [
//             {
//                 action: 'open',
//                 title: 'Open Website',
//                 icon: '/favicon.ico'
//             },
//             {
//                 action: 'close',
//                 title: 'Close',
//                 icon: '/favicon.ico'
//             }
//         ]
//     };
    
//     event.waitUntil(
//         self.registration.showNotification('GCCI Nanyuki', options)
//     );
// });

// // Notification click handler
// self.addEventListener('notificationclick', event => {
//     event.notification.close();
    
//     if (event.action === 'open') {
//         event.waitUntil(
//             clients.openWindow(event.notification.data.url || '/')
//         );
//     }
// });

// // Message handler for communication with main thread
// self.addEventListener('message', event => {
//     if (event.data && event.data.type === 'SKIP_WAITING') {
//         self.skipWaiting();
//     }
    
//     if (event.data && event.data.type === 'GET_VERSION') {
//         event.ports[0].postMessage({
//             version: CACHE_NAME
//         });
//     }
// });

// // Error handler
// self.addEventListener('error', event => {
//     console.error('Service Worker: Error occurred:', event.error);
// });

// // Unhandled rejection handler
// self.addEventListener('unhandledrejection', event => {
//     console.error('Service Worker: Unhandled promise rejection:', event.reason);
// });

// console.log('Service Worker: Script loaded successfully');