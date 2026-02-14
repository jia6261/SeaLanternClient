import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Zap } from 'lucide-react';

interface QuickJoinProps {
  onJoin: (serverId: string) => Promise<void>;
}

export default function QuickJoin({ onJoin }: QuickJoinProps) {
  const [serverId, setServerId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverId.trim()) {
      setError('Please enter a server ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await onJoin(serverId.trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="server-id" className="block text-sm font-medium text-foreground">
            Server ID
          </label>
          <input
            id="server-id"
            type="text"
            placeholder="Enter server ID (e.g., manus-test)"
            value={serverId}
            onChange={(e) => {
              setServerId(e.target.value);
              setError(null);
            }}
            disabled={isLoading}
            className="quick-join-input"
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !serverId.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Join Server
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          💡 Tip: You can also use the server name instead of ID
        </p>
      </div>
    </div>
  );
}
