module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@": ".",
          },
        },
      ],
      [
        "transform-remove-console",
        {
          exclude: ["error", "warn"],
        },
      ],
    ],
    env: {
      production: {
        plugins: ["transform-remove-console"],
      },
    },
  };
};
