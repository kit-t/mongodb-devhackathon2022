import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import { dataSourceName } from "../realm.json";
import {
  addValueAtIndex,
  replaceValueAtIndex,
  updateValueAtIndex,
  removeValueAtIndex,
  getTodoIndex,
} from "../utils";

const getListingIndex = getTodoIndex;

export function useListings() {
  // Set up a list of listings in state
  const realmApp = useRealmApp();
  const [listings, setListings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Get a client object for the listing task collection
  const listingCollection = useCollection({
    cluster: dataSourceName,
    db: "sample_airbnb",
    collection: "listingsAndReviews",
  });

  // Fetch all listings on load and whenever our collection changes (e.g. if the current user changes)
  React.useEffect(() => {
    listingCollection.find({}, {limit: 10}).then((fetchedListings) => {
      setListings(fetchedListings);
      setLoading(false);
    });
  }, [listingCollection]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  useWatch(listingCollection, {
    onInsert: (change) => {
      setListings((oldListings) => {
        if (loading) {
          return oldListings;
        }
        const idx =
          getListingIndex(oldListings, change.fullDocument) ?? oldListings.length;
        if (idx === oldListings.length) {
          return addValueAtIndex(oldListings, idx, change.fullDocument);
        } else {
          return oldListings;
        }
      });
    },
    onUpdate: (change) => {
      setListings((oldListings) => {
        if (loading) {
          return oldListings;
        }
        const idx = getListingIndex(oldListings, change.fullDocument);
        return updateValueAtIndex(oldListings, idx, () => {
          return change.fullDocument;
        });
      });
    },
    onReplace: (change) => {
      setListings((oldListings) => {
        if (loading) {
          return oldListings;
        }
        const idx = getListingIndex(oldListings, change.fullDocument);
        return replaceValueAtIndex(oldListings, idx, change.fullDocument);
      });
    },
    onDelete: (change) => {
      setListings((oldListings) => {
        if (loading) {
          return oldListings;
        }
        const idx = getListingIndex(oldListings, { _id: change.documentKey._id });
        if (idx >= 0) {
          return removeValueAtIndex(oldListings, idx);
        } else {
          return oldListings;
        }
      });
    },
  });

  // Given a draft listing, format it and then insert it
  const saveListing = async (draftListing) => {
    if (draftListing.summary) {
      draftListing._partition = realmApp.currentUser.id;
      try {
        await listingCollection.insertOne(draftListing);
      } catch (err) {
        if (err.error.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that we tried to insert a listing multiple times (i.e. an existing listing has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
    }
  };

  // Toggle whether or not a given listing is complete
  const toggleListing = async (listing) => {
    await listingCollection.updateOne(
      { _id: listing._id },
      { $set: { isComplete: !listing.isComplete } }
    );
  };

  // Delete a given listing
  const deleteListing = async (listing) => {
    await listingCollection.deleteOne({ _id: listing._id });
  };

  return {
    loading,
    listings,
    saveListing,
    toggleListing,
    deleteListing,
  };
}
