import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';

const categories = [
  'Beverages',
  'Bread & Bakery',
  'Canned & Jarred Goods',
  'Condiments & Sauces',
  'Dairy',
  'Dried Goods & Pasta',
  'Frozen Foods',
  'Fruits & Vegetables',
  'Grains & Rice',
  'Meat & Seafood',
  'Snacks',
  'Spices & Seasonings',
];

const AddItemModal = ({ open, handleClose, addItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemExpirationDate, setItemExpirationDate] = useState('');

  const handleAddItem = () => {
    addItem({
      name: itemName,
      category: itemCategory,
      quantity: itemQuantity,
      expiration_date: itemExpirationDate,
    });
    setItemName('');
    setItemCategory('');
    setItemQuantity(0);
    setItemExpirationDate('');
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        sx={{
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Typography variant="h6">Add Item</Typography>

        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={itemCategory}
          onChange={(e) => setItemCategory(e.target.value)}
          select
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Quantity"
          variant="outlined"
          fullWidth
          type="number"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(Number(e.target.value))}
        />
        <TextField
          label="Expiration Date"
          variant="outlined"
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={itemExpirationDate}
          onChange={(e) => setItemExpirationDate(e.target.value)}
        />
        <Button variant="outlined" onClick={handleAddItem}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
