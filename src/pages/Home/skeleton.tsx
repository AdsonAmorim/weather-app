// packages
import React from "react";
import { Box, FlatList, Text, View } from "native-base";

// components
import { Skeleton } from "@components/Skeleton";

export function HomeSkeleton() {
  return (
    <>
      <View alignItems="center" flex={1} justifyContent="center">
        <Skeleton width={184} height={184} />

        <Skeleton height={4} marginBottom={1} marginTop={4} />
        <Skeleton height={4} marginBottom={1} />
        <Skeleton height={16} marginBottom={1} />
        <Skeleton height={4} marginBottom={3} />
      </View>
      <View paddingBottom={4}>
        <Text marginBottom={2} color="light.text">
          Previsão para os próximos dias
        </Text>

        <FlatList
          data={Array.from({ length: 5 })}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item, index }) => (
            <Box flex={1} marginRight={3}>
              <Skeleton height={32} width={32} />
            </Box>
          )}
        />
      </View>
    </>
  );
}
