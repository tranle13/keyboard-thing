import { Editor } from "@tinymce/tinymce-react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

interface Props {
  height: number;
  showToolbar?: boolean;
}

const TextEditor = forwardRef<TinyMCEEditor | null, Props>((props, ref) => {
  const editorRef = useRef<TinyMCEEditor | null>();

  useImperativeHandle(ref, () => editorRef.current as TinyMCEEditor);

  return (
    <Editor
      apiKey="ugljrczpl64v3yl2yat6m9ke7toakblkuv44j6fwc78ez5f8"
      onInit={(_, editor) => {
        editorRef.current = editor;
      }}
      initialValue=""
      init={{
        min_height: props.height,
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
    />
  );
});

export default TextEditor;
