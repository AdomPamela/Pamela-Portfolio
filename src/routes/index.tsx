import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/nav";
import { PortfolioPage } from "@/components/portfolio/portfolio-page";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Pamela Adom Osom Boafo — Software Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Pamela Adom Osom Boafo — Software Engineer, Full-Stack Developer and AI Application Builder creating web, mobile and AI-powered products.",
      },
      { property: "og:title", content: "Pamela Adom Osom Boafo — Software Engineer & Full-Stack Developer" },
      {
        property: "og:description",
        content:
          "Building intelligent software solutions with code, creativity, and AI — full-stack, mobile and AI application development.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Pamela Adom Osom Boafo — Software Engineer & Full-Stack Developer" },
      {
        name: "twitter:description",
        content:
          "Software Engineer · Full-Stack Developer · AI Application Builder — based in Chengdu, China.",
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
