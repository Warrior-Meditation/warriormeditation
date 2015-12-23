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
  controller.initEditor
);
page(
  '/journal/archive',
  controller.journalTemplate,
  controller.getJournalEntries
);
page.start();
