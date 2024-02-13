import { generateKeyPairSync } from 'crypto';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

function generateKeyPair() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });

    writeFileSync(resolve(__dirname, 'private_key.pem'), privateKey.export({
        type: 'pkcs1',
        format: 'pem',
    }));

    writeFileSync(resolve(__dirname, 'public_key.pem'), publicKey.export({
        type: 'spki',
        format: 'pem',
    }));
}

generateKeyPair();