const validateEmail = (email: string) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

const validateUsername = (username: string) => {
  if (!username) {
    return "Username is required";
  }
  if (username.length < 4) {
    return "Username must be at least 4 characters long";
  }
  const usernamePattern = /^[a-zA-Z]+$/;
  if (!usernamePattern.test(username)) {
    return "Username must contain only letters";
  }
  return "";
};

const validatePassword = (password: string) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
  if (!passwordPattern.test(password)) {
    return "Password must contain both letters and numbers";
  }
  return "";
};

export const validateSignupForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const isAnyFieldEmpty = !username || !email || !password || !confirmPassword;

  if (isAnyFieldEmpty) {
    return {
      errors: { username: "", email: "", password: "", confirmPassword: "" },
      isValid: false,
      isAnyFieldEmpty,
    };
  }

  const errors = {
    username: validateUsername(username),
    email: validateEmail(email) ? "" : "Invalid email format",
    password: validatePassword(password),
    confirmPassword: "",
  };

  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  const isValid =
    !errors.username &&
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword;
  return { errors, isValid, isAnyFieldEmpty };
};
