import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		target: "esnext",
		minify: "terser",
		sourcemap: false,
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom"],
					craftjs: ["@craftjs/core"],
					ui: ["@emotion/styled", "@emotion/react", "@mui/material"],
				},
			},
		},
	},
	optimizeDeps: {
		include: ["react", "react-dom", "@craftjs/core"],
	},
	server: {
		port: 3000,
		open: true,
	},
});
