import { motion } from "motion/react";
import type React from "react";
import type { JSX } from "react";
import {
	GoAlert,
	GoClock,
	GoCode,
	GoEye,
	GoGitMerge,
	GoInfo,
	GoPackage,
	GoPaperAirplane,
	GoRepo,
	GoShieldCheck,
	GoSync,
} from "react-icons/go";
import { useNavigate } from "react-router";

function InfoBox({
	icon,
	title,
	description,
	beta = false,
	soon = false,
}: {
	icon: JSX.Element;
	title: string;
	description: string;
	beta?: boolean;
	soon?: boolean;
}) {
	return (
		<div className="bg-surface rounded-lg p-4 card w-full h-full border-border border-1">
			<div className="card-content p-4">
				<div className="flex flex-row items-center gap-2 mb-2">
					{icon}
					<p className="text-xl">{title}</p>
					{beta && (
						<div className="flex flex-row gap-1 ml-auto bg-warn text-text-dark items-center rounded-xl px-4 py-1">
							<GoInfo strokeWidth={0.5} className="mt-[2.5px]" />
							<p>Beta</p>
						</div>
					)}
					{soon && (
						<div className="flex flex-row gap-1 ml-auto bg-primary text-text-dark items-center rounded-xl px-4 py-1">
							<GoClock strokeWidth={0.5} className="mt-[2.5px]" />
							<p>Soon</p>
						</div>
					)}
				</div>
				<p className="text-text-secondary">{description}</p>
			</div>
		</div>
	);
}

export function Landing() {
	const onMouseMove = (e: React.MouseEvent) => {
		for (const card of document.getElementsByClassName("card")) {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			// @ts-expect-error Type is wrong
			card.style.setProperty("--mouse-x", `${x}px`);
			// @ts-expect-error Type is wrong
			card.style.setProperty("--mouse-y", `${y}px`);
		}
	};

	const navigate = useNavigate();

	return (
		<div className="w-full h-full text-text-title">
			<div className="w-full flex flex-col items-center pt-20">
				<p className="text-8xl font-bold">DFRS</p>
				<motion.p
					initial={{
						clipPath: "inset(0 100% 0 0)",
					}}
					animate={{
						clipPath: "inset(0 0% 0 0)",
						transition: { delay: 1, duration: 0.5, ease: "easeOut" },
					}}
					className="text-2xl"
				>
					A DiamondFire Programming Language
				</motion.p>
				<div className="mt-8 flex flex-row gap-4">
					<div
						className="px-4 py-2 flex flex-row items-center gap-2 bg-surface border-border border-1 cursor-pointer rounded select-none hover:bg-surface-hover active:bg-surface-active transition-colors"
						onClick={() => navigate("/docs/")}
					>
						<GoRepo />
						Documentation
					</div>
					<div
						className="px-4 py-2 flex flex-row items-center gap-2 bg-primary hover:bg-primary-hover active:bg-primary-active transition-colors cursor-pointer rounded select-none"
						onClick={() => navigate("/docs/getting-started")}
					>
						<GoPaperAirplane />
						Getting Started
					</div>
				</div>
			</div>
			<div
				id="cards"
				onMouseMove={onMouseMove}
				className="flex flex-row flex-wrap items-center justify-center gap-2 py-12 mx-20"
			>
				<InfoBox
					icon={<GoEye size={25} />}
					title="Quick Overview"
					description="View all your code at a glance, without having to move around a 3D codespace and look into chests"
				/>
				<InfoBox
					icon={<GoSync size={25} />}
					title="Easy Updates"
					description="Quickly send updated code to DiamondFire using integrated APIs such as CodeClient"
				/>
				<InfoBox
					icon={<GoShieldCheck size={25} />}
					title="Robust Code"
					description="Write code that never breaks using compile-time argument and type checks"
				/>
				<InfoBox
					icon={<GoGitMerge size={25} />}
					title="Version Control"
					description="Use version control to improve developer experience and collaboration possibilities"
				/>
				<InfoBox
					icon={<GoPackage size={25} />}
					title="Libraries"
					description="Easily create and use libraries to reuse code between projects"
					soon
				/>
				<InfoBox
					icon={<GoCode size={25} />}
					title="IDE Integration"
					description="Speed up development using autocomplete and error highlighting directly in your IDE"
					beta
				/>
			</div>
		</div>
	);
}
