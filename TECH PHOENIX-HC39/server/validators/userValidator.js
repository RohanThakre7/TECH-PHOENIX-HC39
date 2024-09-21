const { z } = require("zod");

// Signup validation schema
const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
    userType: z.enum(["student", "mentor"]),
    experience: z.number().optional(),
    contact: z.string().optional(),
    fees: z.string().optional(),
    company: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) =>
      data.userType === "student" ||
      (data.userType === "mentor" &&
        data.experience &&
        data.contact &&
        data.fees &&
        data.company),
    {
      message: "Mentor-specific fields are required for mentors",
      path: ["experience"],
    }
  );

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

module.exports = { signupSchema, loginSchema };
