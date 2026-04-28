import "server-only";
import { connection } from "next/server";

// Simulate a database call that uses server secrets
export async function getUserFromDB(userId: string) {
    await connection();
    // In real code, this would use process.env.DATABASE_URL
    // The INTERNAL_CONFIG demonstrates server-only variable access
    const config = process.env.INTERNAL_CONFIG ?? "default";

    // Simulated database response with sensitive fields
    return {
        id: userId,
        email: "user@example.com",
        passwordHash: "bcrypt$2b$10$...", // NEVER expose this
        internalNotes: `VIP customer (config: ${config})`, // NEVER expose this
        name: "Jane Developer",
        createdAt: new Date().toISOString(),
    };
}

// Mock database for posts and products
export const db = {
    post: {
        async create({ data }: { data: { title: string; content: string } }) {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            return {
                id: Math.random().toString(36).substring(7),
                title: data.title,
                content: data.content,
                slug: data.title.toLowerCase().replace(/\s+/g, '-'),
                createdAt: new Date(),
            };
        },
    },
    products: {
        async update({ where, data }: { where: { id: string }; data: { name?: string; price?: number } }) {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            // biome-ignore lint/suspicious/noConsole: Demo logging for development
            console.log(`Updating product ${where.id}:`, data);
            
            return {
                id: where.id,
                ...data,
                updatedAt: new Date(),
            };
        },
        async delete({ where }: { where: { id: string } }) {
            // Simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 500));
            
            // biome-ignore lint/suspicious/noConsole: Demo logging for development
            console.log(`Deleting product ${where.id}`);
            
            return {
                id: where.id,
                deletedAt: new Date(),
            };
        },
    },
};