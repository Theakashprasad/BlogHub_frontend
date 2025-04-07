const validateEmail = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

const validateUsername = (username: string) => {
  if (!username) return "Username is required";
  if (username.length < 4) return "Username must be at least 4 characters";
  const usernamePattern = /^[a-zA-Z]+$/;
  if (!usernamePattern.test(username))
    return "Username must contain only letters";
  return "";
};

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

export const profileValidation = (
  username: string,
  email: string,
  image: File | null
) => {
  const isAnyFieldEmpty = !username || !email;

  if (isAnyFieldEmpty) {
    return {
      errors: { username: "", email: "", image: "" },
      isValid: false,
      isAnyFieldEmpty,
    };
  }

  const errors = {
    username: validateUsername(username),
    email: validateEmail(email) ? "" : "Invalid email format",
    image: validateImage(image),
  };

  console.log(errors.username, errors.email);
  const isValid = !errors.username && !errors.email && !errors.image;
  return { errors, isValid, isAnyFieldEmpty };
};
