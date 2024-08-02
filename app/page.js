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

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemExpirationDate, setItemExpirationDate] = useState('');
  const [itemQuantity, setItemQuantity] = useState(0);

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

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <AddItemModal open={open} handleClose={handleClose} addItem={addItem} />

      {/* <Box border="1px solid #333"> */}
      <Box>
        <Box width="800px" height="100px" bgcolor="#ADD8E6">
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

        <Button
          variant="contained"
          onClick={() => {
            handleOpen();
          }}
        >
          Add New Item
        </Button>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {inventory.map(({ name, quantity, category, expiration_date }) => (
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
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
