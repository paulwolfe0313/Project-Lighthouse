# 🗺️ Project Lighthouse

Project Lighthouse is a premium, multi-role AI dashboard SaaS platform. It empowers HR and Finance teams to automate workflows, communicate with intelligent agents, and visualize activity through rich dashboards.

---

## 🚀 Tech Stack

- **Frontend**: Vite + React + TailwindCSS (SPA)
- **Backend**: Laravel (Sanctum Auth, API Gateway)
- **Database**: MySQL (Dockerized)
- **AI Engine**: FastAPI (Planned)
- **Queue**: Laravel Queues + Redis (Planned)
- **Vector DB**: Pinecone (Planned)
- **Cloud File Storage**: Azure Blob via Laravel Filesystem Adapter

---

## 📦 Getting Started (Dev Mode)

### 1. Clone the Repository

```bash
git clone git@github.com:your-org/project-lighthouse.git
cd project-lighthouse
git checkout testing
```

### 2. Run the API + DB (Docker)

```bash
./scripts/init-api.sh
```

> This starts MySQL + Laravel containers, generates your `.env`, key, and runs migrations.

### 3. Run the Frontend (Locally)

```bash
cd frontend
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Current Features

- 🔐 Role-based login (in progress)
- 🧑‍💼 HR dashboard with workflow summary
- 💼 Finance dashboard with AI audit logs
- 🤖 Center-aligned AI Agent UI (placeholder chat)
- 📈 Embedded charts for weekly activity
- ⚙️ Dockerized API & DB (Laravel + MySQL)

---

## 🗂 Folder Structure (Monorepo)

```
project-lighthouse/
├── api/             ← Laravel API Gateway
├── frontend/        ← React + Tailwind dashboard
├── scripts/         ← Dev setup helpers
├── docker-compose.yml
└── README.md
```

---

## 📌 Environment Setup Notes

- API reads config from `/api/.env`
- Frontend communicates with API at `http://localhost:8000/api`
- Vite runs locally (not in Docker)

---

## 📈 Roadmap (Next Steps)

- [ ] Role-based AuthContext in frontend
- [ ] Agent Chat API integration (OpenAI or local LLM)
- [ ] Dynamic client branding via DB
- [ ] File upload, classification, and reclassification
- [ ] Vector DB for context-based AI
- [ ] Deploy frontend to Vercel or Azure Static Web Apps

---

## 🧠 Maintainers

- Lead Dev: [@PaulT](https://github.com/paulwolfe0313)
- Infra, Backend, AI: You 😉

---

## 📄 License

MIT © Project Lighthouse Team
