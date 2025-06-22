import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import dfrs from "./dfrs.tmLanguage.json";

let highlighter: Awaited<ReturnType<typeof createHighlighter>>;

async function getHighlighter() {
	if (!highlighter) {
		highlighter = await createHighlighter({
			themes: ["dark-plus"],
			langs: [dfrs],
		});
	}
	return highlighter;
}

export function CodeBlock({
	className = "",
	code,
}: {
	className?: string;
	code: string;
}) {
	const [html, setHtml] = useState("");
	const lang = className.replace(/^language-/, "") || "dfrs";

	useEffect(() => {
		getHighlighter().then((highlighter) => {
			const html = highlighter.codeToHtml(code, {
				lang,
				theme: "dark-plus",
				colorReplacements: {
					"#1e1e1e": "var(--color-surface)",
				},
			});
			setHtml(html);
		});
	}, [code, lang]);

	// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for code shiki
	return <div className="w-fit" dangerouslySetInnerHTML={{ __html: html }} />;
}
