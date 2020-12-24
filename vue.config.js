module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `
                    @import "src/scss/variables/colors";
                    @import "src/scss/variables/fonts";
                    @import "src/scss/variables/border";
                    @import "src/scss/variables/image";
                `
            }
        }
    }
};