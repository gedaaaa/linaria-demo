export default {
  displayName: 'ui-content',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory: '../../../coverage/apps/seo-submodule/ui-content',
  preset: '../../../jest.seo-submodule.preset.swc.ts',
};
