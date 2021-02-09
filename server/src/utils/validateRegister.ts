import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

export const validateRegister = (options: UsernamePasswordInput) => {
  if (options.username.length <= 2) {
    console.log(options.username.length);
    return [
      {
        field: "username",
        message: "length must be greated than 2 characters",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "not email",
      },
    ];
  }

  if (options.username.length <= 3) {
    return [
      {
        field: "password",
        message: "length must be greated than 3 characters",
      },
    ];
  }

  return null;
};
