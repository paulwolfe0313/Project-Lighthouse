# 📦 Project Lighthouse – Change Log

All notable changes to this project will be documented in this file.

---

## [v0.1.0] - 2024-07-17

### Added
- Initial dashboard layout with Tailwind + grid system
- Components:
  - `ClientLogo`
  - `Sidebar`
  - `AgentChat`
  - `AutomationStats`
  - `InsightsCharts`
- Three role-based dashboard pages:
  - HR
  - Finance
  - General
- Tailwind theme customization (primary/accent colors)
- Recharts integration for insights
- Docker Compose setup for Laravel API + MySQL
- `init-api.sh` script to automate Laravel bootstrapping

### Fixed
- Rollup native module errors by using host `node_modules` for frontend

### Known Issues
- Frontend only runs on host for now due to `rollup` Docker bug
- Login/auth flow to be implemented
