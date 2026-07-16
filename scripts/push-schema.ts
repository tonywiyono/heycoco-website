process.env.PAYLOAD_DB_PUSH = "true";

async function pushSchema() {
  const { default: config } = await import("../payload.config");
  const { getPayload } = await import("payload");

  await getPayload({ config });
  console.log("Database schema push complete.");
  process.exit(0);
}

pushSchema().catch((error) => {
  console.error(error);
  process.exit(1);
});
