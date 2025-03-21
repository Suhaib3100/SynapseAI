import axios from 'axios';
import { GetAuthUserData } from '../../services/GlobalApi';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GlobalApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GetAuthUserData', () => {
    it('should fetch user data from Google OAuth API', async () => {
      // Mock user data
      const mockUserData = {
        sub: '123456789',
        name: 'Test User',
        given_name: 'Test',
        family_name: 'User',
        picture: 'https://example.com/photo.jpg',
        email: 'test@example.com',
        email_verified: true,
        locale: 'en',
      };

      // Setup axios mock
      mockedAxios.get.mockResolvedValueOnce({ data: mockUserData });

      // Call the function with a mock token
      const token = 'mock-token-123';
      const result = await GetAuthUserData(token);

      // Assertions
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer' + token } }
      );
      expect(result).toEqual(mockUserData);
    });

    it('should handle API errors gracefully', async () => {
      // Setup axios mock to reject
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      // Call the function with a mock token
      const token = 'invalid-token';
      
      // Expect the function to throw
      await expect(GetAuthUserData(token)).rejects.toThrow(errorMessage);
      
      // Verify axios was called with correct parameters
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: 'Bearer' + token } }
      );
    });

    it('should handle empty or invalid tokens', async () => {
      // Test with empty token
      await expect(GetAuthUserData('')).rejects.toThrow();
      
      // Test with null token (TypeScript would prevent this, but testing for robustness)
      // @ts-ignore - Intentionally passing invalid type for testing
      await expect(GetAuthUserData(null)).rejects.toThrow();
    });
  });
});