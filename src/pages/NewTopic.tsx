import { Button } from "@/shadcn-ui/components/ui/button";
import { Input } from "@/shadcn-ui/components/ui/input";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";

const NewTopic = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="new-topic flex flex-col gap-5">
      <h2 className="text-2xl font-bold my-6">New Topic</h2>
      <form className="bg-sorta-yellow/50 flex flex-col gap-3 p-5 rounded-xl">
        <Input
          className="border-0 bg-cream/40"
          type="text"
          placeholder="Topic title"
        />

        <div className="flex gap-3">
          <div className="border-dotted border-2 border-sorta-black text-xl p-2 rounded-xl">
            <HiOutlineCamera />
          </div>
          <Input
            className="border-0 bg-cream/40"
            type="text"
            placeholder="Image caption (optional)"
          />
        </div>

        <Input
          className="border-0 bg-cream/40"
          type="text"
          placeholder="IC link (optional)"
        />

        <Editor
          apiKey="ugljrczpl64v3yl2yat6m9ke7toakblkuv44j6fwc78ez5f8"
          onInit={(_, editor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            min_height: 500,
            max_height: 500,
            statusbar: false,
            placeholder: "Topic content",
            icons: "jam",
            plugins:
              "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
            toolbar:
              "undo redo restoredraft | blocks | fontfamily fontsizeinput | bold italic underline strikethrough forecolor backcolor | emoticons image link media preview | alignleft aligncenter alignright alignjustify | bullist numlist | indent outdent",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" className="text-sorta-yellow">
            Discard
          </Button>
          <Button className="bg-sorta-yellow text-sorta-black">Post</Button>
        </div>
      </form>
    </div>
  );
};

export default NewTopic;
