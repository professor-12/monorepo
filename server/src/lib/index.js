import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(8);

    return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedVersion) => {
    return await bcrypt.compare(password, hashedVersion);
};


