import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }
    // This will be connected to GPT Engineer on your server
    console.log("Prompt submitted:", prompt);
    toast({
      title: "Success",
      description: "Prompt submitted successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-4 space-y-4">
      <h2 className="text-matrix-title font-code text-xl">GPT Engineer Prompt</h2>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want to build..."
        className="min-h-[120px] font-code bg-matrix-dark text-matrix-primary border-matrix-primary/50"
      />
      <Button 
        type="submit"
        className="w-full bg-matrix-primary text-matrix-dark hover:bg-matrix-secondary"
      >
        Generate Project
      </Button>
    </form>
  );
};