import { Editor } from "@tinymce/tinymce-react";
import { decode } from "html-entities";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";

interface Props {
  height?: number;
  initialContent?: string;
}

const ContentEditor = forwardRef<TinyMCEEditor, Props>((props, ref) => {
  const editorRef = useRef<TinyMCEEditor>();

  useImperativeHandle(ref, () => editorRef.current as TinyMCEEditor);

  if (!ref) return null;

  return (
    <>
      <Editor
        apiKey="6u83swqogsxupwyr54zmcbd6cc7gx4jw6uj1g56ui6tte16k"
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        initialValue={props.initialContent ? decode(props.initialContent) : ""}
        init={{
          min_height: props.height || 400,
          max_height: 600,
          statusbar: false,
          menubar: false,
          placeholder: "Type your content here...",
          skin: "oxide-dark",
          content_css: "dark",
          plugins:
            "accordion advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link lists media nonbreaking pagebreak preview quickbars save searchreplace table visualblocks visualchars wordcount",
          toolbar: [
            "undo redo restoredraft | blocks | fontfamily fontsize | alignleft aligncenter alignright alignjustify | bold italic underline strikethrough forecolor backcolor | emoticons image link media preview | bullist numlist | indent outdent",
          ],
          content_style: "body { font-size:14px }",
        }}
      />
      <button type="submit">update stuff</button>
    </>
  );
});

export default ContentEditor;
