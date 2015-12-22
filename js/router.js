page(
  '/',
  indexController.init
);
page(
  '/meditation/:meditation',
  meditationController.fetch,
  meditationController.init
);
// page(
//   '/'
// )
page.start();
