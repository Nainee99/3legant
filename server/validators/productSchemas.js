// validators/productSchemas.js
import Joi from "joi";

// Product creation validation schema
export const productCreateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  brand: Joi.string().required(),
  specifications: Joi.object().required(),
  stock: Joi.number().min(0).required(),
  images: Joi.array().items(Joi.string()).optional(),
  discountPrice: Joi.number().min(0).optional(),
  ratings: Joi.number().min(0).max(5).optional(),
});

// Product update validation schema (Optional)
export const productUpdateSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  description: Joi.string().min(10).optional(),
  price: Joi.number().min(0).optional(),
  category: Joi.string().optional(),
  brand: Joi.string().optional(),
  specifications: Joi.object().optional(),
  stock: Joi.number().min(0).optional(),
  images: Joi.array().items(Joi.string()).optional(),
  discountPrice: Joi.number().min(0).optional(),
  ratings: Joi.number().min(0).max(5).optional(),
});
