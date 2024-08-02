import React from 'react';
import { Card, CardContent, Typography, Button, Stack } from '@mui/material';

const InventoryCard = ({
  name,
  quantity,
  category,
  expiration_date,
  incrementItem,
  decrementItem,
}) => {
  // const expirationDateString = expiration_date?.seconds
  //   ? new Date(expiration_date.seconds * 1000).toLocaleDateString()
  //   : 'N/A';
  return (
    <Card variant="outlined" sx={{ minWidth: 800 }}>
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Typography variant="h5" component="div" textAlign="center">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="outlined" onClick={() => decrementItem(name)}>
            -
          </Button>
          <Typography variant="h5" component="div" textAlign="center">
            {quantity}
          </Typography>
          <Button variant="outlined" onClick={() => incrementItem(name)}>
            +
          </Button>
        </Stack>
        <Typography variant="h5" component="div" textAlign="center">
          Category: {category}
        </Typography>
        <Typography variant="h5" component="div" textAlign="center">
          Expiration date: {expiration_date}
        </Typography>
        {/* <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => removeItem(name)}>
            Remove
          </Button>
        </Stack> */}
      </CardContent>
    </Card>
  );
};

export default InventoryCard;
