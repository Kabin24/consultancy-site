export const consultancyDescription = {

    content: " Australia, Canada, and the United Kingdom. By providing counseling, assistance, and recruitment services to students who are interested in furthering their education at an international institution, we help and offer value to them. Our expert team always provides services that are of the highest caliber and professionalism. Since the beginning, we have maintained the greatest recognition and reputation."
};

export const getAbout = (req, res) => {
    try {
        res.json(consultancyDescription);

    } catch (error) {
        res.status(500).json({ message: "Error fetching about content" });
    }
};
