import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/nav";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Pamela Adom Osom Boafo — AI Engineer & Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Pamela Adom Osom Boafo — Software Engineer and AI Developer building intelligent systems and healthtech-focused applications.",
      },
      { property: "og:title", content: "Pamela Adom Osom Boafo — AI Engineer & Software Developer" },
      {
        property: "og:description",
        content:
          "Building modern software, AI systems, and intelligent digital experiences that solve meaningful problems.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Pamela Adom Osom Boafo — AI Engineer & Software Developer" },
      {
        name: "twitter:description",
        content:
          "Software Engineer · AI Developer · Future ML Researcher — based in Chengdu, from Ghana.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  return (
    <>
      <Nav />
      <main>
        <PortfolioPage />
      </main>
    </>
  );
}
