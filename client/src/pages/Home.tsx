import { useState, useEffect } from 'react';
import { Zap, Gamepad2 } from 'lucide-react';
import QuickJoin from '@/components/QuickJoin';
import ServerList from '@/components/ServerList';
import { toast } from 'sonner';

interface ServerInfo {
  id: string;
  name: string;
  address: string;
  port: number;
  status: 'online' | 'offline' | 'loading';
  players?: number;
  maxPlayers?: number;
}

export default function Home() {
  const [servers, setServers] = useState<ServerInfo[]>([
    {
      id: 'manus-test',
      name: 'Manus Test Server',
      address: 'play.manus.im',
      port: 25565,
      status: 'online',
      players: 12,
      maxPlayers: 20,
    },
    {
      id: 'survival-world',
      name: 'Survival World',
      address: '127.0.0.1',
      port: 25566,
      status: 'offline',
      players: 0,
      maxPlayers: 10,
    },
  ]);

  const [isJoining, setIsJoining] = useState(false);

  const handleQuickJoin = async (serverId: string) => {
    setIsJoining(true);
    try {
      // Simulate API call to resolve server ID
      const server = servers.find(s => s.id === serverId || s.name === serverId);
      
      if (!server) {
        throw new Error(`Server "${serverId}" not found`);
      }

      if (server.status === 'offline') {
        throw new Error('Server is currently offline');
      }

      // In a real implementation, this would:
      // 1. Call the SeaLantern backend to resolve the ID
      // 2. Download and sync mods
      // 3. Launch Minecraft with the correct server address
      
      toast.success(`Connecting to ${server.name}...`);
      console.log(`Joining server: ${server.address}:${server.port}`);
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Connected to ${server.name}!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to join server';
      toast.error(message);
      throw error;
    } finally {
      setIsJoining(false);
    }
  };

  const handleServerJoin = async (serverId: string) => {
    await handleQuickJoin(serverId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: 'IBM Plex Mono' }}>
                SeaLantern
              </h1>
            </div>
            <p className="text-xs text-muted-foreground">Player Client</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'IBM Plex Mono' }}>
                Quick Join
              </h2>
            </div>
            <p className="text-muted-foreground">
              Enter a server ID to instantly connect. No need to remember IP addresses.
            </p>
          </div>

          {/* Quick Join Card */}
          <div className="bg-card border border-border rounded-lg p-8">
            <QuickJoin onJoin={handleQuickJoin} />
          </div>
        </div>

        {/* Server List */}
        <div className="max-w-4xl mx-auto">
          <ServerList
            servers={servers}
            onJoin={handleServerJoin}
            isLoading={isJoining}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
          <p>SeaLantern Player Client • Powered by Tauri & Rust</p>
        </div>
      </footer>
    </div>
  );
}
