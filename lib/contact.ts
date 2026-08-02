import { z } from "zod";
export const contactSchema=z.object({name:z.string().trim().min(2).max(80),email:z.email().max(160),phone:z.string().trim().max(30).optional(),organisation:z.string().trim().max(120).optional(),enquiry:z.string().trim().min(2).max(80),message:z.string().trim().min(20).max(4000),consent:z.literal(true),website:z.string().max(200)});
export type ContactInput=z.infer<typeof contactSchema>;
