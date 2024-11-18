import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  SOCKET_SERVER_URL,
  useGetAllUserPostQuery,
} from "@/redux/api/apiClient";
import { useNavigation } from "expo-router";
import { useTheme } from "@/constants/ThemeProvider";
import Picker from "react-native-picker-select";
import RNPickerSelect from "react-native-picker-select";
import Button from "@/components/Button";
const CreatePost = () => {
  const { colors } = useTheme();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [categories, setCategories] = useState("");
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const {
    data: posts,
    error,
    isLoading: postIsLoading,
    refetch,
  } = useGetAllUserPostQuery();
  const navigation = useNavigation();
  const handleSelectMedia = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to enable permissions to access the media library."
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const selectedMedia = pickerResult.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.fileName || asset.uri.split("/").pop(),
        type:
          asset.mimeType ||
          (asset.uri.endsWith(".mp4")
            ? "video/mp4"
            : asset.uri.endsWith(".mov")
            ? "video/quicktime"
            : "image/jpeg"),
      }));

      console.log(selectedMedia);

      setMedia(selectedMedia);
    }
  };

  const handleSubmit = async () => {
    if (!content && !media) {
      Alert.alert("Validation Error", "Content or media is required.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (tags) {
      formData.append("tags", tags);
    }
    formData.append("categories", categories);

    if (media && media.length > 0) {
      media.forEach((file, index) => {
        let fileType = file.type || "application/octet-stream";
        formData.append(`files`, {
          uri: file.uri,
          type: fileType,
          name: file.name || `file_${index}`,
        });
      });
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${SOCKET_SERVER_URL}/api/v1/post/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refetch();
      Alert.alert("Success", "Post created successfully.");
      navigation.goBack();
      setContent("");
      setTags("");
      setCategories("");
      setMedia(null);
    } catch (error) {
      console.error("Error uploading post:", error);
      Alert.alert("Error", "Failed to create post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 25,
            marginVertical: 15,
            textAlign: "center",
          }}
        >
          Create Post
        </Text>
      </View>
      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        Content
      </Text>
      <TextInput
        style={[
          //   styles.input,
          {
            color: colors.text,
            backgroundColor: colors.opacity,
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
          },
        ]}
        placeholder="Write your content here..."
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor={colors.text}
      />
      {/* <Text style={styles.label}>Tags</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter tags (comma-separated)"
        value={tags}
        onChangeText={setTags}
      /> */}
      <Text
        style={[
          styles.label,
          {
            color: colors.text,
          },
        ]}
      >
        Categories
      </Text>
      <View
        style={{
          backgroundColor: colors.secondary,
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => setCategories(value)}
          items={[
            { label: "Workout", value: "workout" },
            { label: "Nutrition", value: "nutrition" },
            { label: "Motivation", value: "motivation" },
            { label: "General", value: "general" },
          ]}
          style={{
            inputIOS: {
              color: colors.text,
              backgroundColor: colors.opacity,
              borderRadius: 8,
              padding: 10,
              marginBottom: 20,
            },
            inputAndroid: {
              color: colors.text,
              backgroundColor: colors.opacity,
              borderRadius: 8,
              padding: 10,
              marginBottom: 20,
            },
          }}
        />
      </View>
      {/* <Picker
        // placeholder={{
        //   label: "Select a category...",
        //   value: null,
        // }}
        style={{
          inputIOS: {
            color: colors.text,
            backgroundColor: colors.opacity,
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
          },
          inputAndroid: {
            color: colors.text,
            backgroundColor: colors.opacity,
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
          },
        }}
        onValueChange={(value) => setCategories(value)}
        items={[
          { label: "Workout", value: "workout" },
          { label: "Nutrition", value: "nutrition" },
          { label: "Motivation", value: "motivation" },
          { label: "General", value: "general" },
        ]}
      /> */}
      {/* <Picker
        value={categories} // Binding selected category to the state
        placeholder={{
          label: "Select a category...",
          //   value: null,
        }}
        style={{
          inputIOS: {
            color: "#000", // Replace with your color
            backgroundColor: "#fff", // Replace with your color
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
          },
          inputAndroid: {
            color: "#000", // Replace with your color
            backgroundColor: "#fff", // Replace with your color
            borderRadius: 8,
            padding: 10,
            marginBottom: 20,
          },
        }}
        onValueChange={(value) => setCategories(value)} // Update state when category changes
        items={[
          { label: "Workout", value: "workout" },
          { label: "Nutrition", value: "nutrition" },
          { label: "Motivation", value: "motivation" },
          { label: "General", value: "general" },
        ]}
      /> */}
      {/* <TextInput
        style={styles.input}
        placeholder="Enter categories"
        value={categories}
        onChangeText={setCategories}
      /> */}

      <Button title="Select Media" handlePress={handleSelectMedia} />
      {media && (
        <View style={styles.preview}>
          {/* {media.type.startsWith("image") ? (
            <Image source={{ uri: media.uri }} style={styles.image} />
          ) : (
            <Text>{media.name}</Text>
          )} */}
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Submit Post" handlePress={handleSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  preview: {
    marginVertical: 10,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
});

export default CreatePost;
