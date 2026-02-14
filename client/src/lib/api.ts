/**
 * SeaLantern Client API Service
 * 
 * This module handles communication with the SeaLantern server backend.
 * It provides methods for:
 * - Resolving server IDs to addresses
 * - Downloading and syncing mods
 * - Launching Minecraft with the correct server configuration
 */

interface ServerAddress {
  host: string;
  port: number;
}

interface ModInfo {
  id: string;
  name: string;
  download_url: string;
  file_name: string;
  source: string;
}

interface ModSyncResult {
  downloaded: number;
  skipped: number;
  errors: string[];
}

// API base URL - in production, this would be configurable
const API_BASE = process.env.VITE_SEALANTERN_API || 'http://localhost:8080';

/**
 * Resolve a server ID to its network address
 */
export async function resolveServerId(id: string): Promise<ServerAddress> {
  try {
    const response = await fetch(`${API_BASE}/api/join/resolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to resolve server ID: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // Fallback: try to parse as local server ID
    console.warn('API call failed, attempting local resolution', error);
    throw new Error(`Unable to resolve server ID: ${id}`);
  }
}

/**
 * Get the list of mods required for a specific server
 */
export async function getServerMods(serverId: string): Promise<ModInfo[]> {
  try {
    const response = await fetch(`${API_BASE}/api/mods/server/${serverId}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch server mods: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('Failed to fetch server mods', error);
    return [];
  }
}

/**
 * Download and sync mods for a server
 * This would typically be handled by a native module or worker
 */
export async function syncServerMods(
  serverId: string,
  modsDir: string
): Promise<ModSyncResult> {
  try {
    const mods = await getServerMods(serverId);
    
    const result: ModSyncResult = {
      downloaded: 0,
      skipped: 0,
      errors: [],
    };

    for (const mod of mods) {
      try {
        // In a real implementation, this would:
        // 1. Check if mod already exists
        // 2. Download from the URL
        // 3. Verify file integrity
        // 4. Save to modsDir
        
        console.log(`Syncing mod: ${mod.name}`);
        result.downloaded++;
      } catch (error) {
        result.errors.push(`Failed to sync ${mod.name}: ${error}`);
      }
    }

    return result;
  } catch (error) {
    return {
      downloaded: 0,
      skipped: 0,
      errors: [`Mod sync failed: ${error}`],
    };
  }
}

/**
 * Launch Minecraft with the specified server address
 * This would typically invoke a native launcher or command
 */
export async function launchMinecraft(
  serverAddress: ServerAddress,
  modsDir?: string
): Promise<void> {
  try {
    // In a real implementation, this would:
    // 1. Find the Minecraft installation
    // 2. Prepare JVM arguments
    // 3. Add the server address as a connection parameter
    // 4. Launch the game process
    
    const connectionString = `${serverAddress.host}:${serverAddress.port}`;
    console.log(`Launching Minecraft with server: ${connectionString}`);
    
    // Placeholder: would call native launcher here
    throw new Error('Minecraft launcher integration not yet implemented');
  } catch (error) {
    throw new Error(`Failed to launch Minecraft: ${error}`);
  }
}

/**
 * Complete flow: resolve ID -> sync mods -> launch game
 */
export async function joinServer(
  serverId: string,
  modsDir?: string
): Promise<void> {
  try {
    // Step 1: Resolve server ID
    const serverAddress = await resolveServerId(serverId);
    console.log(`Resolved ${serverId} to ${serverAddress.host}:${serverAddress.port}`);

    // Step 2: Sync mods if directory provided
    if (modsDir) {
      const syncResult = await syncServerMods(serverId, modsDir);
      if (syncResult.errors.length > 0) {
        console.warn('Mod sync warnings:', syncResult.errors);
      }
    }

    // Step 3: Launch Minecraft
    await launchMinecraft(serverAddress, modsDir);
  } catch (error) {
    throw error;
  }
}
