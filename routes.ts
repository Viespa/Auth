/**
 * An array of all the routes that are public
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/verify-email",
];

/**
 * An array of all the routes that are auth 
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/forgot-password",
    "/auth/reset-password",
];

/**
 * The prefix for the API routes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";