process.env.PAYLOAD_DB_PUSH = "true";

/**
 * Auto-accept Drizzle "create column" prompts (same approach as Payload's acceptDrizzlePrompts)
 * so this can run non-interactively in CI/setup.
 */
function startAutoAcceptDrizzlePrompts() {
  const interval = setInterval(() => {
    process.stdin.emit("keypress", "\n", { name: "return", ctrl: false });
  }, 25);
  return () => clearInterval(interval);
}

async function pushSchema() {
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
