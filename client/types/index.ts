export type { ContactFormValues } from "@/lib/validations";
export type { Product, ProductFeatureGroup } from "@/lib/products";

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  product: string;
  message: string;
  inquiryType?: string;
}
