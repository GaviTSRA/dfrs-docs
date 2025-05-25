import mdx from "@mdx-js/rollup";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	base: "/dfrs-docs/",
	plugins: [
		{
			enforce: "pre",
			...mdx({
				/* jsxImportSource: …, otherOptions… */
			}),
		},
		react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
		tailwindcss(),
	],
});
