import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your OpenAI API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4860/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, apiKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate project');
      }

      toast({
        title: "Success",
        description: "Project generation started",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to connect to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-4 space-y-4">
      <h2 className="text-matrix-title font-code text-xl">GPT Engineer Prompt</h2>
      <div className="space-y-2">
        <label htmlFor="apiKey" className="text-matrix-primary text-sm">OpenAI API Key</label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="font-code bg-matrix-dark text-matrix-primary border-matrix-primary/50"
        />
      </div>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want to build..."
        className="min-h-[120px] font-code bg-matrix-dark text-matrix-primary border-matrix-primary/50"
      />
      <Button 
        type="submit"
        className="w-full bg-matrix-primary text-matrix-dark hover:bg-matrix-secondary"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Project"}
      </Button>
    </form>
  );
};