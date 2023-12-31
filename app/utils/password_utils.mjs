import crypto from 'crypto';

export function genPassword(password) {

    let salt = crypto.randomBytes(32).toString('hex');
    let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hashstring: genHash
    }

};


export function validPassword(password, hashstring, salt) {

    let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hashstring === hashVerify;

}