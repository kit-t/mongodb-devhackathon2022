import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
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
        <Typography variant="body2" color="text.secondary">
          {listing.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
  // return (
  //   <ListItem>
  //     <ListItemIcon>
  //       <Checkbox
  //         edge="start"
  //         color="primary"
  //         checked={listing.isComplete}
  //         onClick={() => {
  //           listingActions.toggleTodo(listing);
  //         }}
  //       />
  //     </ListItemIcon>
  //     <ListItemText>{todo.summary}</ListItemText>
  //     <ListItemSecondaryAction>
  //       <IconButton
  //         edge="end"
  //         size="small"
  //         onClick={() => {
  //           todoActions.deleteTodo(todo);
  //         }}
  //       >
  //         <ClearIcon />
  //       </IconButton>
  //     </ListItemSecondaryAction>
  //   </ListItem>
  // );
}
