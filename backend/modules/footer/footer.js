import Footer from "./footer.model.js"


export const getFooters = async (req, res) => {
    try {
        const footers = await Footer.find();
        res.json(footers)
    } catch (error) {

        res.status(500).json({ message: "error fetching footers" })

    }
}

export const createFooter = async (req, res) => {
    try {
        const { text, link } = req.body;
        const newFooter = new Footer({ text, link });
        await newFooter.save();
        res.status(201).json(newFooter)
    } catch (error) {
        res.status(500).json({ message: "error  creating   footer " })

    }
}

export const updateFooter = async (req, res) => {
    try {
        const { text, link } = req.body;
        const updated = await Footer.findByIdAndUpdate(
            req.params.id,
            {
                text, link
            },
            {
                new: true
            }
        );
        if (!updated) return res.status(404).json({
            message: "Footer  not  found"
        })
        res.json(updated)
    } catch (error) {

        res.status(500).json({
            meassage: "Error in updating"
        })

    }
}


export const deleteFooter = async (req, res) => {
    try {
        const deleted = await Footer.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Footer not found" });
        res.json({ message: "Footer deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting footer" });
    }
};