const imageValidate = (image) => {
  let imagesTable = [];

  if (Array.isArray(image)) imagesTable = [...image];
  else imagesTable = [image];

  if (imagesTable.length > 1) {
    return { error: "Send only 1 image at once" };
  }

  if (image.size > 1048576) return { error: "Size too large (above 1MB)" };

  const fileTypes = /jpg|jpeg|png/;
  const mimeType = fileTypes.test(image.mimetype);

  if (!mimeType)
    return { error: "Incorrect file type (should be jpg, jpeg, or png)" };

  return { error: false };
};

module.exports = imageValidate;
