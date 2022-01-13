import React from "react";
import {
  Container,
  List,
  LinearProgress,
} from "@material-ui/core";
import { useListings } from "../hooks/useListings";
import { Item } from "./Item";
import { useShowLoader } from "../hooks/util-hooks";

export function ItemsPage() {
  const { loading, listings, ...listingActions } = useListings();
  const showLoader = useShowLoader(loading, 200);
  return (
    <Container className="main-container" maxWidth="sm">
      {loading ? (
        showLoader ? (
          <LinearProgress />
        ) : null
      ) : (
        <div className="todo-items-container">
          <List style={{ width: "100%" }}>
            {listings.map((listing) => (
              <Item
                key={String(listing._id)}
                listing={listing}
                listingActions={listingActions}
              />
            ))}
          </List>
        </div>
      )}
    </Container>
  );
}
