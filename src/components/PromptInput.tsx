import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";
import { Switch } from "./ui/switch";
import { ScrollArea } from "./ui/scroll-area";

export const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("openai_api_key") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isLocalMode, setIsLocalMode] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  // Save API key to localStorage when it changes
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setApiKey(newKey);
    localStorage.setItem("openai_api_key", newKey);
  };

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
        body: JSON.stringify({ 
          prompt, 
          apiKey,
          mode: isLocalMode ? 'local' : 'server' 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate project');
      }

      // Set up SSE connection for real-time updates
      const eventSource = new EventSource('http://localhost:4860/api/status');
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setTerminalOutput(prev => [...prev, data.message]);
      };

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
      <div className="flex items-center justify-between">
        <h2 className="text-matrix-title font-code text-xl">GPT Engineer Prompt</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-matrix-primary">Server Mode</span>
          <Switch
            checked={isLocalMode}
            onCheckedChange={setIsLocalMode}
            className="data-[state=checked]:bg-matrix-primary"
          />
          <span className="text-sm text-matrix-primary">Local Mode</span>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="apiKey" className="text-matrix-primary text-sm">OpenAI API Key</label>
        <Input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={handleApiKeyChange}
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

      {terminalOutput.length > 0 && (
        <ScrollArea className="h-[200px] rounded-md border border-matrix-primary/50 bg-matrix-dark p-4">
          <div className="font-mono text-sm text-matrix-primary">
            {terminalOutput.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">{line}</div>
            ))}
          </div>
        </ScrollArea>
      )}

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