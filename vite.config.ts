import { fileURLToPath, URL } from 'node:url';
import * as path from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueMacros from 'unplugin-vue-macros/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import UnoCSS from 'unocss/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
//浏览器兼容
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // vue(),
    VueMacros({
      plugins: {
        vue: vue({
          script: {
            defineModel: true
          }
        })
      },
      defineModels: {
        unified: false
      }
    }),
    UnoCSS(),
    legacy({
      targets: ['chrome 52', 'not IE 11'],
      modernPolyfills: ['es.string.replace', 'esnext.string.replace-all'],
      polyfills: ['es.string.replace', 'esnext.string.replace-all']
    }),
    AutoImport({
      imports: ['vue'],
      dts: 'src/types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      extensions: ['vue'],
      dts: 'src/types/components.d.ts',
      dirs: ['src/components']
    }),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   proxy: {
  //     '^/api': {
  //       target: 'https://obd-test.ghmcchina.com:9800',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // },
  build: {
    outDir: 'dist',
    minify: 'terser', //压缩方式
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    sourcemap: false,
    terserOptions: {
      compress: {
        // 生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        //静态资源分类打包
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
