const { encode, decode, CredentialsResponse, BraidEvent } = require('./dist/index.cjs');

const c = new CredentialsResponse({ success: true, code: 200, message: 'Invalid msgpack implementation, please reload' });

const e = new BraidEvent('reload', [], 0, []);

console.log(encode(c).toString('base64'));
console.log(encode(e).toString('base64'));

// const previousGenerationInvalidCredentialsResponse = Buffer.from('x0kCg6dzdWNjZXNzwqRjb2RlzQH0p21lc3NhZ2XZLUludmFsaWQgbXNncGFjayBpbXBsZW1lbnRhdGlvbiwgcGxlYXNlIHJlbG9hZA==', 'base64');

console.log(decode(Buffer.from('xwcjpnJlbG9hZA==', 'base64')));

