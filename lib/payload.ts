import config from "@payload-config";
import { getPayload } from "payload";
import type { Payload } from "payload";

let cached: Promise<Payload> | null = null;

export async function getPayloadClient(): Promise<Payload> {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}

export function isCmsConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.PAYLOAD_SECRET);
}
