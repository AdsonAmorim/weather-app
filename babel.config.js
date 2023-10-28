module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@hooks": "./src/hooks",
            "@service": "./src/service",
            "@styles": "./src/styles",
            "@utils": "./src/utils",
            "@components": "./src/components",
          },
        },
      ],
    ],
  };
};
