// vite.config.js
import { defineConfig, loadEnv } from "file:///C:/program1/DocTranslator/frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/program1/DocTranslator/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///C:/program1/DocTranslator/frontend/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\program1\\DocTranslator\\frontend";
var resolve = (dir) => path.resolve(process.cwd(), dir);
var vite_config_default = defineConfig({
  base: "./",
  // 确保这里没有设置为 '/'
  plugins: [vue(), createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [resolve("src/icons/svg")],
    // iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: "icon-[dir]-[name]"
  })],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src"),
      "@assets": path.resolve(__vite_injected_original_dirname, "./src/assets")
    },
    base: "./",
    build: {
      assetsDir: "static"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9ncmFtMVxcXFxEb2NUcmFuc2xhdG9yXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxwcm9ncmFtMVxcXFxEb2NUcmFuc2xhdG9yXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9wcm9ncmFtMS9Eb2NUcmFuc2xhdG9yL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmNvbnN0IHJlc29sdmUgPSAoZGlyKSA9PiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZGlyKVxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIGJhc2U6ICcuLycsIC8vIFx1Nzg2RVx1NEZERFx1OEZEOVx1OTFDQ1x1NkNBMVx1NjcwOVx1OEJCRVx1N0Y2RVx1NEUzQSAnLydcclxuICAgIHBsdWdpbnM6IFt2dWUoKSxjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgICBpY29uRGlyczogW3Jlc29sdmUoJ3NyYy9pY29ucy9zdmcnKV0sXHJcbiAgICAgIC8vIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxyXG4gICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxyXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJ1xyXG4gICAgfSldLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAnL2FwaSc6IHtcclxuICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo1MDAwJyxcclxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXHJcbn0gICAgIFxyXG4gIH1cclxufSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhczoge1xyXG4gICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgICAgICAgICdAYXNzZXRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmFzZTogJy4vJyxcclxuICAgICAgICBidWlsZDp7XHJcbiAgICAgICAgICAgIGFzc2V0c0RpcjpcInN0YXRpY1wiLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUyxTQUFTLGNBQWEsZUFBZTtBQUNyVSxPQUFPLFNBQVM7QUFDaEIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU0sVUFBVSxDQUFDLFFBQVEsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLEdBQUc7QUFHeEQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsTUFBTTtBQUFBO0FBQUEsRUFDTixTQUFTLENBQUMsSUFBSSxHQUFFLHFCQUFxQjtBQUFBO0FBQUEsSUFFbkMsVUFBVSxDQUFDLFFBQVEsZUFBZSxDQUFDO0FBQUE7QUFBQTtBQUFBLElBR25DLFVBQVU7QUFBQSxFQUNaLENBQUMsQ0FBQztBQUFBLEVBQ0YsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ1QsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDQSxVQUFTQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDbEQ7QUFBQSxJQUNFO0FBQUEsRUFDRjtBQUFBLEVBQ0ksU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3BDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxJQUNuRDtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sT0FBTTtBQUFBLE1BQ0YsV0FBVTtBQUFBLElBQ2Q7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
