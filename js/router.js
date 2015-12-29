$(function() {
  User.alreadyAuthed();
});

page(
  '/',
  controller.indexInit
);
page(
  '/meditation/:meditation',
  controller.fetchMeditations,
  controller.meditationInit
);
page(
  '/journal/new',
  controller.editorInit
);
page(
  '/journal/archive',
  controller.journalTemplate,
  controller.archiveInit
);
page(
  '/resources',
  controller.resourcesInit
);
page(
  '/about',
  controller.aboutInit
);
page(
  '/login',
  controller.loginInit
);
page.start();
