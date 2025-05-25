import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router";
import { Landing } from "./pages/Landing";
import { Docs } from "./pages/Docs";

const router = createHashRouter([
	{
		path: "/",
		element: <Landing />,
	},
	{
		path: "/docs/",
		element: <Docs />,
	},
	{
		path: "/docs/:section",
		element: <Docs />,
	},
]);

const root = document.getElementById("root");

if (!root) throw new Error("Expected root");

createRoot(root).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
