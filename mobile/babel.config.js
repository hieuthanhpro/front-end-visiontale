module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@': '.',
            '@/components': './components',
            '@/app': './app',
            '@/services': './services',
            '@/stores': './stores',
            '@/types': './types',
            '@/utils': './utils',
            '@/locales': './locales',
          },
        },
      ],
    ],
  };
};
