import type { AuthServiceStub } from '../types/darp';

/**
 * Authentication Service Stub — Phase 1 Public Onboarding Placeholder
 */
export const authService: AuthServiceStub = {
  isAuthenticated() {
    return false; // Public onboarding journey does not require prior login
  },
  getUserSession() {
    return null;
  }
};
