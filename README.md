# Project-Lighthouse
Experimental automation framework exploring modular orchestration techniques for internal operations. Designed for flexible integration with legacy systems and scalable to a variety of enterprise environments. Core components include workflow planning, structured data management, and adaptive execution logic.
graph TD
  subgraph UI Layer
    UI[Frontend UI<br/>(Streamlit or React)]
  end

  subgraph API Gateway
    Gateway[Agent Gateway Service<br/>(Workflow & Prompt Router)]
  end

  subgraph Core Services
    Ontology[🧬 Ontology Service]
    Planner[⚙️ Planning Engine]
    Executor[🔁 Agent Runtime Executor]
    Constraints[📜 Constraint Engine]
    TaskGraph[🧮 Task Graph Generator]
    Reporter[📄 Report Generator]
  end

  subgraph Data Layer
    SQL[Azure SQL<br/>(Ledger, Tasks)]
    Blob[Azure Blob Storage<br/>(Receipts, Invoices, Audit Logs)]
    Cosmos[Cosmos DB<br/>(Ontology, State Memory)]
  end

  subgraph LLM Adapter Layer
    LLMAdapter[🧠 LLM Adapter Service]
    OpenAI[(🔗 OpenAI GPT-4 / Azure OpenAI)]
    Ollama[(🔒 Ollama / LLaMA 3 Self-Hosted)]
  end

  subgraph Output
    Reports[📊 Dashboards, Reports, Logs]
  end

  %% Frontend
  UI --> Gateway

  %% Gateway Routing
  Gateway --> Ontology
  Gateway --> Planner
  Gateway --> Executor
  Gateway --> Reporter

  %% Core Logic
  Planner --> Constraints
  Planner --> TaskGraph
  Planner --> Ontology

  Executor --> Ontology
  Executor --> Planner
  Executor --> Reporter

  %% Feedback Loop
  Reporter --> Ontology
  Executor --> Ontology

  %% Data Connections
  Ontology --> Cosmos
  Planner --> SQL
  Executor --> SQL
  Executor --> Blob
  Reporter --> Blob
  Reporter --> SQL

  %% LLMs
  Gateway --> LLMAdapter
  Ontology --> LLMAdapter
  Reporter --> LLMAdapter
  Constraints --> LLMAdapter

  LLMAdapter --> OpenAI
  LLMAdapter --> Ollama

  %% Final Output
  Reporter --> Reports
