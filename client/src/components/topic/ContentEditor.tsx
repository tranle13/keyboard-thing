import { Editor } from "@tinymce/tinymce-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

interface Props {
  height?: number;
}

const ContentEditor = forwardRef<TinyMCEEditor, Props>((props, ref) => {
  const editorRef = useRef<TinyMCEEditor>();

  useImperativeHandle(ref, () => editorRef.current as TinyMCEEditor);

  if (!ref) return null;

  return (
    <Editor
      apiKey="6u83swqogsxupwyr54zmcbd6cc7gx4jw6uj1g56ui6tte16k"
      initialValue=""
      init={{
        min_height: props.height || 400,
        statusbar: false,
        menubar: false,
        placeholder: "Type your content here...",
        icons: "jam",
        skin: "oxide-dark",
        content_css: "dark",
        plugins:
          "accordion advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link lists media nonbreaking pagebreak preview quickbars save searchreplace table visualblocks visualchars wordcount",
        toolbar: [
          "undo redo restoredraft | blocks | fontfamily fontsizeinput | alignleft aligncenter alignright alignjustify",
          "bold italic underline strikethrough forecolor backcolor | emoticons image link media preview | bullist numlist | indent outdent",
        ],
        content_style: "body { font-size:14px }",
      }}
    />
  );
});

export default ContentEditor;
