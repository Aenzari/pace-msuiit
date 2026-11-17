import { notFound } from "next/navigation";
import PreviewWorkspace from "./PreviewWorkspace";
import "./preview.css";

/**
 * Development-only role preview. This route is deliberately not an
 * authentication bypass and is not available in production builds.
 */
export default function PreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return (
    <div id="pace-preview">
      <PreviewWorkspace />
    </div>
  );
}
