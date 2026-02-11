// vite.config.ts
import { loadEnv } from "file:///C:/program1/DocTranslator/admin/node_modules/vite/dist/node/index.js";
import path, { resolve } from "path";
import vue from "file:///C:/program1/DocTranslator/admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/program1/DocTranslator/admin/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/program1/DocTranslator/admin/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import svgLoader from "file:///C:/program1/DocTranslator/admin/node_modules/vite-svg-loader/index.js";
import UnoCSS from "file:///C:/program1/DocTranslator/admin/node_modules/unocss/dist/vite.mjs";
var __vite_injected_original_dirname = "C:\\program1\\DocTranslator\\admin";
var vite_config_default = ({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());
  const { VITE_PUBLIC_PATH } = viteEnv;
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        "@": resolve(__vite_injected_original_dirname, "./src")
      }
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      // proxy: {
      //   "/api": {
      //     target: "http://127.0.0.1:5000",
      //     ws: true,
      //     rewrite: (path) => path.replace(/^\/api/, ""),
      //     /** 是否允许跨域 */
      //     changeOrigin: true
      //   }
      // },
      /** 预热常用文件，提高初始页面加载速度 */
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    build: {
      /** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
      chunkSizeWarningLimit: 2048,
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      rollupOptions: {
        output: {
          /**
           * 分块策略
           * 1. 注意这些包名必须存在，否则打包会报错
           * 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"],
            vxe: ["vxe-table", "vxe-table-plugin-element", "xe-utils"]
          }
        }
      }
    },
    /** 混淆器 */
    esbuild: mode === "development" ? void 0 : {
      /** 打包时移除 console.log */
      pure: ["console.log"],
      /** 打包时移除 debugger */
      drop: ["debugger"],
      /** 打包时移除所有注释 */
      legalComments: "none"
    },
    /** Vite 插件 */
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      /** UnoCSS */
      UnoCSS()
    ]
    /** Vitest 单元测试配置：https://cn.vitest.dev/config */
    // test: {
    //   include: ["tests/**/*.test.ts"],
    //   environment: "jsdom"
    // }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9ncmFtMVxcXFxEb2NUcmFuc2xhdG9yXFxcXGFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxwcm9ncmFtMVxcXFxEb2NUcmFuc2xhdG9yXFxcXGFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9wcm9ncmFtMS9Eb2NUcmFuc2xhdG9yL2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5cclxuaW1wb3J0IHsgdHlwZSBDb25maWdFbnYsIHR5cGUgVXNlckNvbmZpZ0V4cG9ydCwgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCJcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCJcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCJcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiXHJcbmltcG9ydCBzdmdMb2FkZXIgZnJvbSBcInZpdGUtc3ZnLWxvYWRlclwiXHJcbmltcG9ydCBVbm9DU1MgZnJvbSBcInVub2Nzcy92aXRlXCJcclxuXHJcbi8qKiBcdTkxNERcdTdGNkVcdTk4NzlcdTY1ODdcdTY4NjNcdUZGMUFodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnICovXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZ0V4cG9ydCA9PiB7XHJcbiAgY29uc3Qgdml0ZUVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSkgYXMgSW1wb3J0TWV0YUVudlxyXG4gIGNvbnN0IHsgVklURV9QVUJMSUNfUEFUSCB9ID0gdml0ZUVudlxyXG4gIHJldHVybiB7XHJcbiAgICAvKiogXHU2MjUzXHU1MzA1XHU2NUY2XHU2ODM5XHU2MzZFXHU1QjlFXHU5NjQ1XHU2MEM1XHU1MUI1XHU0RkVFXHU2NTM5IGJhc2UgKi9cclxuICAgIGJhc2U6IFZJVEVfUFVCTElDX1BBVEgsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgLyoqIEAgXHU3QjI2XHU1M0Y3XHU2MzA3XHU1NDExIHNyYyBcdTc2RUVcdTVGNTUgKi9cclxuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIilcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICAvKiogXHU4QkJFXHU3RjZFIGhvc3Q6IHRydWUgXHU2MjREXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IE5ldHdvcmsgXHU3Njg0XHU1RjYyXHU1RjBGXHVGRjBDXHU0RUU1IElQIFx1OEJCRlx1OTVFRVx1OTg3OVx1NzZFRSAqL1xyXG4gICAgICBob3N0OiB0cnVlLCAvLyBob3N0OiBcIjAuMC4wLjBcIlxyXG4gICAgICAvKiogXHU3QUVGXHU1M0UzXHU1M0Y3ICovXHJcbiAgICAgIHBvcnQ6IDMzMzMsXHJcbiAgICAgIC8qKiBcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTYyNTNcdTVGMDBcdTZENEZcdTg5QzhcdTU2NjggKi9cclxuICAgICAgb3BlbjogZmFsc2UsXHJcbiAgICAgIC8qKiBcdThERThcdTU3REZcdThCQkVcdTdGNkVcdTUxNDFcdThCQjggKi9cclxuICAgICAgY29yczogdHJ1ZSxcclxuICAgICAgLyoqIFx1N0FFRlx1NTNFM1x1ODhBQlx1NTM2MFx1NzUyOFx1NjVGNlx1RkYwQ1x1NjYyRlx1NTQyNlx1NzZGNFx1NjNBNVx1OTAwMFx1NTFGQSAqL1xyXG4gICAgICBzdHJpY3RQb3J0OiBmYWxzZSxcclxuICAgICAgLyoqIFx1NjNBNVx1NTNFM1x1NEVFM1x1NzQwNiAqL1xyXG4gICAgICAvLyBwcm94eToge1xyXG4gICAgICAvLyAgIFwiL2FwaVwiOiB7XHJcbiAgICAgIC8vICAgICB0YXJnZXQ6IFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwXCIsXHJcbiAgICAgIC8vICAgICB3czogdHJ1ZSxcclxuICAgICAgLy8gICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSxcclxuICAgICAgLy8gICAgIC8qKiBcdTY2MkZcdTU0MjZcdTUxNDFcdThCQjhcdThERThcdTU3REYgKi9cclxuICAgICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxyXG4gICAgICAvLyAgIH1cclxuICAgICAgLy8gfSxcclxuICAgICAgLyoqIFx1OTg4NFx1NzBFRFx1NUUzOFx1NzUyOFx1NjU4N1x1NEVGNlx1RkYwQ1x1NjNEMFx1OUFEOFx1NTIxRFx1NTlDQlx1OTg3NVx1OTc2Mlx1NTJBMFx1OEY3RFx1OTAxRlx1NUVBNiAqL1xyXG4gICAgICB3YXJtdXA6IHtcclxuICAgICAgICBjbGllbnRGaWxlczogW1wiLi9zcmMvbGF5b3V0cy8qKi8qLnZ1ZVwiXVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgLyoqIFx1NTM1NVx1NEUyQSBjaHVuayBcdTY1ODdcdTRFRjZcdTc2ODRcdTU5MjdcdTVDMEZcdThEODVcdThGQzcgMjA0OEtCIFx1NjVGNlx1NTNEMVx1NTFGQVx1OEI2Nlx1NTQ0QSAqL1xyXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwNDgsXHJcbiAgICAgIC8qKiBcdTc5ODFcdTc1MjggZ3ppcCBcdTUzOEJcdTdGMjlcdTU5MjdcdTVDMEZcdTYyQTVcdTU0NEEgKi9cclxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxyXG4gICAgICAvKiogXHU2MjUzXHU1MzA1XHU1NDBFXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU3NkVFXHU1RjU1ICovXHJcbiAgICAgIGFzc2V0c0RpcjogXCJzdGF0aWNcIixcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBcdTUyMDZcdTU3NTdcdTdCNTZcdTc1NjVcclxuICAgICAgICAgICAqIDEuIFx1NkNFOFx1NjEwRlx1OEZEOVx1NEU5Qlx1NTMwNVx1NTQwRFx1NUZDNVx1OTg3Qlx1NUI1OFx1NTcyOFx1RkYwQ1x1NTQyNlx1NTIxOVx1NjI1M1x1NTMwNVx1NEYxQVx1NjJBNVx1OTUxOVxyXG4gICAgICAgICAgICogMi4gXHU1OTgyXHU2NzlDXHU0RjYwXHU0RTBEXHU2MEYzXHU4MUVBXHU1QjlBXHU0RTQ5IGNodW5rIFx1NTIwNlx1NTI3Mlx1N0I1Nlx1NzU2NVx1RkYwQ1x1NTNFRlx1NEVFNVx1NzZGNFx1NjNBNVx1NzlGQlx1OTY2NFx1OEZEOVx1NkJCNVx1OTE0RFx1N0Y2RVxyXG4gICAgICAgICAgICovXHJcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgICAgdnVlOiBbXCJ2dWVcIiwgXCJ2dWUtcm91dGVyXCIsIFwicGluaWFcIl0sXHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IFtcImVsZW1lbnQtcGx1c1wiLCBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCJdLFxyXG4gICAgICAgICAgICB2eGU6IFtcInZ4ZS10YWJsZVwiLCBcInZ4ZS10YWJsZS1wbHVnaW4tZWxlbWVudFwiLCBcInhlLXV0aWxzXCJdXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqIFx1NkRGN1x1NkRDNlx1NTY2OCAqL1xyXG4gICAgZXNidWlsZDpcclxuICAgICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiXHJcbiAgICAgICAgPyB1bmRlZmluZWRcclxuICAgICAgICA6IHtcclxuICAgICAgICAgICAgLyoqIFx1NjI1M1x1NTMwNVx1NjVGNlx1NzlGQlx1OTY2NCBjb25zb2xlLmxvZyAqL1xyXG4gICAgICAgICAgICBwdXJlOiBbXCJjb25zb2xlLmxvZ1wiXSxcclxuICAgICAgICAgICAgLyoqIFx1NjI1M1x1NTMwNVx1NjVGNlx1NzlGQlx1OTY2NCBkZWJ1Z2dlciAqL1xyXG4gICAgICAgICAgICBkcm9wOiBbXCJkZWJ1Z2dlclwiXSxcclxuICAgICAgICAgICAgLyoqIFx1NjI1M1x1NTMwNVx1NjVGNlx1NzlGQlx1OTY2NFx1NjI0MFx1NjcwOVx1NkNFOFx1OTFDQSAqL1xyXG4gICAgICAgICAgICBsZWdhbENvbW1lbnRzOiBcIm5vbmVcIlxyXG4gICAgICAgICAgfSxcclxuICAgIC8qKiBWaXRlIFx1NjNEMlx1NEVGNiAqL1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgdnVlSnN4KCksXHJcbiAgICAgIC8qKiBcdTVDMDYgU1ZHIFx1OTc1OVx1NjAwMVx1NTZGRVx1OEY2Q1x1NTMxNlx1NEUzQSBWdWUgXHU3RUM0XHU0RUY2ICovXHJcbiAgICAgIHN2Z0xvYWRlcih7IGRlZmF1bHRJbXBvcnQ6IFwidXJsXCIgfSksXHJcbiAgICAgIC8qKiBTVkcgKi9cclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIFwic3JjL2ljb25zL3N2Z1wiKV0sXHJcbiAgICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxyXG4gICAgICB9KSxcclxuICAgICAgLyoqIFVub0NTUyAqL1xyXG4gICAgICBVbm9DU1MoKVxyXG4gICAgXVxyXG4gICAgLyoqIFZpdGVzdCBcdTUzNTVcdTUxNDNcdTZENEJcdThCRDVcdTkxNERcdTdGNkVcdUZGMUFodHRwczovL2NuLnZpdGVzdC5kZXYvY29uZmlnICovXHJcbiAgICAvLyB0ZXN0OiB7XHJcbiAgICAvLyAgIGluY2x1ZGU6IFtcInRlc3RzLyoqLyoudGVzdC50c1wiXSxcclxuICAgIC8vICAgZW52aXJvbm1lbnQ6IFwianNkb21cIlxyXG4gICAgLy8gfVxyXG4gIH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBZ0QsZUFBZTtBQUMvRCxPQUFPLFFBQVEsZUFBZTtBQUM5QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZUFBZTtBQUN0QixPQUFPLFlBQVk7QUFSbkIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFtQztBQUN4RCxRQUFNLFVBQVUsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQzNDLFFBQU0sRUFBRSxpQkFBaUIsSUFBSTtBQUM3QixTQUFPO0FBQUE7QUFBQSxJQUVMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQTtBQUFBLFFBRUwsS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUE7QUFBQSxNQUVOLE1BQU07QUFBQTtBQUFBLE1BRU4sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUE7QUFBQSxNQUVOLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFZWixRQUFRO0FBQUEsUUFDTixhQUFhLENBQUMsd0JBQXdCO0FBQUEsTUFDeEM7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLHVCQUF1QjtBQUFBO0FBQUEsTUFFdkIsc0JBQXNCO0FBQUE7QUFBQSxNQUV0QixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTU4sY0FBYztBQUFBLFlBQ1osS0FBSyxDQUFDLE9BQU8sY0FBYyxPQUFPO0FBQUEsWUFDbEMsU0FBUyxDQUFDLGdCQUFnQix5QkFBeUI7QUFBQSxZQUNuRCxLQUFLLENBQUMsYUFBYSw0QkFBNEIsVUFBVTtBQUFBLFVBQzNEO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFNBQ0UsU0FBUyxnQkFDTCxTQUNBO0FBQUE7QUFBQSxNQUVFLE1BQU0sQ0FBQyxhQUFhO0FBQUE7QUFBQSxNQUVwQixNQUFNLENBQUMsVUFBVTtBQUFBO0FBQUEsTUFFakIsZUFBZTtBQUFBLElBQ2pCO0FBQUE7QUFBQSxJQUVOLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQTtBQUFBLE1BRVAsVUFBVSxFQUFFLGVBQWUsTUFBTSxDQUFDO0FBQUE7QUFBQSxNQUVsQyxxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGVBQWUsQ0FBQztBQUFBLFFBQ3ZELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsT0FBTztBQUFBLElBQ1Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
