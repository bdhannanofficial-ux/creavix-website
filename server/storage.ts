import { db } from "./db";
import { contacts, type InsertContact, type Contact } from "@shared/schema";
import { sql } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getRatingStats(): Promise<{ totalReviews: number; fiveStarCount: number; averageRating: number }>;
}

export class DatabaseStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getRatingStats(): Promise<{ totalReviews: number; fiveStarCount: number; averageRating: number }> {
    const result = await db
      .select({
        totalReviews: sql<number>`count(*)::int`,
        fiveStarCount: sql<number>`count(*) filter (where rating = 5)::int`,
        averageRating: sql<number>`coalesce(avg(rating), 5.0)::numeric(3,1)`,
      })
      .from(contacts);
    const row = result[0];
    return {
      totalReviews: row?.totalReviews ?? 0,
      fiveStarCount: row?.fiveStarCount ?? 0,
      averageRating: Number(row?.averageRating ?? 5.0),
    };
  }
}

export const storage = new DatabaseStorage();
