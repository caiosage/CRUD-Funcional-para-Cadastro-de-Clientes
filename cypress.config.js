const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: false, // Desativa a gravação de vídeo para economizar memória no GitHub Actions

  e2e: {
    baseUrl: 'http://localhost:5500', // Define o endereço padrão do seu frontend
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});