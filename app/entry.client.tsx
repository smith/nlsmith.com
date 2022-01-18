import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import * as pkg from "../package.json";
import { init as initApm } from "@elastic/apm-rum";

const apm = initApm({
  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: "nlsmith-frontend",

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: "",

  // Set service version (required for sourcemap feature)
  serviceVersion: pkg.version,
});

console.log({ env: process.env });
hydrate(<RemixBrowser />, document);
