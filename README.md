# Meridian Platform

Meridian is a fictional SaaS platform built as a controlled engineering integration test for Plexus.

## Components

- **Authentication:** Simulated login and session management
- **Billing:** Payment calculations and subscription plans
- **Dashboard:** Analytics aggregation and reporting
- **Shared:** Common API response utilities

## Running locally

```bash
npm install
npm run dev
```

The server runs on `http://localhost:4000`.

## Testing

```bash
npm run typecheck
npm test
npm run build
```

## Engineering workflow

Meridian uses GitHub pull requests, CODEOWNERS, and GitHub Actions. Work items are tracked in the Jira `KAN` project.

Pull request titles and branches may include Jira issue keys such as `KAN-6` to support explicit cross-platform references.

## Disclaimer

Meridian is a synthetic test application. Its authentication and billing components are demonstrations, not production-ready implementations.