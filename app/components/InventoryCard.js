import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Grid,
  Box,
} from '@mui/material';

const InventoryCard = ({
  name,
  quantity,
  category,
  expiration_date,
  incrementItem,
  decrementItem,
  openEditModal,
}) => {
  return (
    <Card variant="outlined" sx={{ width: '100%', position: 'relative' }}>
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
            <Typography variant="h6" component="div" textAlign="center">
              Category: {category}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="div" textAlign="center">
              Expiration date: {expiration_date}
            </Typography>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              openEditModal({ name, quantity, category, expiration_date })
            }
          >
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InventoryCard;
