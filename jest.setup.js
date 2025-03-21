// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock the Convex client
jest.mock('convex/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useAction: jest.fn(),
}));

// Mock axios for API testing
jest.mock('axios');

// Global setup
global.beforeEach(() => {
  jest.clearAllMocks();
});