
import { randomUUID } from "node:crypto";

export interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessions = new Map<string, Session>();

export function createSession(userId: string): Session {
  const now = new Date();

  const session: Session = {
    id: randomUUID(),
    userId,
    createdAt: now,
    expiresAt: new Date(now.getTime() + 60 * 60 * 1000),
  };

  sessions.set(session.id, session);

  return session;
}

export function validateSession(
  sessionId: string
): Session | null {
  const session = sessions.get(sessionId);

  if (!session) return null;

  if (session.expiresAt.getTime() <= Date.now()) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}
