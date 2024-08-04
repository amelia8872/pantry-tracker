'use client';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import InventoryCard from './components/InventoryCard';
import AddItemModal from './components/AddItemModal';
import EditItemModal from './components/EditItemModal';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  collection,
  getDocs,
  query,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

const categories = [
  'All',
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

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const updateInventory = async () => {
    const snapshot = query(collection(db, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });

    setInventory(inventoryList);
  };

  const addItem = async ({ name, category, quantity, expiration_date }) => {
    const docRef = doc(db, 'inventory', name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity: currentQuantity } = docSnap.data();
      await setDoc(docRef, {
        category,
        quantity: currentQuantity + quantity,
        expiration_date,
      });
    } else {
      await setDoc(docRef, { category, quantity, expiration_date });
    }

    await updateInventory();
  };

  const incrementItem = async (name) => {
    const docRef = doc(db, 'inventory', name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { ...docSnap.data(), quantity: quantity + 1 });
      await updateInventory();
    }
  };

  const decrementItem = async (name) => {
    const docRef = doc(db, 'inventory', name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity > 1) {
        await setDoc(docRef, { ...docSnap.data(), quantity: quantity - 1 });
      } else {
        await deleteDoc(docRef);
      }
      await updateInventory();
    }
  };

  const updateItem = async (updatedItem) => {
    const { name, category, quantity, expiration_date } = updatedItem;
    const docRef = doc(db, 'inventory', name);
    await setDoc(docRef, { category, quantity, expiration_date });
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = (item) => {
    setSelectedItem(item);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const filteredInventory = inventory.filter((item) => {
    return (
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      gap={2}
      sx={{ mt: 4, p: 2 }}
    >
      <AddItemModal open={open} handleClose={handleClose} addItem={addItem} />
      <EditItemModal
        open={editOpen}
        handleClose={handleEditClose}
        item={selectedItem}
        updateItem={updateItem}
      />

      <Box width="100%" maxWidth="1750px" mb={2}>
        <Typography
          variant="h2"
          color="#333"
          alignItems="center"
          display="flex"
          justifyContent="center"
          p={2}
          sx={{ backgroundColor: '#ADD8E6', mb: 2 }}
        >
          Inventory Items
        </Typography>

        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          sx={{ flexWrap: 'wrap' }}
        >
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1, mr: 2, mb: 1, minWidth: '250px' }}
          />
          <FormControl
            variant="outlined"
            sx={{ flexGrow: 1, mr: 2, mb: 1, minWidth: '150px' }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ mb: 1, minWidth: '150px' }}
            onClick={handleOpen}
          >
            Add New Item
          </Button>
        </Box>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {filteredInventory.map(
            ({ name, quantity, category, expiration_date }) => (
              <Grid item key={name} xs={12} sm={6} md={4}>
                <InventoryCard
                  name={name}
                  quantity={quantity}
                  category={category}
                  expiration_date={expiration_date}
                  incrementItem={incrementItem}
                  decrementItem={decrementItem}
                  openEditModal={handleEditOpen}
                />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
}
