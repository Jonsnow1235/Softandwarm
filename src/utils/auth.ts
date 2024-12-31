// DO NOT CHANGE THESE CREDENTIALS
const ADMIN_CREDENTIALS = {
  username: 'Safwen guida',
  password: '@Softandwarm18'
};

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}