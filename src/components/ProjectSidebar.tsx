import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FolderGit2, Plus } from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
}

export const ProjectSidebar = ({ projects }: { projects: Project[] }) => {
  return (
    <Sidebar className="glass-panel border-r border-matrix-primary/20 relative z-20">
      <SidebarHeader className="p-4 flex items-center justify-between">
        <h2 className="text-matrix-title font-code text-xl">GPT Engineer</h2>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <button className="w-full flex items-center gap-2 px-4 py-2 rounded-md bg-matrix-primary/10 hover:bg-matrix-primary/20 text-matrix-primary transition-colors">
            <Plus size={18} />
            <span>New Project</span>
          </button>
        </div>
        <div className="mt-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="px-4 py-3 hover:bg-matrix-primary/10 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <FolderGit2 size={18} className="text-matrix-primary" />
                <span className="font-medium text-matrix-title">{project.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};