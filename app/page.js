'use client';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import InventoryCard from './components/InventoryCard';
import AddItemModal from './components/AddItemModal';
import {
  Box,
  Modal,
  Typography,
  Stack,
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
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemExpirationDate, setItemExpirationDate] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

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
    console.log(inventoryList);
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{ ml: 5 }}
    >
      <AddItemModal open={open} handleClose={handleClose} addItem={addItem} />

      {/* <Box border="1px solid #333"> */}
      <Box>
        <Box width="1750px" height="100px" bgcolor="#ADD8E6" sx={{ mb: 2 }}>
          <Typography
            variant="h2"
            color="#333"
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            Inventory Items
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          width="1000px"
          mb={2}
        >
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ mr: 2 }}
          />
          <FormControl variant="outlined" fullWidth sx={{ mr: 2 }}>
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
            fullWidth
            onClick={() => {
              handleOpen();
            }}
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
              <Grid item key={name} flexDirection={{ xs: 'column', sm: 'row' }}>
                <InventoryCard
                  name={name}
                  quantity={quantity}
                  category={category}
                  expiration_date={expiration_date}
                  incrementItem={incrementItem}
                  decrementItem={decrementItem}
                />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
}
