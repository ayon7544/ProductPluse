import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";
import { 
  insertProductSchema, 
  insertCategorySchema, 
  insertOrderSchema, 
  insertOrderItemSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Middleware to handle async route handlers
  const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
    (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };

  // Public Proxy API routes to avoid CORS issues (for backward compatibility)
  app.get("/api/products/external", async (req, res) => {
    try {
      const response = await axios.get(
        "https://admin.refabry.com/api/all/product/get"
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({
        status: false,
        message: "Failed to fetch products",
        data: [],
      });
    }
  });

  // Optional: Implement order placement endpoint to external API
  app.post("/api/orders/external", async (req, res) => {
    try {
      const orderData = req.body;
      const response = await axios.post(
        "https://admin.refabry.com/api/public/order/create",
        orderData
      );
      res.json(response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({
        status: false,
        message: "Failed to place order",
      });
    }
  });

  // Local Database API endpoints
  // Product endpoints
app.get("/api/products", async (req, res) => {
  try {
    const response = await axios.get(
      "https://admin.refabry.com/api/all/product/get"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: false,
      message: "Failed to fetch products",
      data: [],
    });
  }
});

  app.get("/api/products/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid product ID"
      });
    }

    const product = await storage.getProductById(id);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    res.json({
      status: true,
      message: "Product retrieved successfully",
      data: product
    });
  }));

  app.post("/api/products", asyncHandler(async (req, res) => {
    try {
      const productData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(productData);

      res.status(201).json({
        status: true,
        message: "Product created successfully",
        data: product
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: false,
          message: "Validation error",
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  app.put("/api/products/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid product ID"
      });
    }

    try {
      const productData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(id, productData);

      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Product not found"
        });
      }

      res.json({
        status: true,
        message: "Product updated successfully",
        data: product
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: false,
          message: "Validation error",
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  app.delete("/api/products/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid product ID"
      });
    }

    const success = await storage.deleteProduct(id);
    if (!success) {
      return res.status(404).json({
        status: false,
        message: "Product not found"
      });
    }

    res.json({
      status: true,
      message: "Product deleted successfully"
    });
  }));

  // Category endpoints
  app.get("/api/categories", asyncHandler(async (req, res) => {
    const categories = await storage.getCategories();
    res.json({
      status: true,
      message: "Categories retrieved successfully",
      data: categories
    });
  }));

  app.get("/api/categories/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid category ID"
      });
    }

    const category = await storage.getCategoryById(id);
    if (!category) {
      return res.status(404).json({
        status: false,
        message: "Category not found"
      });
    }

    res.json({
      status: true,
      message: "Category retrieved successfully",
      data: category
    });
  }));

  app.post("/api/categories", asyncHandler(async (req, res) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);

      res.status(201).json({
        status: true,
        message: "Category created successfully",
        data: category
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: false,
          message: "Validation error",
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // Order endpoints
  app.get("/api/orders", asyncHandler(async (req, res) => {
    const orders = await storage.getOrders();
    res.json({
      status: true,
      message: "Orders retrieved successfully",
      data: orders
    });
  }));

  app.get("/api/orders/:id", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid order ID"
      });
    }

    const order = await storage.getOrderById(id);
    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order not found"
      });
    }

    // Get order items
    const orderItems = await storage.getOrderItems(id);

    res.json({
      status: true,
      message: "Order retrieved successfully",
      data: {
        ...order,
        items: orderItems
      }
    });
  }));

  app.post("/api/orders", asyncHandler(async (req, res) => {
    try {
      // Validate order data
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);

      // Create order items if they are present
      if (req.body.items && Array.isArray(req.body.items)) {
        for (const item of req.body.items) {
          const orderItemData = {
            ...item,
            orderId: order.id
          };

          await storage.createOrderItem(orderItemData);
        }
      }

      res.status(201).json({
        status: true,
        message: "Order created successfully",
        data: order
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: false,
          message: "Validation error",
          errors: error.errors
        });
      }
      throw error;
    }
  }));

  // Update order status
  app.patch("/api/orders/:id/status", asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid order ID"
      });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(400).json({
        status: false,
        message: "Status is required"
      });
    }

    const order = await storage.updateOrderStatus(id, status);
    if (!order) {
      return res.status(404).json({
        status: false,
        message: "Order not found"
      });
    }

    res.json({
      status: true,
      message: "Order status updated successfully",
      data: order
    });
  }));

  const httpServer = createServer(app);
  return httpServer;
}
