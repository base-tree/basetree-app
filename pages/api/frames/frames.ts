import { SITE_URL } from "@/core/utils/constants";
import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/api/frames",
  baseUrl: SITE_URL,
  debug: process.env.NODE_ENV === "development",
});
