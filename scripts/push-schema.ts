process.env.PAYLOAD_DB_PUSH = "true";

/**
 * Auto-accept Drizzle "create column" prompts (same approach as Payload's acceptDrizzlePrompts)
 * and auto-confirm schema-push warnings so this can run non-interactively in CI/setup.
 */
function startAutoAcceptDrizzlePrompts() {
  const interval = setInterval(() => {
    process.stdin.emit("keypress", "\n", { name: "return", ctrl: false });
  }, 25);
  return () => clearInterval(interval);
}

async function pushSchema() {
  // Pre-answer the Payload warnings confirm (prompts package) with "yes"
  try {
    const prompts = (await import("prompts")).default;
    prompts.inject([true]);
  } catch {
    // prompts may not be resolvable as a direct import; keypress fallback still helps
  }

  const stopAutoAccept = startAutoAcceptDrizzlePrompts();
  try {
    const { default: config } = await import("../payload.config");
    const { getPayload } = await import("payload");

    await getPayload({ config });
    console.log("Database schema push complete.");
    process.exit(0);
  } finally {
    stopAutoAccept();
  }
}

pushSchema().catch((error) => {
  console.error(error);
  process.exit(1);
});
