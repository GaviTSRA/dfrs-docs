import { useNavigate, useParams } from "react-router";
import GettingStarted from "../doc/getting-started.mdx";
import { useMemo, type JSX } from "react";

type Section = {
	id: string;
	title: string;
	element: JSX.Element;
	children?: Section[];
};

const sections: Section[] = [
	{
		id: "getting-started",
		title: "Getting Started",
		element: <GettingStarted />,
	},
	{
		id: "concepts",
		title: "Concepts",
		element: <div>concepts</div>,
		children: [
			{
				id: "variables",
				title: "Variables",
				element: <p>vars</p>,
			},
			{
				id: "functions",
				title: "Functions",
				element: <p>functtions</p>,
			},
		],
	},
];

function SectionList({
	section,
	pathPrefix,
}: { section: Section; pathPrefix?: string }) {
	const navigate = useNavigate();

	return (
		<div>
			<p
				className="text-text-title hover:text-text-secondary cursor-pointer"
				onClick={() => {
					navigate(`/docs/${pathPrefix ? `${pathPrefix}.` : ""}${section.id}`);
				}}
				onKeyDown={() => {
					navigate(`/docs/${pathPrefix ? `${pathPrefix}.` : ""}${section.id}`);
				}}
			>
				{section.title}
			</p>
			<div className="ml-4">
				{section.children?.map((subSection) => (
					<SectionList
						key={subSection.id}
						section={subSection}
						pathPrefix={pathPrefix ? `${pathPrefix}.${section.id}` : section.id}
					/>
				))}
			</div>
		</div>
	);
}

export function Docs() {
	const { section } = useParams();
	const selectedSection = useMemo(() => {
		if (!section)
			return {
				id: "root",
				title: "Documentation",
				element: <p>Doc</p>,
			};

		let path = section.split(".");
		const firstPath = path[0];
		path = path.slice(1, path.length);

		let currentSection = sections.find((section) => section.id === firstPath);
		if (!currentSection) return undefined;

		for (const part of path) {
			if (!currentSection?.children) return undefined;
			currentSection = currentSection.children.find(
				(section) => section.id === part,
			);
		}

		return currentSection;
	}, [section]);

	if (!selectedSection) {
		return <p>Not found</p>;
	}

	return (
		<div className="grid grid-cols-[1fr_5fr] h-full gap-4">
			<div className="bg-surface h-full p-2 text-lg">
				{sections.map((section) => (
					<SectionList key={section.id} section={section} />
				))}
			</div>
			<div>{selectedSection.element}</div>
		</div>
	);
}
