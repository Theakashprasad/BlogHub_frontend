const validateTitle = (title: string) => {
  return title.trim() ? "" : "Title is required";
};

const validateContent = (content: string) => {
  return content.trim() ? "" : "Content is required";
};

// const validateImage = (image: File | null, isEdit: boolean) => {
//   return isEdit ? "" : (image ? "" : "Image is required");
// };
const validateImage = (image: File | null) => {
  if (!image) return ""; // optional image

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  const maxSizeInBytes = 2 * 1024 * 1024; // 2MB

  if (!allowedTypes.includes(image.type)) {
    return "Only JPG, JPEG, PNG, or WEBP files are allowed";
  }

  if (image.size > maxSizeInBytes) {
    return "Image size must be less than 2MB";
  }

  return "";
};
export const validateBlog = (
  title: string,
  content: string,
  image: File | null
) => {
  const isAnyFieldEmpty = !title || !content || !image;

  if (isAnyFieldEmpty) {
    return {
      errors: { title: "", content: "", image: "" },
      isValid: false,
      isAnyFieldEmpty,
    };
  }

  const errors = {
    title: validateTitle(title),
    content: validateContent(content),
    image: validateImage(image),
  };

  const isValid = !errors.title && !errors.content && !errors.image;
  return { errors, isValid, isAnyFieldEmpty };
};
