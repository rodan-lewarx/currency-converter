import { Handler } from "@netlify/functions";
import { fetchAndParseData } from "../currencyParser/effects";
import { Effect } from "effect";

const handler: Handler = async () => await Effect.runPromise(fetchAndParseData);

export { handler };
