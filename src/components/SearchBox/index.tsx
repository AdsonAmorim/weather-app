import React, { useEffect, useRef, useState } from "react";
import { type TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box, Icon, Input } from "native-base";
import { useDebounce } from "@hooks/debounce.hook";

interface SearchBoxProps {
  getData: (data: string) => void;
}

export function SearchBox({ getData }: SearchBoxProps) {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef<TextInput>(null);
  const debouncedValue = useDebounce<string>(searchText);

  useEffect(() => {
    getData(debouncedValue);
  }, [debouncedValue]);

  const onChangeText = (value: string) => {
    setSearchText(value ?? "");
  };

  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      <Input
        placeholder="Busque uma cidade"
        value={searchText}
        ref={inputRef}
        size="md"
        textAlign="center"
        color="light.text"
        variant="unstyled"
        width="85%"
        returnKeyType="search"
        placeholderTextColor="light.text"
        fontSize="md"
        onChangeText={onChangeText}
        onSubmitEditing={(data) => {
          getData(data.nativeEvent.text);
        }}
      />
      {searchText === "" ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            inputRef.current?.focus();
          }}
        >
          <Icon as={Ionicons} size="md" name="search" color="light.text" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSearchText("");
            getData("");
          }}
        >
          <Icon as={Ionicons} size="md" name="close" color="light.text" />
        </TouchableOpacity>
      )}
    </Box>
  );
}
