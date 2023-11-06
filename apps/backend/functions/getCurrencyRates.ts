import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { fetchAndParseData } from "../currencyParser/effects";
import { Effect } from "effect";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) =>
  await Effect.runPromise(fetchAndParseData);

export { handler };
