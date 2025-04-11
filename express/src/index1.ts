import bcrypt from "bcrypt";

const hashPassword = async () => {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
};

hashPassword();
