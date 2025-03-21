# SynapseAI Testing Documentation

This document outlines the testing strategy and procedures for the SynapseAI project.

## Overview

SynapseAI uses Jest as its primary testing framework for both frontend and backend components. The tests are organized by module and focus on unit testing individual components and API endpoints.

## Test Structure

Tests are organized in the `__tests__` directory with the following structure:

```
__tests__/
├── convex/           # Tests for Convex backend functions
├── services/         # Tests for service layer functions
└── mocks/            # Mock implementations for testing
```

## Running Tests

To run the tests, use the following commands:

```bash
# Install dependencies (if not already installed)
npm install

# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with coverage report
npm test -- --coverage
```

## Writing Tests

### Backend API Tests

Backend API tests focus on testing the Convex functions that handle database operations. These tests use mock implementations of the Convex context to simulate database operations without requiring an actual database connection.

Example test for a Convex function:

```typescript
import { myConvexFunction } from '../../convex/myModule';

describe('My Convex Function', () => {
  let mockCtx: any;
  
  beforeEach(() => {
    // Setup mock context
    mockCtx = {
      db: {
        query: jest.fn(),
        insert: jest.fn(),
        // Add other methods as needed
      },
    };
    
    jest.clearAllMocks();
  });
  
  it('should perform the expected operation', async () => {
    // Arrange: Setup test data and mocks
    const mockData = { /* test data */ };
    mockCtx.db.query.mockReturnValue({
      filter: jest.fn().mockReturnThis(),
      collect: jest.fn().mockResolvedValue([]),
    });
    
    // Act: Call the function
    const result = await myConvexFunction.handler(mockCtx, mockData);
    
    // Assert: Check the results
    expect(mockCtx.db.query).toHaveBeenCalledWith('expectedTable');
    expect(result).toEqual(/* expected result */);
  });
});
```

### Service Layer Tests

Service layer tests focus on testing the functions that interact with external APIs or provide utility functionality.

Example test for a service function:

```typescript
import axios from 'axios';
import { myServiceFunction } from '../../services/myService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('My Service Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should call the external API correctly', async () => {
    // Arrange: Setup test data and mocks
    const mockResponse = { data: { /* mock response data */ } };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);
    
    // Act: Call the function
    const result = await myServiceFunction('test-param');
    
    // Assert: Check the results
    expect(mockedAxios.get).toHaveBeenCalledWith('expected-url', expect.any(Object));
    expect(result).toEqual(mockResponse.data);
  });
  
  it('should handle errors gracefully', async () => {
    // Arrange: Setup error mock
    mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));
    
    // Act & Assert: Call the function and expect it to throw
    await expect(myServiceFunction('test-param')).rejects.toThrow('API Error');
  });
});
```

## Test Coverage

The project aims to maintain a minimum of 80% test coverage for all production code. Coverage reports can be generated using:

```bash
npm test -- --coverage
```

The coverage report will be available in the `coverage` directory.

## Continuous Integration

Tests are automatically run as part of the CI/CD pipeline. Any pull request must pass all tests before it can be merged into the main branch.

## End-to-End Testing

End-to-end testing is planned for future implementation using Cypress or Playwright.