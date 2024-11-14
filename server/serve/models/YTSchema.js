import mongoose from "mongoose";

const YTSchema = new mongoose.Schema({
  video_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  channelId: {
    type: String,
  },
  channelName: {
    type: String,
  },
  Publish_date: {
    type: String,
  },
  Publish_time: {
    type: String,
  },
  tags: {
    type: String,
  },
  channelTitle: {
    type: String,
  },
  duration: {
    type: String,
  },
  viewCount: {
    type: Number,
  },
  likeCount: {
    type: Number,
  },
});

export const YTmodel = mongoose.model("YTSchema", YTSchema);

export default YTmodel;
