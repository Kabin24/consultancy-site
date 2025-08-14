import Service from "./service.model.js";


// Create a single service
export const createService = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Name and description required" });
        }
        const newService = new Service({ name, description });
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating service" });
    }
};

export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services" });
    }
};

// Add or update all services (replace all)
// In your service controller file

export const updateService = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description } = req.body;
        const updated = await Service.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Service not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating service" });
    }
};


// Delete a service by ID
export const deleteService = async (req, res) => {
    try {
        const idToDelete = req.params.id;
        const result = await Service.findByIdAndDelete(idToDelete);
        if (!result) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service" });
    }
};