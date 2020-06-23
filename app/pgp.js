
import { message, decrypt, encrypt } from 'openpgp';


/**
 * Encrypts a string with the given password.
 *
 * @param {string} decrypted
 * @param {string} password
 *
 * @returns {string}
 */
export const encryptString = async (decrypted, password) => {
    const options = {
        message: message.fromText(decrypted),
        passwords: [password],
        armor: true,
    };

    const { data: encrypted } = await encrypt(options);

    return encrypted;
};

/**
 * Decrypts a string with the given password.
 *
 * @param {string} encrypted
 * @param {string} password
 *
 * @returns {string}
 */
export const decryptString = async (encrypted, password) => {
    const { data: decrypted } = await decrypt({
        message: await message.readArmored(encrypted),
        passwords: [password],
        format: 'utf8',
    });

    return decrypted;
};
