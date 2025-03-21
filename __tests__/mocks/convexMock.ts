// Mock implementation of Convex client for testing
export class MockConvexClient {
  private mockDb: Record<string, any[]> = {
    users: [],
  };

  // Mock query method
  query(tableName: string) {
    return {
      filter: (filterFn: any) => {
        // Simple implementation for testing
        return {
          collect: () => {
            return Promise.resolve(this.mockDb[tableName] || []);
          },
        };
      },
    };
  }

  // Mock insert method
  insert(tableName: string, data: any) {
    const id = `mock-id-${Date.now()}`;
    const record = { _id: id, ...data };
    
    if (!this.mockDb[tableName]) {
      this.mockDb[tableName] = [];
    }
    
    this.mockDb[tableName].push(record);
    return Promise.resolve(id);
  }

  // Reset the mock database
  reset() {
    this.mockDb = { users: [] };
  }
}