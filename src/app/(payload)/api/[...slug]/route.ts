/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from "@payload-config";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";
import type { NextRequest } from "next/server";

type RouteHandler = (req: NextRequest, ctx: { params: Promise<{ slug: string[] }> }) => Promise<Response>;

export const GET = REST_GET(config) as unknown as RouteHandler;
export const POST = REST_POST(config) as unknown as RouteHandler;
export const DELETE = REST_DELETE(config) as unknown as RouteHandler;
export const PATCH = REST_PATCH(config) as unknown as RouteHandler;
export const PUT = REST_PUT(config) as unknown as RouteHandler;
export const OPTIONS = REST_OPTIONS(config) as unknown as RouteHandler;
