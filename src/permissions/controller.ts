import { Permission } from "../models/permission";

export async function findPermissions(req, res) {
  try {
    const result = await Permission.findAll({ attributes: ["name", "id"] });
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}
