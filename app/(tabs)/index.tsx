import { View } from "react-native";
import React, { useMemo, useState } from "react";
import { Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import listingData from "@/assets/data/airbnb-listings.json";
import ListingsMap from "@/components/ListingsMap";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingData as any, []);
  const geoItems = useMemo(() => listingsDataGeo, []);

  const onDataChanged = (category: string) => {
    console.log("CHANGED_", category);
    setCategory(category);
  };
  return (
    /* GestureHandlerRootView necessary for android to use PanGestureHandler */
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMap listings={geoItems} />
      {/* bottomsheetmodal necessary for android for map to be interactable */}
      <BottomSheetModalProvider>
        <ListingsBottomSheet listings={items} category={category} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Page;
