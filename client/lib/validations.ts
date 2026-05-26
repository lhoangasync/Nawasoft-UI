import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Vui lòng nhập họ tên (ít nhất 2 ký tự)"),
  phone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .regex(/^[0-9+\s-]+$/, "Số điện thoại chỉ chứa số"),
  email: z.string().email("Email không hợp lệ"),
  product: z.string().min(1, "Vui lòng chọn sản phẩm quan tâm"),
  message: z.string().min(10, "Vui lòng nhập nội dung (ít nhất 10 ký tự)"),
  inquiryType: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
