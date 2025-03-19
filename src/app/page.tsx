import Layout from "@/components/layout/Layout";
import Hero from "@/components/cv/Hero";
import Experience from "@/components/cv/Experience";
import Skills from "@/components/cv/Skills";
import ChatInterface from "@/components/llm/ChatInterface";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ChatInterface />
      <Experience />
      <Skills />
    </Layout>
  );
}
