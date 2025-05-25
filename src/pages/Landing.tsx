import { motion } from "motion/react";
import type React from "react";
import type { JSX } from "react";
import {
	GoCode,
	GoEye,
	GoGitMerge,
	GoPackage,
	GoPaperAirplane,
	GoRepo,
	GoShieldCheck,
	GoSync,
} from "react-icons/go";

function InfoBox({
	icon,
	title,
	description,
	delay,
}: {
	icon: JSX.Element;
	title: string;
	description: string;
	delay: number;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0, transition: { delay } }}
			className="bg-surface rounded-lg p-4 card w-full h-full border-border border-1"
		>
			<div className="card-content p-4">
				<div className="flex flex-row items-center gap-2 mb-2">
					{icon}
					<p className="text-xl">{title}</p>
				</div>
				<p className="text-secondary-text">{description}</p>
			</div>
		</motion.div>
	);
}

export function Landing() {
	const onMouseMove = (e: React.MouseEvent) => {
		for (const card of document.getElementsByClassName("card")) {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			card.style.setProperty("--mouse-x", `${x}px`);
			card.style.setProperty("--mouse-y", `${y}px`);
		}
	};

	return (
		<div className="bg-background w-full h-full text-text">
			<div className="w-full flex flex-col items-center pt-20">
				<motion.p
					className="text-8xl font-bold"
					initial={{
						opacity: 0,
						y: -50,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
				>
					DFRS
				</motion.p>
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
				<motion.div
					initial={{
						clipPath: "inset(0 100% 0 0)",
					}}
					animate={{
						clipPath: "inset(0 0% 0 0)",
						transition: { delay: 5, duration: 0.5, ease: "easeOut" },
					}}
					className="mt-8 flex flex-row gap-4"
				>
					<div className="px-4 py-2 flex flex-row items-center gap-2 bg-surface border-border border-1 cursor-pointer rounded select-none hover:bg-surface-hover active:bg-surface-active transition-colors">
						<GoRepo />
						Documentation
					</div>
					<div className="px-4 py-2 flex flex-row items-center gap-2 bg-primary hover:bg-primary-hover active:bg-primary-active transition-colors cursor-pointer rounded select-none">
						<GoPaperAirplane />
						Getting Started
					</div>
				</motion.div>
			</div>
			<div
				id="cards"
				onMouseMove={onMouseMove}
				className="flex flex-row flex-wrap items-center  justify-center gap-2 mt-12 mx-20"
			>
				<InfoBox
					icon={<GoEye size={25} />}
					title="Quick Overview"
					description="View all your code at a glance, without moving around an entire codespace or looking into chests"
					delay={2}
				/>
				<InfoBox
					icon={<GoSync size={25} />}
					title="Easy Updates"
					description="Quickly send updated code to DiamondFire using many integrated APIs such as CodeClient"
					delay={2.5}
				/>
				<InfoBox
					icon={<GoShieldCheck size={25} />}
					title="Robust Code"
					description="Write solid code that never breaks using compile-time argument and typechecking"
					delay={3}
				/>
				<InfoBox
					icon={<GoGitMerge size={25} />}
					title="Version Control"
					description="Use version control to improve developer experience and collaboration possibilities"
					delay={3.5}
				/>
				<InfoBox
					icon={<GoPackage size={25} />}
					title="Libraries"
					description="Easily create and use libraries to reuse code between projects"
					delay={4}
				/>
				<InfoBox
					icon={<GoCode size={25} />}
					title="IDE Integration"
					description="Create games faster and easier using autocomplete and error highlighting"
					delay={4.5}
				/>
			</div>
		</div>
	);
}
