// Mock authentication module
import "server-only";

// Simulate a delay for database/session check
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSession() {
  await delay(300); // Simulate network latency
  
  // For the sake of this tutorial/mock, return a fake session
  // To test the redirect, you could change this to return null
  return {
    user: {
      name: "Jane Developer",
      email: "jane@example.com",
    },
  };
}
