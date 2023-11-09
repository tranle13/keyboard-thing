import { tinymcePlugins, tinymceToolbar } from "@/constants";
import * as dateFns from "date-fns";

export function formatDate(dateStr?: string, format: string = "MMM dd, yyyy") {
  if (!dateStr) return;
  return dateFns.format(new Date(dateStr), format);
}

export function tinymceInit(minHeight?: number) {
  return {
    min_height: minHeight || 400,
    max_height: 600,
    statusbar: false,
    menubar: false,
    placeholder: "Type your content here...",
    skin: "oxide-dark",
    content_css: "dark",
    plugins: tinymcePlugins,
    toolbar: tinymceToolbar,
    content_style: "body { font-size:14px }",
  };
}
