import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

export function CodeBlock({
	className = "",
	code,
}: {
	className?: string;
	code: string;
}) {
	const [html, setHtml] = useState("");
	const lang = className.replace(/^language-/, "") || "dfrs";

	console.info(code);

	useEffect(() => {
		async function highlight() {
			const dfrs = await fetch("/dfrs-docs/dfrs.tmLanguage.json").then((res) =>
				res.json(),
			);

			const highlighter = await createHighlighter({
				themes: ["dark-plus"],
				langs: [dfrs],
			});

			const html = highlighter.codeToHtml(code, {
				lang,
				theme: "dark-plus",
				colorReplacements: {
					"#1e1e1e": "var(--color-surface)",
				},
			});
			setHtml(html);
		}

		highlight();
	}, [code, lang]);

	// biome-ignore lint/security/noDangerouslySetInnerHtml: Required for code shiki
	return <div className="w-fit" dangerouslySetInnerHTML={{ __html: html }} />;
}
