import { genSalt, hash as genHash, compare as compareValue  } from "bcrypt";

export const hash = async (plaintext) => {
    const salt = await genSalt(12);

    return await genHash(plaintext, salt);
}

export const compare = async (plaintext, hash) => {
    return await compareValue(plaintext, hash);
}