import { MedicationModel } from "../models/medicationModel.js";

export const MedicationController = {
  // search by name dan pagination
  async getAll(req, res) {
    try {
      const { name, page, limit } = req.query;

      if (name) {
        // 🔍 Prioritas searching
        const meds = await MedicationModel.searchByName(name);
        return res.json(meds);
      }

    // kalau ada pagination
    if (page !== undefined && limit !== undefined) {
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      const meds = await MedicationModel.getAllWithPagination(pageNum, limitNum);
      return res.json(meds);
    }

      // Default → semua data
      const meds = await MedicationModel.getAll();
      res.json(meds);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const med = await MedicationModel.getById(req.params.id);
      res.json(med);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const { price, quantity } = req.body;

      if (price <= 0 || quantity <= 0) {
        return res.status(400).json({
          error: "Price and quantity cannot be less than 0",
        });
      }

      const med = await MedicationModel.create(req.body);
      res.status(201).json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { price, quantity } = req.body;

      if (price <= 0 || quantity <= 0) {
        return res.status(400).json({
          error: "Price and quantity cannot be less than 0",
        });
      }

      const med = await MedicationModel.update(req.params.id, req.body);
      res.json(med);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await MedicationModel.remove(req.params.id);
      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getTotal(req, res) {
    try {
      const total = await MedicationModel.getTotalCount();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};