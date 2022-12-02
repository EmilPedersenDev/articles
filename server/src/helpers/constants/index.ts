export const accessTokenExpiration = 1800000; // 30 minutes
export const refreshTokenExpiration = 2592000000; // 30 days

export const accessTokenCookieOptions = {
  maxAge: accessTokenExpiration,
  httpOnly: true, // Cookie can only be displayed in the api
  domain: process.env.COOKIE_DOMAIN,
  path: '/', // Send cookie to all paths of the app
  sameSite: 'lax', // Send cookie from origin
  secure: process.env.NODE_ENV === 'production', // Send cookie over https
};

export const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: refreshTokenExpiration,
};
