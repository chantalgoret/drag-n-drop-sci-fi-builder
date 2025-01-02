import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { DragDropArea } from "@/components/DragDropArea";
import { MatrixRain } from "@/components/MatrixRain";
import { PromptInput } from "@/components/PromptInput";

const Index = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Web Scraper", description: "A Python-based web scraper" },
    { id: 2, name: "Chat Bot", description: "An AI-powered chatbot" },
  ]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-matrix-dark overflow-hidden relative">
        <MatrixRain />
        <ProjectSidebar projects={projects} />
        <main className="flex-1 p-6 space-y-6">
          <PromptInput />
          <DragDropArea projects={projects} setProjects={setProjects} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;