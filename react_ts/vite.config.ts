import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginImp from 'vite-plugin-imp';
import { getThemeVariables } from 'antd/dist/theme';


export default defineConfig({
  plugins: [
    // ...
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      // { find: '@', replacement: path.resolve(__dirname, 'src') },
      // fix less import by: @import ~
      // https://github.com/vitejs/vite/issues/2185#issuecomment-784637827
      { find: /^~/, replacement: '' },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { 'font-size-base': '16px' },
        // modifyVars: getThemeVariables({
        //   // dark: true,
        //   // compact: true,
        //   // 'success-color': '#f1f1f1'
        // }),
        javascriptEnabled: true,
      },
    },
  },
});