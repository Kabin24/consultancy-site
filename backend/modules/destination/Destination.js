import Destination from "./Destination.model.js";

// Get 
export const getDestination = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching destinations" });
    }
};

// Add 
export const updateDestination = async (req, res) => {
    try {
        const { destinations } = req.body;
        await Destination.deleteMany({});
        await Destination.insertMany(destinations);
        res.json({ message: "Destinations updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating destinations" });
    }
};

// Delete
export const deleteDestination = async (req, res) => {
    try {
        const idToDelete = req.params.id;
        const result = await Destination.findByIdAndDelete(idToDelete);
        if (!result) {
            return res.status(404).json({ message: "Destination not found" });
        }
        res.json({ message: "Destination deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting destination" });
    }
};