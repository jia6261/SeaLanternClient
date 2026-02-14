import { Server, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServerInfo {
  id: string;
  name: string;
  address: string;
  port: number;
  status: 'online' | 'offline' | 'loading';
  players?: number;
  maxPlayers?: number;
}

interface ServerListProps {
  servers: ServerInfo[];
  onJoin: (serverId: string) => void;
  isLoading?: boolean;
}

export default function ServerList({ servers, onJoin, isLoading }: ServerListProps) {
  const getStatusColor = (status: ServerInfo['status']) => {
    switch (status) {
      case 'online':
        return 'status-online';
      case 'offline':
        return 'status-offline';
      case 'loading':
        return 'status-loading';
    }
  };

  const getStatusText = (status: ServerInfo['status']) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      case 'loading':
        return 'Loading...';
    }
  };

  if (servers.length === 0) {
    return (
      <div className="text-center py-12">
        <Server className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No Servers</h3>
        <p className="text-sm text-muted-foreground">
          Use the quick join feature above to connect to a server
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground mb-4">Your Servers</h2>
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {servers.map((server) => (
          <div
            key={server.id}
            className="bg-card text-card-foreground rounded-lg p-4 border border-border transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground truncate">
                  {server.name}
                </h3>
                <p className="text-xs text-muted-foreground font-mono">
                  {server.address}:{server.port}
                </p>
              </div>
              <div className={`status-indicator ${getStatusColor(server.status)} ml-2 flex-shrink-0`} />
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">
                {getStatusText(server.status)}
              </span>
              {server.players !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {server.players}/{server.maxPlayers} players
                </span>
              )}
            </div>

            <Button
              onClick={() => onJoin(server.id)}
              disabled={server.status === 'offline' || isLoading}
              className="w-full"
              size="sm"
            >
              <Play className="mr-2 h-3 w-3" />
              Join
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
