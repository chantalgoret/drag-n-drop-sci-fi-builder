import { useState } from "react";
import { MoveHorizontal } from "lucide-react";

interface Project {
  id: number;
  name: string;
  description: string;
}

interface Props {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
}

export const DragDropArea = ({ projects, setProjects }: Props) => {
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggingId(id);
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    const sourceId = parseInt(e.dataTransfer.getData("text/plain"));
    
    if (sourceId === targetId) return;

    const newProjects = [...projects];
    const sourceIndex = projects.findIndex((p) => p.id === sourceId);
    const targetIndex = projects.findIndex((p) => p.id === targetId);
    
    const [removed] = newProjects.splice(sourceIndex, 1);
    newProjects.splice(targetIndex, 0, removed);
    
    setProjects(newProjects);
    setDraggingId(null);
  };

  return (
    <div className="glass-panel p-6 min-h-[calc(100vh-3rem)]">
      <h1 className="text-3xl font-code text-matrix-primary mb-8">Projects</h1>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            draggable
            onDragStart={(e) => handleDragStart(e, project.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, project.id)}
            className={`glass-panel p-4 draggable transition-all duration-200 ${
              draggingId === project.id
                ? "opacity-50"
                : "hover:border-matrix-primary hover:matrix-glow"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-code text-matrix-primary">
                {project.name}
              </h3>
              <MoveHorizontal className="text-matrix-primary/50" />
            </div>
            <p className="mt-2 text-muted-foreground">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};