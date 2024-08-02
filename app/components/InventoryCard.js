import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Grid,
} from '@mui/material';

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
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
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
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" textAlign="center">
              Category: {category}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="div" textAlign="center">
              Expiration date: {expiration_date}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InventoryCard;
