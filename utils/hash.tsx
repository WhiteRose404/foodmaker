const { createHash } = require('crypto');

export default function(string: string) {
  const sha256hex = createHash('sha256').update(string).digest('hex');
  return Buffer.from(sha256hex).toString('base64');
}