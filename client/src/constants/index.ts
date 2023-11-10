const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "retro",
  "halloween",
  "garden",
  "forest",
  "pastel",
  "fantasy",
  "luxury",
  "acid",
  "coffee",
  "dracula",
  "night",
];

const badges = {
  IC: "badge-info",
  GB: "badge-success",
  CLOSED: "badge-neutral",
};

const categories = ["Keyboard", "Keycap", "Switch", "PCB", "Badge", "Other"];

const tinymcePlugins =
  "accordion advlist anchor autolink autoresize autosave charmap code codesample directionality emoticons fullscreen help image importcss insertdatetime link lists media nonbreaking pagebreak preview quickbars save searchreplace table visualblocks visualchars wordcount";
const tinymceToolbar = [
  "undo redo restoredraft | blocks | fontfamily fontsize | alignleft aligncenter alignright alignjustify",
  "bold italic underline strikethrough forecolor backcolor | emoticons image link media preview | bullist numlist | indent outdent",
];

export { badges, categories, themes, tinymcePlugins, tinymceToolbar };
