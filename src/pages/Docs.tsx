import { useNavigate, useParams } from "react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";

const pages = import.meta.glob("../doc/**/*.mdx");

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

  return (
    <div>
      <p
        className="text-text hover:text-text-secondary cursor-pointer"
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
    <div className="grid grid-cols-[1fr_5fr] h-full gap-4">
      <div className="bg-surface border-border border-r-1 h-full p-2 text-lg">
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
