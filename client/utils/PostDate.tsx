import React from "react";
import { Text } from "react-native";
import { formatDistanceToNow, isToday, format } from "date-fns";
import { StyleSheet } from "react-native";

const PostDate = ({ createdAt, colors }) => {
  const postDate = new Date(createdAt);

  const displayDate = isToday(postDate)
    ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
    : format(postDate, "dd MMM yyyy");

  return (
    <Text style={[styles.postBody, { color: "#c7c7c7" }]}>{displayDate}</Text>
  );
};

export default PostDate;
const styles = StyleSheet.create({
  postBody: {
    fontSize: 12,
    marginTop: 3,

    // marginVertical: 5,
  },
});
