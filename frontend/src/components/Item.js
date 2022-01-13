import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  // CardActions,
  // Button,
  Typography,
} from "@material-ui/core";

export function Item({ listing, listingActions }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={listing.name}
        height="140"
        image={listing?.images?.picture_url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {listing.name}
        </Typography>
        <Typography variant="body2">
          {listing.summary}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
