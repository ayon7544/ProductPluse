import * as schema from "@shared/schema";

// Mock database client for development
const mockDb = {
  select: () => ({
    from: () => ({
      where: () => [],
      orderBy: () => []
    })
  }),
  insert: () => ({
    values: () => ({
      returning: () => [{ id: 1, name: "Test Product" }]
    })
  }),
  update: () => ({
    set: () => ({
      where: () => ({
        returning: () => [{ id: 1 }]
      })
    })
  }),
  delete: () => ({
    where: () => true
  })
};

// For local development without a real database
export const db = mockDb;
