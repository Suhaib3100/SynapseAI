import { createUser } from '../../convex/users';
import { MockConvexClient } from '../mocks/convexMock';

describe('Users API', () => {
  let mockCtx: any;
  
  beforeEach(() => {
    // Setup mock context with database methods
    mockCtx = {
      db: {
        query: jest.fn(),
        insert: jest.fn(),
      },
    };
    
    // Reset mocks between tests
    jest.clearAllMocks();
  });
  
  describe('createUser', () => {
    it('should create a new user when user does not exist', async () => {
      // Mock query to return empty array (user not found)
      const mockFilter = jest.fn().mockReturnThis();
      const mockCollect = jest.fn().mockResolvedValue([]);
      mockCtx.db.query.mockReturnValue({
        filter: mockFilter,
        collect: mockCollect,
      });
      
      // Mock insert to return an ID
      mockCtx.db.insert.mockResolvedValue('user123');
      
      // Test data
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        picture: 'https://example.com/pic.jpg',
      };
      
      // Call the mutation handler directly
      const result = await createUser.handler(mockCtx, userData);
      
      // Assertions
      expect(mockCtx.db.query).toHaveBeenCalledWith('users');
      expect(mockFilter).toHaveBeenCalled();
      expect(mockCollect).toHaveBeenCalled();
      expect(mockCtx.db.insert).toHaveBeenCalledWith('users', {
        ...userData,
        credits: 500,
      });
      
      // Check result
      expect(result).toEqual({
        ...userData,
        credits: 500,
      });
    });
    
    it('should return existing user when user already exists', async () => {
      // Existing user data
      const existingUser = {
        _id: 'user123',
        name: 'Existing User',
        email: 'existing@example.com',
        picture: 'https://example.com/existing.jpg',
        credits: 500,
      };
      
      // Mock query to return the existing user
      const mockFilter = jest.fn().mockReturnThis();
      const mockCollect = jest.fn().mockResolvedValue([existingUser]);
      mockCtx.db.query.mockReturnValue({
        filter: mockFilter,
        collect: mockCollect,
      });
      
      // Test data
      const userData = {
        name: 'New Name',
        email: 'existing@example.com',
        picture: 'https://example.com/new.jpg',
      };
      
      // Call the mutation handler directly
      const result = await createUser.handler(mockCtx, userData);
      
      // Assertions
      expect(mockCtx.db.query).toHaveBeenCalledWith('users');
      expect(mockFilter).toHaveBeenCalled();
      expect(mockCollect).toHaveBeenCalled();
      expect(mockCtx.db.insert).not.toHaveBeenCalled();
      
      // Check result
      expect(result).toEqual(existingUser);
    });
    
    it('should handle errors gracefully', async () => {
      // Mock query to throw an error
      mockCtx.db.query.mockImplementation(() => {
        throw new Error('Database error');
      });
      
      // Test data
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        picture: 'https://example.com/pic.jpg',
      };
      
      // Call the mutation handler and expect it to throw
      await expect(createUser.handler(mockCtx, userData)).rejects.toThrow('Database error');
    });
  });
});