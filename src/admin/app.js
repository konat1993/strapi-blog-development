const config = {
  locales: ["pl"],
  // translations: {
  //   pl: {
  //     "content-manager.popUpWarning.warning.unpublish-question": "Czy na pewno chcesz cofnąć publikację ziomek?"
  //   }
  // }
  // translations: {
  //   en: {
  //     "app.components.LeftMenu.plugins": "Pluginsy ziomek"
  //   }
  // }
  // I've noticed that you can also change e.g. plugin name here (and it has more important weight)
  // Than in plugins/github-projects/admin/src/translations/pl.json file
  // But probably better to use custom translations in custom plugins
  // As strapi prepared this file structure for us
  // to apply this we need to import internationalization hook inside Repo.js
  // BUT if you want to extract your custom plugin to npm package you better make internationalization
  // inside pl.json inside plugin, not here
  // translations: {
  //   pl: {
  //     "github-projects.plugin.name": "GH plugin ziomek"
  //   },
  //   en: {
  //     "github-projects.repo.name": "Name of column mate"
  //   }
  // }
  // translations: {
  //   pl: {
  //     "content-type-builder.plugin.name": "CTB ziomek"
  //   }
  // }
  // config: {
  //   notifications: {
  //     release: false
  //   }
  // }
  // theme: {
  //   colors: {
  //     buttonPrimary600: "#c2c97ad",
  //     primary600: "#c2c97ad"
  //   }
  // }
}

const bootstrap = app => {
  console.log(app)
}

export default {
  config,
  bootstrap,
}
