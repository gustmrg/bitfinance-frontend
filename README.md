<div align="center">
  <a href="https://github.com/gustmrg/bitfinance-frontend">
    <img src="public/assets/logo.png" alt="" height="100" >
  </a>
  <h3 align="center">BitFinance</h3>
</div>

A modern, full-stack finance application designed to simplify expense tracking and financial management for individuals and organizations.

<p align="center">
  <a href="LICENSE"><img  src="https://img.shields.io/static/v1?label=License&message=MIT&color=blue" alt="License"></a>
  <img src="https://img.shields.io/github/actions/workflow/status/gustmrg/bitfinance-frontend/deploy.yml" alt="Build status" />
</p>

## ✨ Features

- **📊 Expense Tracking**: Monitor and categorize your daily expenses with ease
- **💳 Bill Management**: Keep track of recurring bills and payment schedules  
- **🏢 Multi-Organization Support**: Join and manage finances across multiple organizations
- **🔐 Secure**: Built with security best practices and Azure integration for production environments

## 🔧 Configuration

### Environment Setup

The application uses Vite's environment mode system with template files for security.

**First-time setup:**
```bash
# Copy the development template to create your local environment file
cp .env.development.example .env.development

# Or use .env.local for personal overrides (recommended)
cp .env.development.example .env.local
```

### Environment Variables

- **Development** (`.env.development` or `.env.local`):
  - `VITE_API_URL=http://localhost:8080/api/v1` (local backend)
  - Used when running `npm run dev`

- **Production** (`.env.production`):
  - `VITE_API_URL=/api/v1` (same-origin routing via reverse proxy)
  - Created automatically by GitHub Actions during deployment
  - Used when running `npm run build`

### Running Locally

1. Clone the repository
2. Set up environment:
   ```bash
   cp .env.development.example .env.local
   ```
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Frontend runs on http://localhost:5173, connects to backend at http://localhost:8080/api/v1
6. (Optional) Edit `.env.local` if your backend runs on a different port

### Building for Production

```bash
npm run build
```

Uses `.env.production` (created by CI/CD) to generate a production build with relative API URLs for same-origin deployment.

### Security Note

- Never commit actual `.env` files - they are gitignored
- Only `.env.example` templates are committed to the repository
- Production secrets are managed via GitHub Secrets

## 🚀 Tech Stack

### Backend
- **[.NET](https://dotnet.microsoft.com/)** - Cross-platform framework for building modern applications
- **[Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)** - Modern object-database mapper for .NET
- **[PostgreSQL](https://www.postgresql.org/)** - Advanced open-source relational database

### Frontend
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces

### Infrastructure & DevOps
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container Docker application management
- **[Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/)** - Secure secrets management for production

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the need for simple, effective financial management tools
