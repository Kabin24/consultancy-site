
import NavigationItem from './navigation.model.js'

export const getNavigationItems = async (req, res) => {
  try {
    const items = await NavigationItem.find({ parent: null })
      .populate('children')
      .sort('order');
    res.json(items);
  } catch (error) {
    console.error('Error fetching navigation items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createNavigationItem = async (req, res) => {
  try {
    const { title, url, order, parent, isDropdown, icon } = req.body;
    
    const newItem = new NavigationItem({
      title,
      url,
      order: order || 0,
      parent: parent || null,
      isDropdown: isDropdown || false,
      icon
    });

    const savedItem = await newItem.save();

    if (parent) {
      await NavigationItem.findByIdAndUpdate(parent, {
        $push: { children: savedItem._id },
        $set: { isDropdown: true }
      });
    }

    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating navigation item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateNavigationItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url, order, isActive, icon } = req.body;

    const updatedItem = await NavigationItem.findByIdAndUpdate(
      id,
      { title, url, order, isActive, icon },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Navigation item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating navigation item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteNavigationItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await NavigationItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Navigation item not found' });
    }

    if (item.children && item.children.length > 0) {
      await NavigationItem.deleteMany({ _id: { $in: item.children } });
    }

    if (item.parent) {
      await NavigationItem.findByIdAndUpdate(item.parent, {
        $pull: { children: item._id }
      });
    }

    await NavigationItem.findByIdAndDelete(id);
    res.json({ message: 'Navigation item deleted successfully' });
  } catch (error) {
    console.error('Error deleting navigation item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};