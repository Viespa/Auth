/**
 * An array of all the routes that are public
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
];

/**
 * An array of all the routes that are auth 
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
];

/**
 * The prefix for the API routes
 * @type {string}
 */

export const apuAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";