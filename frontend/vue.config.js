module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
						@import "@/styles/basics/_functions.scss";
						@import "@/styles/basics/_variables.scss";
						@import "@/styles/basics/_mixins.scss";
						@import "@/styles/basics/_typography.scss";
						@import "@/styles/basics/_base.scss";
						@import "@/styles/basics/_helpers.scss";
				`
      }
    }
  }
}
