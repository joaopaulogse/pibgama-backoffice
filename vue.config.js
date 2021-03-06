module.exports = {
  pluginOptions: {
    i18n: {
      locale: "pt",
      fallbackLocale: "pt",
      localeDir: "locales",
      enableInSFC: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": __dirname + "/src"
      }
    }
  }
};
