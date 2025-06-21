import { useNavigate, useParams } from "react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const pages = import.meta.glob("../doc/**/*.mdx");
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { AnimatePresence, motion } from "motion/react";

type Section = {
	id: string;
	title: string;
	children?: Section[];
};

const sections: Section[] = [
	{
		id: "getting-started",
		title: "Getting Started",
	},
	{
		id: "basics",
		title: "Basics",
		children: [
			{
				id: "events",
				title: "Events",
			},
		],
	},
	{
		id: "concepts",
		title: "Concepts",
		children: [
			{
				id: "variables",
				title: "Variables",
			},
			{
				id: "functions",
				title: "Functions",
			},
		],
	},
];

function SectionList({
	section,
	pathPrefix,
}: {
	section: Section;
	pathPrefix?: string;
}) {
	const navigate = useNavigate();
	const { section: path } = useParams();
	const [collapsed, setCollapsed] = useState(true);

	const selected = path === (pathPrefix ? `${pathPrefix}.` : "") + section.id;

	useEffect(() => {
		if (path === (pathPrefix ? `${pathPrefix}.` : "") + section.id) {
			setCollapsed(false);
		}
		if (section.children) {
			for (const child of section.children) {
				if (
					path ===
					(pathPrefix ? `${pathPrefix}.${section.id}.` : `${section.id}.`) +
						child.id
				) {
					setCollapsed(false);
					return;
				}
			}
		}
	}, [path, pathPrefix, section]);

	return (
		<div>
			<motion.div
				initial={false}
				className="flex flex-row items-center gap-1 select-none"
			>
				<p
					className={`cursor-pointer text-base transition duration-300 ${selected ? "text-white hover:text-text-title font-semibold" : "text-text-title hover:text-text-secondary"}`}
					onClick={() => {
						setCollapsed(false);
						navigate(
							`/docs/${pathPrefix ? `${pathPrefix}.` : ""}${section.id}`,
						);
					}}
				>
					{section.title}
				</p>
				{section.children && (
					<div
						onClick={() => setCollapsed(!collapsed)}
						className="ml-auto cursor-pointer"
					>
						{collapsed && <GoChevronDown />}
						{!collapsed && <GoChevronUp />}
					</div>
				)}
			</motion.div>

			<AnimatePresence initial={false}>
				{!collapsed &&
					section.children &&
					section.children.map((subSection, index) => {
						const selected =
							path ===
							(pathPrefix ? `${pathPrefix}.${section.id}.` : `${section.id}.`) +
								subSection.id;
						return (
							<motion.div
								initial="collapsed"
								animate="open"
								exit="collapsed"
								variants={{
									open: { opacity: 1, height: "auto" },
									collapsed: { opacity: 0, height: 0 },
								}}
								transition={{
									delay: index * 0.05,
								}}
								className={`pl-4 transition duration-300 ${selected ? "border-primary border-l-2" : "border-border-hover border-l-1"}`}
								key={subSection.id}
							>
								<SectionList
									section={subSection}
									pathPrefix={
										pathPrefix ? `${pathPrefix}.${section.id}` : section.id
									}
								/>
							</motion.div>
						);
					})}
			</AnimatePresence>
		</div>
	);
}

export function Docs() {
	const { section } = useParams();
	const [Component, setComponent] = useState<React.LazyExoticComponent<
		React.ComponentType<any>
	> | null>(null);

	useEffect(() => {
		if (!section) {
			setComponent(null);
			return;
		}

		const basePath = `../doc/${section.replace(/\./g, "/")}`;
		const fullPath = pages[`${basePath}.mdx`]
			? `${basePath}.mdx`
			: `${basePath}/index.mdx`;
		const loader = pages[fullPath];

		if (loader) {
			setComponent(() => lazy(loader));
		} else {
			setComponent(null);
		}
	}, [section]);

	return (
		<div className="grid grid-cols-[1fr_6fr] h-full gap-4">
			<div className="bg-surface h-full p-2 text-lg border-r-1 border-border">
				{sections.map((section) => (
					<SectionList key={section.id} section={section} />
				))}
			</div>
			<div>
				<Suspense fallback={<p>Loading...</p>}>
					{Component ? <Component /> : <p>Not found</p>}
				</Suspense>
			</div>
		</div>
	);
}
