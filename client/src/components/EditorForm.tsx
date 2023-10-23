import { Button } from "@/shadcn-ui/components/ui/button";
import { Editor } from "@tinymce/tinymce-react";
import { FormEvent, MutableRefObject, ReactNode, useState } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

interface Props {
  editorRef: MutableRefObject<TinyMCEEditor | null>;
  children?: ReactNode;
  height: number;
  buttonText?: string;
  secondaryButtonText?: string;
  extraClass?: string;
  header?: string;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleReset: (e: FormEvent<HTMLFormElement>) => void;
}

const EditorForm = ({
  editorRef,
  children,
  height,
  buttonText,
  secondaryButtonText,
  extraClass,
  header,
  handleSubmit,
  handleReset,
}: Props) => {
  const [hasContent, setHasContent] = useState(false);

  return (
    <div className={`new-topic flex flex-col ${extraClass}`}>
      {header && <h2 className="text-2xl font-bold my-6">{header}</h2>}
      <form
        className="bg-sorta-yellow/50 flex flex-col gap-3 p-5 rounded-xl"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {children}

        <Editor
          apiKey="ugljrczpl64v3yl2yat6m9ke7toakblkuv44j6fwc78ez5f8"
          onInit={(_, editor) => {
            editorRef.current = editor;
          }}
          initialValue=""
          init={{
            min_height: height,
            statusbar: false,
            menubar: false,
            placeholder: "Type your stuff here...",
            icons: "jam",
            plugins:
              "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
            toolbar: [
              "undo redo restoredraft | blocks | fontfamily fontsizeinput | alignleft aligncenter alignright alignjustify",
              "bold italic underline strikethrough forecolor backcolor | emoticons image link media preview | bullist numlist | indent outdent",
            ],
            content_style: "body { font-size:14px }",
          }}
          onEditorChange={(value) => setHasContent(!!value)}
        />

        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            className="text-sorta-yellow"
            type="reset"
            disabled={!hasContent}
          >
            {secondaryButtonText || "Discard"}
          </Button>
          <Button
            disabled={!hasContent}
            className="bg-sorta-yellow text-sorta-black hover:bg-sorta-dark-yellow"
            type="submit"
          >
            {buttonText || "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};
// });

export default EditorForm;
