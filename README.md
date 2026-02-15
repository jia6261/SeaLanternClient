# SeaLantern Player Client

A modern, minimalist Minecraft launcher built with React, Tauri, and Rust. Designed to simplify server discovery and connection through SeaLantern's innovative ID-based server joining system.

## Features

### 🚀 Quick Join
Connect to any SeaLantern server using just a server ID—no need to remember complex IP addresses. Simply enter the ID and launch.

### 🎮 Server Management
- Browse your saved servers with real-time status indicators
- View player counts and server information at a glance
- One-click connection to any server

### 📦 Automatic Mod Synchronization
- Automatically download and sync mods required by the server
- Support for Modrinth and CurseForge mod sources
- Incremental updates to minimize bandwidth usage

### 🎨 Minimalist Gaming Hub Design
- Dark theme with neon cyan accents optimized for gaming
- Responsive layout supporting mobile to desktop
- Professional, distraction-free interface

## Technology Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Desktop Framework**: Tauri (Rust backend)
- **State Management**: React hooks
- **UI Components**: shadcn/ui
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Rust 1.70+ (for Tauri development)

### Installation

```bash
# Clone the repository
git clone https://github.com/jia6261/SeaLanternClient.git
cd SeaLanternClient

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Architecture

### Client Structure
```
client/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── QuickJoin.tsx      # Server ID input interface
│   │   └── ServerList.tsx     # Server listing and management
│   ├── pages/           # Page-level components
│   │   └── Home.tsx           # Main application page
│   ├── lib/
│   │   └── api.ts             # SeaLantern API integration
│   ├── App.tsx          # Main application component
│   └── index.css        # Global styles with gaming theme
└── public/              # Static assets
```

### API Integration

The client communicates with the SeaLantern server through REST APIs:

- **Server ID Resolution**: `POST /api/join/resolve`
- **Mod Fetching**: `GET /api/mods/server/{serverId}`
- **Mod Sync**: `POST /api/mods/sync`

## Quick Join Flow

1. User enters a server ID (e.g., `manus-test`)
2. Client sends ID to SeaLantern backend
3. Backend resolves ID to server address (e.g., `play.manus.im:25565`)
4. Client downloads required mods from Modrinth/CurseForge
5. Client launches Minecraft with the resolved server address

## Configuration

Set the SeaLantern API endpoint via environment variable:

```bash
VITE_SEALANTERN_API=http://localhost:8080 pnpm dev
```

## Development

### Code Style
- ESLint + Prettier configured
- TypeScript strict mode enabled
- Component-based architecture

### Testing
```bash
# Run type checking
pnpm check

# Format code
pnpm format
```

## Integration with SeaLantern Server

This client is designed to work with the [SeaLantern](https://github.com/FPSZ/SeaLantern) server project. Ensure the server is running and properly configured before using the client.

### Server Requirements
- SeaLantern server with CLI mode enabled
- Modrinth API access for mod discovery
- Proper CORS configuration for client requests

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the SeaLantern team.

## Roadmap

- [ ] Minecraft launcher integration (Prism Launcher support)
- [ ] Microsoft account authentication
- [ ] Multi-account management
- [ ] Game skin preview
- [ ] Server performance monitoring
- [ ] Custom server creation wizard
- [ ] Cross-platform installer (Windows, macOS, Linux)

## Related Projects

- [SeaLantern Server](https://github.com/FPSZ/SeaLantern) - The server-side component
- [Modrinth API](https://docs.modrinth.com/api/) - Mod discovery and download
- [Tauri](https://tauri.app/) - Desktop application framework
