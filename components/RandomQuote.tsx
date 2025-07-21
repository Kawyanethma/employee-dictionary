import { useGetRandomQuoteQuery } from "@/services/quote.api";
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

export function RandomQuote() {
  const { data: randomQuote, isLoading } = useGetRandomQuoteQuery({});
    
  return isLoading ? (
    <View style={styles.quoteContainer}>
      <ActivityIndicator size="small" color="#202420ff" />
    </View>
  ) : (
    <View style={styles.quoteContainer}>
      <Text style={styles.title}>Quote</Text>
      <Text style={styles.quoteText}>
        &quot;{randomQuote[0]?.content}&quot;
      </Text>
      <Text style={styles.quoteAuthor}>{randomQuote[0]?.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quoteContainer: {
    padding: 16,
    backgroundColor: "#72ada0",
    borderRadius: 8,
    marginHorizontal: 22,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2b312bff",
    marginBottom: 5,
  },
  quoteText: {
    fontSize: 16,
    color: "#2b312bff",
    marginBottom: 4,
  },
  quoteAuthor: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "right",
    fontStyle: "italic",
    color: "#2b312bff",
    marginTop: 4,
  },
});
