
import { createServer } from "node:http";
import { login } from "./auth/login.js";
import { createSession } from "./auth/session.js";
import { getMonthlyPrice } from "./billing/subscriptions.js";
import { successResponse, errorResponse } from "./shared/api-client.js";

const PORT = Number(process.env.PORT ?? 4000);

const server = createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify(successResponse({
      service: "meridian-platform",
      status: "healthy",
    })));
    return;
  }

  if (req.method === "GET" && req.url === "/plans") {
    res.writeHead(200);
    res.end(JSON.stringify(successResponse({
      free: getMonthlyPrice("free"),
      pro: getMonthlyPrice("pro"),
      enterprise: getMonthlyPrice("enterprise"),
    })));
    return;
  }

  if (req.method === "POST" && req.url === "/login") {
    try {
      let body = "";

      for await (const chunk of req) {
        body += chunk.toString();

        if (body.length > 10_000) {
          res.writeHead(413);
          res.end(JSON.stringify(errorResponse("Request too large")));
          return;
        }
      }

      const input: unknown = JSON.parse(body);

      if (
        typeof input !== "object" ||
        input === null ||
        !("email" in input) ||
        !("password" in input) ||
        typeof input.email !== "string" ||
        typeof input.password !== "string"
      ) {
        res.writeHead(400);
        res.end(JSON.stringify(errorResponse("Invalid login payload")));
        return;
      }

      const result = login({
        email: input.email,
        password: input.password,
      });

      if (!result.success || !result.userId) {
        res.writeHead(400);
        res.end(JSON.stringify(errorResponse(result.error ?? "Login failed")));
        return;
      }

      const session = createSession(result.userId);

      res.writeHead(200);
      res.end(JSON.stringify(successResponse({
        sessionId: session.id,
        userId: session.userId,
      })));
      return;
    } catch {
      res.writeHead(400);
      res.end(JSON.stringify(errorResponse("Invalid JSON")));
      return;
    }
  }

  res.writeHead(404);
  res.end(JSON.stringify(errorResponse("Route not found")));
});

server.listen(PORT, () => {
  console.log(`Meridian running on http://localhost:${PORT}`);
});
