import { QueryClient } from "@tanstack/react-query";

/**
 * @file This file initializes and exports a QueryClient instance for React Query.
 * @module QueryClient
 */

/**
 * The QueryClient instance used throughout the application for data fetching, caching, and state management with React Query.
 * @see {@link https://tanstack.com/}
 */
const queryClient = new QueryClient();

export default queryClient;
