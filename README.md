# SynapseAI (Work in Progress)
**Behavior-Driven Automation & AI Talent Marketplace**
*Automate tasks your way. Empower developers globally.*

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js&style=flat)
![Convex](https://img.shields.io/badge/Convex-1.9.0-blue?style=flat&logo=convex)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.2-blue?logo=postgresql&style=flat)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

## 🚀 Overview
SynapseAI combines **AI-driven behavioral cloning** with a **crowdsourced marketplace** to deliver personalized automation and scalable AI solutions. Built on a modern stack (Next.js, ConvexDB, PostgreSQL), it enables:
- **Users**: Train an AI Twin to handle emails, messages, and workflows in *their unique style*.
- **Developers**: Publish and monetize pre-trained AI agents via RESTful APIs and Convex functions.

## ✨ Features
### Core Modules
| Module | Tech Stack | Description |
|--------|------------|-------------|
| AI Twin Engine | Python/Express | Behavioral cloning via GPT-4 fine-tuning |
| Marketplace API | Node.js/Convex | Agent discovery, rentals, and payments |
| Frontend | Next.js (App Router) | Responsive UI with real-time dashboards |
| Database | PostgreSQL | Stores user profiles, agent metadata, logs |

### Key Capabilities
- **Mirror Learning**: Replicate user tone/habits via email & message analysis
- **Convex-Powered Marketplace**: CRUD operations for AI agents with real-time sync
- **OAuth 2.0 Integration**: Secure auth via Google/GitHub
- **Stripe Payments**: Rent agents by hour/week/month

## 🛠️ Installation

### Prerequisites
- Node.js v20+
- Python 3.11+
- PostgreSQL 16+
- Convex Account

### Steps
1. Clone the repo:
   ```bash
   git clone https://github.com/suhaib3100/SynapseAI.git
   cd SynapseAI
   ```

2. Install dependencies:
   ```bash
   npm install  # Frontend/backend
   pip install -r requirements.txt  # AI Engine
   ```

3. Configure environment variables (`.env.local`):
   ```ini
   # Next.js
   NEXT_PUBLIC_CONVEX_URL="your-convex-deployment-url"
   DATABASE_URL="postgresql://user:pass@localhost:5432/synapseai"

   # Convex
   CONVEX_DEPLOYMENT="your-convex-id"
   STRIPE_SECRET_KEY="sk_test_..."
   ```

4. Initialize Convex:
   ```bash
   npx convex dev
   ```

5. Start servers:
   ```bash
   npm run dev       # Next.js frontend
   node server.js    # Express API (AI Engine)
   ```

## 🔧 Configuration
### Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CONVEX_URL` | Yes | Convex deployment URL |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `OPENAI_API_KEY` | Yes | GPT-4 fine-tuning |
| `STRIPE_SECRET_KEY` | Yes | Handle marketplace payments |

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/train` | POST | Train AI Twin with user data |
| `/api/agents` | GET | Fetch marketplace agents |
| `/api/agents/deploy` | POST | Publish new agent (Convex mutation) |

## 🧪 Testing

SynapseAI uses Jest for unit testing both frontend and backend components. Tests are organized in the `__tests__` directory.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm test -- --coverage
```

For more details on testing, see [Testing Documentation](docs/testing.md).

## 📚 API Documentation

The SynapseAI API is documented using both Swagger and Postman:

### Swagger Documentation

The Swagger documentation provides a comprehensive overview of all API endpoints, request/response schemas, and authentication requirements.

- [Swagger JSON](docs/swagger.json) - Raw Swagger definition
- To view the Swagger UI:
  1. Install Swagger UI: `npm install -g swagger-ui-cli`
  2. Run: `swagger-ui-cli serve docs/swagger.json`
  3. Open: `http://localhost:3001/docs`

### Postman Collection

A Postman collection is available for testing the API endpoints:

1. [Download Postman Collection](docs/postman_collection.json)
2. Import into Postman
3. Set up environment variables:
   - `baseUrl`: `http://localhost:3001/api`
   - `authToken`: Your authentication token

## 🚢 Deployment
1. **Frontend**: Deploy Next.js app to Vercel
2. **Backend**: Use Convex Cloud for real-time DB/API
3. **PostgreSQL**: Set up managed instance (e.g., Neon.tech)

```bash
npm run build
```

## 📅 Roadmap
| Phase | Timeline | Deliverables |
|-------|----------|---------------|
| Core AI Twin | Q3 2024 | Gmail/WhatsApp automation MVP |
| Marketplace Beta | Q4 2024 | 50+ agents, Stripe integration |
| Enterprise Tier | Q1 2025 | Team roles, audit logs, SSO |

## 🤝 Contributing
1. Fork the repository
2. Create a branch: `git checkout -b feature/your-idea`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push: `git push origin feature/your-idea`
5. Open a PR with detailed descriptions
6. Ensure all tests pass: `npm test`
7. Add tests for new features

## 📜 License
Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## 📞 Contact
**Suhaib** - [GitHub](https://github.com/suhaib3100)
**Project Link**: [https://github.com/suhaib3100/SynapseAI](https://github.com/suhaib3100/SynapseAI)

**Redefining Automation with Human Intelligence.** 🧠⚡