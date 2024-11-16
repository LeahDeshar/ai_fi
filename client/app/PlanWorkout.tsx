import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ScrollView,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useTheme } from "@/constants/ThemeProvider";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Pedometer } from "expo-sensors";
import { Calendar } from "react-native-calendars";

import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Button } from "react-native";
import { Circle, G, Rect, Svg } from "react-native-svg";
import { IconButton } from "react-native-paper";
import {
  useCreatePlaylistMutation,
  useGetAllPlaylistQuery,
  useGetExeQuery,
  useGetUserActivityQuery,
  useUpadateUserActivityMutation,
} from "@/redux/api/apiClient";
import { ActivityIndicator } from "react-native";

const activity = [
  {
    name: "Full Body Burn Workout",
    duration: 16,
    description: "A basic push-up workout to strengthen your chest and arms.",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calorieBurn: "87",
    focusZones: "Full Body",
    equipment: [
      {
        name: "Pilates Mat",
        image:
          "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
    category: "Newbie",
    warmUp: [
      {
        title: "Hula Rotations (Clockwise)",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
        duration: 20,
        desc: "Hula rotations are a great way to warm up your body before a workout. They help increase blood",
        howTo: [
          "Stand with your feet shoulder-width apart and your arms extended out to the sides.",
          "Rotate your hips in a circular motion, as if you were hula hooping.",
        ],
        commonMistake: [
          "Try not to bend at the waist.Think of this as a laid-back,loose motion to get your hips moving",
        ],
        tips: ["Let your hips loosen up"],
      },
      {
        title: "Hula Rotations (Counter-Clockwise)",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
        duration: 20,
        desc: "",
        howTo: [
          "Stand with your feet shoulder-width apart and your arms extended out to the sides.",
          "Rotate your hips in a circular motion, as if you were hula hooping.",
        ],
        commonMistake: [
          "Try not to bend at the waist.Think of this as a laid-back,loose motion to get your hips moving",
        ],
        tips: ["Let your hips loosen up"],
      },
      {
        title: "Knee Rotations (Clockwise)",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/870.gif",
        duration: 20,
        desc: "Knee rotations are effective for warming up your knee joints and preparing them for more intense exercises.",
        howTo: [
          "Stand with your feet together and your hands on your knees.",
          "Slowly rotate your knees in a circular motion in a clockwise direction.",
        ],
        commonMistake: [
          "Avoid locking your knees during the movement. Keep them slightly bent to ensure a smooth rotation.",
        ],
        tips: ["Keep the motion gentle to avoid straining your knee joints."],
      },
      {
        title: "Knee Rotations (Counter-Clockwise)",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/870.gif",
        duration: 20,
        desc: "Knee rotations are beneficial for loosening up the knee joints before engaging in a workout routine.",
        howTo: [
          "Stand with your feet together and your hands on your knees.",
          "Slowly rotate your knees in a circular motion in a counter-clockwise direction.",
        ],
        commonMistake: [
          "Make sure not to force the movement. Perform the rotations gently to protect your knees.",
        ],
        tips: [
          "Keep your movements slow and controlled for maximum effectiveness.",
        ],
      },
    ],
    setOne: [
      {
        title: "Low Impact Jumping Jack",
        image:
          "https://images.unsplash.com/photo-1584382297767-55e02ff7ed7b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/901.gif",
        duration: 30,
        desc: "Low impact jumping jacks are a modified version of the traditional jumping jack that reduce stress on your joints while still engaging your entire body.",
        howTo: [
          "Start with your feet together and your arms at your sides.",
          "Step your right foot out to the side as you raise your arms to shoulder height.",
          "Bring your right foot back to the starting position while lowering your arms.",
          "Repeat with your left foot, alternating sides.",
        ],
        commonMistake: [
          "Avoid bouncing or jumping; keep the movement controlled and step lightly.",
        ],
        tips: [
          "Engage your core to maintain balance and stability throughout the exercise.",
        ],
      },
      {
        title: "Walking High Knees",
        image:
          "https://images.unsplash.com/photo-1605285821863-bb0d17869c3e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/904.gif",
        duration: 30,
        desc: "Walking high knees are a great way to engage your core, improve your balance, and warm up your lower body for more intense exercises.",
        howTo: [
          "Stand tall with your feet hip-width apart.",
          "Lift your right knee up towards your chest while bringing your left arm forward.",
          "Lower your right leg and repeat with the left knee, alternating sides in a marching motion.",
        ],
        commonMistake: [
          "Avoid leaning back or arching your lower back; keep your core tight and your chest lifted.",
        ],
        tips: [
          "Focus on bringing your knees as high as possible to maximize the movement's effectiveness.",
        ],
      },
      {
        title: "Butt Kicks",
        image:
          "https://images.unsplash.com/photo-1599058917723-eca858dda02f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/905.gif",
        duration: 30,
        desc: "Butt kicks are a cardio exercise that helps improve your endurance while targeting your hamstrings and glutes.",
        howTo: [
          "Stand with your feet hip-width apart and your arms at your sides.",
          "Lift your right heel towards your glutes, then quickly switch to lift your left heel.",
          "Continue alternating legs in a fluid motion, keeping your core engaged.",
        ],
        commonMistake: [
          "Avoid leaning forward; keep your chest up and your back straight during the movement.",
        ],
        tips: [
          "Keep the movement light and fast to increase your heart rate and improve cardiovascular endurance.",
        ],
      },
    ],
    setTwo: [
      {
        title: "Calf Raise",
        image:
          "https://images.unsplash.com/photo-1599058917723-eca858dda02f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/902.gif",
        duration: 30,
        desc: "Calf raises are a simple but effective exercise that targets your calf muscles, helping improve lower leg strength and stability.",
        howTo: [
          "Stand tall with your feet hip-width apart and your hands on your hips or at your sides.",
          "Slowly rise onto the balls of your feet, lifting your heels off the ground.",
          "Pause at the top of the movement, then slowly lower your heels back to the starting position.",
        ],
        commonMistake: [
          "Avoid bouncing or using momentum; focus on controlled movements to engage the calf muscles fully.",
        ],
        tips: [
          "Engage your core to help maintain balance and stability throughout the exercise.",
        ],
      },
      {
        title: "Alternating Forward Lunges",
        image:
          "https://images.unsplash.com/photo-1605285821863-bb0d17869c3e?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/903.gif",
        duration: 30,
        desc: "Alternating forward lunges are a lower body exercise that works your quads, glutes, and hamstrings while improving balance and stability.",
        howTo: [
          "Stand upright with your feet hip-width apart and your hands on your hips or at your sides.",
          "Step forward with your right foot, lowering your hips until both knees are bent at about a 90-degree angle.",
          "Push through your right heel to return to the starting position, then repeat with your left leg.",
        ],
        commonMistake: [
          "Avoid letting your front knee extend past your toes; keep your knee aligned with your ankle.",
        ],
        tips: [
          "Keep your chest up and engage your core to maintain balance during the movement.",
        ],
      },
      {
        title: "Calf Raise Hold",
        image:
          "https://images.unsplash.com/photo-1599058917723-eca858dda02f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/906.gif",
        duration: 30,
        desc: "Calf raise hold is an isometric exercise that strengthens the calf muscles by holding a raised position for an extended period.",
        howTo: [
          "Stand with your feet hip-width apart and hands resting on your hips or a stable surface for balance.",
          "Slowly rise onto the balls of your feet, lifting your heels off the ground.",
          "Hold the position for the specified duration, focusing on engaging your calf muscles.",
        ],
        commonMistake: [
          "Avoid leaning forward or backward; maintain a neutral posture with your core engaged.",
        ],
        tips: [
          "Focus on squeezing your calves at the top of the movement to maximize muscle activation.",
        ],
      },
    ],
    setThree: [
      {
        title: "Side Leg Raise with Heel Touch (Right)",
        image:
          "https://images.unsplash.com/photo-1605902711622-cfb43c443edc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/911.gif",
        duration: 30,
        desc: "The side leg raise with heel touch (right) helps strengthen the hip abductors and improves lower body stability.",
        howTo: [
          "Stand tall with your feet hip-width apart and your hands on your hips.",
          "Lift your right leg to the side, keeping it straight, then touch your heel back down to the ground.",
          "Repeat the motion while keeping your core engaged and avoiding leaning to the side.",
        ],
        commonMistake: [
          "Do not lean your torso to the opposite side; focus on keeping your body upright.",
        ],
        tips: ["Control the movement and avoid swinging your leg too quickly."],
      },
      {
        title: "Side Leg Raise with Heel Touch (Left)",
        image:
          "https://images.unsplash.com/photo-1605902711622-cfb43c443edc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/912.gif",
        duration: 30,
        desc: "The side leg raise with heel touch (left) targets the hip abductors, enhancing lower body stability and mobility.",
        howTo: [
          "Stand with your feet hip-width apart, hands on your hips.",
          "Lift your left leg to the side, keeping it straight, then touch your heel back down to the ground.",
          "Repeat the motion while maintaining a steady and upright posture.",
        ],
        commonMistake: [
          "Avoid leaning your upper body to the opposite side; stay upright to isolate the leg movement.",
        ],
        tips: ["Keep your movements controlled to maximize muscle engagement."],
      },
      {
        title: "Side to Side Lunge",
        image:
          "https://images.unsplash.com/photo-1581569494394-4b0ead1c7801?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/913.gif",
        duration: 30,
        desc: "Side to side lunges are an effective exercise to strengthen your glutes, quads, and inner thighs while improving flexibility.",
        howTo: [
          "Stand with your feet wide apart and your toes pointing slightly outward.",
          "Lunge to the right by bending your right knee and pushing your hips back, keeping your left leg straight.",
          "Push through your right foot to return to the starting position, then lunge to the left side.",
        ],
        commonMistake: [
          "Avoid letting your knees cave inwards; keep them aligned with your toes throughout the movement.",
        ],
        tips: [
          "Engage your core and maintain a straight back to avoid leaning forward.",
        ],
      },
    ],
    setFour: [
      {
        title: "United Bicep",
        image:
          "https://images.unsplash.com/photo-1599484203170-8e9e5a51aa12?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/914.gif",
        duration: 30,
        desc: "The united bicep exercise targets your arm muscles, specifically the biceps, and helps to build strength and tone.",
        howTo: [
          "Stand with your feet hip-width apart and your arms at your sides.",
          "Bring your hands together in front of your chest, forming a fist with both hands.",
          "Squeeze your biceps as you press your fists together, then release slightly and repeat.",
        ],
        commonMistake: [
          "Do not let your elbows flare out to the sides; keep them close to your body for proper form.",
        ],
        tips: [
          "Focus on squeezing your biceps throughout the movement for maximum activation.",
        ],
      },
      {
        title: "Prayer Pulse",
        image:
          "https://images.unsplash.com/photo-1599484203170-8e9e5a51aa12?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/915.gif",
        duration: 30,
        desc: "Prayer pulse is an effective exercise for targeting your triceps and upper chest muscles with a pulsing motion.",
        howTo: [
          "Place your palms together in front of your chest, as if you are in a prayer position.",
          "Press your palms together tightly while pulsing them up and down in small movements.",
          "Keep your shoulders relaxed and focus on the squeeze in your triceps.",
        ],
        commonMistake: [
          "Avoid tensing your shoulders; keep them down and relaxed to focus the work on your triceps.",
        ],
        tips: [
          "Make sure to pulse in a controlled manner without using momentum.",
        ],
      },
      {
        title: "Narrow Push-Up from Knees",
        image:
          "https://images.unsplash.com/photo-1599484203170-8e9e5a51aa12?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/916.gif",
        duration: 30,
        desc: "Narrow push-ups from knees focus on strengthening the triceps, chest, and shoulder muscles with a closer hand placement.",
        howTo: [
          "Get into a kneeling position on the floor and place your hands directly under your shoulders.",
          "Lower your body down towards the floor by bending your elbows, keeping them close to your sides.",
          "Push back up to the starting position, maintaining a straight line from your knees to your head.",
        ],
        commonMistake: [
          "Do not allow your elbows to flare out; keep them tucked close to your body to properly engage the triceps.",
        ],
        tips: [
          "Engage your core and maintain a straight line to prevent your hips from sagging.",
        ],
      },
    ],
    coolDown: [
      {
        title: "Hip Flexor Stretch (Right)",
        image:
          "https://images.unsplash.com/photo-1556228453-74ff9b2a8537?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/920.gif",
        duration: 20,
        desc: "The Hip Flexor Stretch targets the hip muscles, helping to increase flexibility and relieve tension in the hip area.",
        howTo: [
          "Start in a lunge position with your right foot forward and left knee on the ground.",
          "Push your hips forward gently, feeling a stretch in your left hip flexor.",
          "Hold the position while keeping your upper body upright.",
        ],
        commonMistake: [
          "Avoid arching your lower back; keep your spine straight to focus the stretch on the hip flexor.",
        ],
        tips: [
          "Breathe deeply and relax into the stretch for better flexibility.",
        ],
      },
      {
        title: "Hip Flexor Stretch (Left)",
        image:
          "https://images.unsplash.com/photo-1556228453-74ff9b2a8537?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/920.gif",
        duration: 20,
        desc: "The Hip Flexor Stretch targets the hip muscles, helping to increase flexibility and relieve tension in the hip area.",
        howTo: [
          "Start in a lunge position with your left foot forward and right knee on the ground.",
          "Push your hips forward gently, feeling a stretch in your right hip flexor.",
          "Hold the position while keeping your upper body upright.",
        ],
        commonMistake: [
          "Avoid arching your lower back; keep your spine straight to focus the stretch on the hip flexor.",
        ],
        tips: [
          "Breathe deeply and relax into the stretch for better flexibility.",
        ],
      },
      {
        title: "Knee to Chest Stretch (Right)",
        image:
          "https://images.unsplash.com/photo-1556228453-74ff9b2a8537?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/921.gif",
        duration: 20,
        desc: "The Knee to Chest Stretch helps release tension in the lower back and glutes while improving flexibility.",
        howTo: [
          "Lie on your back with your legs extended.",
          "Bring your right knee towards your chest, holding it with both hands.",
          "Keep your left leg straight on the floor while holding the stretch.",
        ],
        commonMistake: [
          "Avoid lifting your head off the ground; keep your neck relaxed during the stretch.",
        ],
        tips: [
          "Hold the stretch gently without forcing the knee too close to your chest.",
        ],
      },
      {
        title: "Knee to Chest Stretch (Left)",
        image:
          "https://images.unsplash.com/photo-1556228453-74ff9b2a8537?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/921.gif",
        duration: 20,
        desc: "The Knee to Chest Stretch helps release tension in the lower back and glutes while improving flexibility.",
        howTo: [
          "Lie on your back with your legs extended.",
          "Bring your left knee towards your chest, holding it with both hands.",
          "Keep your right leg straight on the floor while holding the stretch.",
        ],
        commonMistake: [
          "Avoid lifting your head off the ground; keep your neck relaxed during the stretch.",
        ],
        tips: [
          "Hold the stretch gently without forcing the knee too close to your chest.",
        ],
      },
      {
        title: "Pigeon Pose (Left)",
        image:
          "https://images.unsplash.com/photo-1556228453-74ff9b2a8537?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/922.gif",
        duration: 20,
        desc: "Pigeon Pose stretches the hip rotators and flexors, helping to improve flexibility and release tension.",
        howTo: [
          "Start in a tabletop position, then bring your left knee forward and place it behind your left wrist.",
          "Extend your right leg straight behind you with your toes pointing back.",
          "Lower your hips to the ground, keeping them square and centered.",
        ],
        commonMistake: [
          "Avoid leaning to one side; keep your hips level to get the full benefit of the stretch.",
        ],
        tips: ["Relax and breathe deeply to allow the stretch to deepen."],
      },
      {
        title: "Pigeon Pose (Right)",
        image:
          "https://images.unsplash.com/photo-1556228453-74ff9b2a8537?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/922.gif",
        duration: 20,
        desc: "Pigeon Pose stretches the hip rotators and flexors, helping to improve flexibility and release tension.",
        howTo: [
          "Start in a tabletop position, then bring your right knee forward and place it behind your right wrist.",
          "Extend your left leg straight behind you with your toes pointing back.",
          "Lower your hips to the ground, keeping them square and centered.",
        ],
        commonMistake: [
          "Avoid leaning to one side; keep your hips level to get the full benefit of the stretch.",
        ],
        tips: ["Relax and breathe deeply to allow the stretch to deepen."],
      },
    ],
  },
  {
    name: "Hourglass Full Body Workout",
    duration: 13,
    description: "Sit-ups to strengthen your core muscles.",
    image:
      "https://images.unsplash.com/photo-1550259979-ed79b48d2a30?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    calorieBurn: "57",
    focusZones: "Core",
    equipment: [
      {
        name: "Pilates Mat",
        image:
          "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    ],
    category: "Newbie",
    warmUp: [
      {
        title: "Wide Leg Good Morning",
        image:
          "https://images.unsplash.com/photo-1595343387889-b7d5455d71f6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/923.gif",
        duration: 30,
        desc: "Wide Leg Good Morning helps to stretch and strengthen the hamstrings, lower back, and glutes.",
        howTo: [
          "Stand with your feet wider than shoulder-width apart and your hands on your hips.",
          "Hinge at the hips, keeping your back straight and lowering your upper body forward.",
          "Return to the starting position by engaging your hamstrings and glutes.",
        ],
        commonMistake: [
          "Avoid rounding your back; keep your spine straight to protect your lower back.",
        ],
        tips: [
          "Keep a slight bend in your knees to reduce strain on the lower back.",
        ],
      },
      {
        title: "Side Reach (Right)",
        image:
          "https://images.unsplash.com/photo-1595343387889-b7d5455d71f6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/924.gif",
        duration: 20,
        desc: "Side Reach targets the oblique muscles, enhancing flexibility and mobility in the sides of the body.",
        howTo: [
          "Stand with your feet hip-width apart and raise your right arm overhead.",
          "Lean to the left side, reaching your right arm over your head to feel a stretch along your right side.",
          "Hold the stretch, then return to the starting position.",
        ],
        commonMistake: [
          "Avoid twisting your torso; focus on a smooth, lateral stretch.",
        ],
        tips: ["Breathe deeply as you reach to increase the stretch."],
      },
      {
        title: "Side Reach (Left)",
        image:
          "https://images.unsplash.com/photo-1595343387889-b7d5455d71f6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/924.gif",
        duration: 20,
        desc: "Side Reach targets the oblique muscles, enhancing flexibility and mobility in the sides of the body.",
        howTo: [
          "Stand with your feet hip-width apart and raise your left arm overhead.",
          "Lean to the right side, reaching your left arm over your head to feel a stretch along your left side.",
          "Hold the stretch, then return to the starting position.",
        ],
        commonMistake: [
          "Avoid twisting your torso; focus on a smooth, lateral stretch.",
        ],
        tips: ["Breathe deeply as you reach to increase the stretch."],
      },
      {
        title: "Hip Openers",
        image:
          "https://images.unsplash.com/photo-1595343387889-b7d5455d71f6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/925.gif",
        duration: 30,
        desc: "Hip Openers improve hip flexibility and mobility, essential for reducing tightness and preventing injury.",
        howTo: [
          "Start by standing with your feet shoulder-width apart.",
          "Lift one knee to hip level and then rotate it outward in a circular motion.",
          "Repeat on the other side to help open up the hip joints.",
        ],
        commonMistake: [
          "Avoid fast or jerky movements; perform the rotations in a controlled manner.",
        ],
        tips: ["Focus on smooth, circular movements to maximize hip mobility."],
      },
    ],
    setOne: [
      {
        title: "Side to Side Hop",
        image:
          "https://images.unsplash.com/photo-1557787167-1d2c918bf885?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/926.gif",
        duration: 30,
        desc: "Side to Side Hop is a cardiovascular exercise that improves agility, coordination, and leg strength.",
        howTo: [
          "Stand with your feet together and arms at your sides.",
          "Hop to the right, landing lightly on your right foot while lifting your left foot slightly off the ground.",
          "Immediately hop to the left, landing on your left foot while lifting your right foot slightly off the ground.",
        ],
        commonMistake: [
          "Avoid stiff landings; aim for soft, controlled landings to prevent injury.",
        ],
        tips: ["Keep your core engaged to help maintain balance."],
      },
      {
        title: "Ice Skaters (modified)",
        image:
          "https://images.unsplash.com/photo-1557787167-1d2c918bf885?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/927.gif",
        duration: 20,
        desc: "Ice Skaters (modified) enhance lateral movement skills and strengthen the lower body muscles, especially glutes and thighs.",
        howTo: [
          "Stand with your feet hip-width apart and slightly bend your knees.",
          "Leap to the right side, landing on your right foot while bringing your left foot behind your right ankle.",
          "Push off with your right foot and leap to the left, landing on your left foot while bringing your right foot behind your left ankle.",
        ],
        commonMistake: [
          "Avoid leaning too far forward; keep your chest up and back straight.",
        ],
        tips: ["Move in a controlled manner to maximize muscle engagement."],
      },
      {
        title: "Low Impact Jumping Jack",
        image:
          "https://images.unsplash.com/photo-1557787167-1d2c918bf885?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/928.gif",
        duration: 30,
        desc: "Low Impact Jumping Jack is a gentle alternative to the traditional jumping jack, suitable for beginners or those with joint concerns.",
        howTo: [
          "Stand with your feet together and arms by your sides.",
          "Step your right foot out to the side while raising your arms above your head.",
          "Bring your right foot back to the starting position as you lower your arms.",
          "Repeat on the left side.",
        ],
        commonMistake: [
          "Avoid fast movements; aim for slow and controlled steps to protect your joints.",
        ],
        tips: ["Engage your core for stability during the movement."],
      },
    ],
    setTwo: [
      {
        title: "Crossover Touch Squat",
        image:
          "https://images.unsplash.com/photo-1603261722080-05192e4bcd96?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/929.gif",
        duration: 30,
        desc: "The Crossover Touch Squat is a dynamic lower body exercise that improves balance and coordination while engaging your core.",
        howTo: [
          "Stand with your feet shoulder-width apart.",
          "Squat down, reaching your right hand to touch your left foot as you twist your torso.",
          "Return to standing and repeat on the opposite side, reaching your left hand to touch your right foot.",
        ],
        commonMistake: [
          "Avoid rounding your back; keep your chest up and core engaged.",
        ],
        tips: ["Focus on controlled movements for better balance."],
      },
      {
        title: "Single Leg Calf Raise (Right)",
        image:
          "https://images.unsplash.com/photo-1559956767-84d11eebd8ef?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/930.gif",
        duration: 20,
        desc: "The Single Leg Calf Raise strengthens the calf muscles and improves balance, targeting one leg at a time.",
        howTo: [
          "Stand on your right leg with your left foot slightly lifted off the ground.",
          "Slowly raise your right heel off the ground, lifting your body upward.",
          "Lower your heel back down to the starting position and repeat.",
        ],
        commonMistake: [
          "Avoid leaning to one side; maintain a straight posture.",
        ],
        tips: ["Use a wall or chair for support if needed."],
      },
      {
        title: "Single Leg Calf Raise (Left)",
        image:
          "https://images.unsplash.com/photo-1559956767-84d11eebd8ef?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/930.gif",
        duration: 20,
        desc: "The Single Leg Calf Raise (Left) is similar to the right side but focuses on strengthening the left calf muscle.",
        howTo: [
          "Stand on your left leg with your right foot slightly lifted off the ground.",
          "Slowly raise your left heel off the ground, lifting your body upward.",
          "Lower your heel back down to the starting position and repeat.",
        ],
        commonMistake: [
          "Avoid leaning to one side; maintain a straight posture.",
        ],
        tips: ["Use a wall or chair for support if needed."],
      },
    ],
    setThree: [
      {
        title: "Robot Arms",
        image:
          "https://images.unsplash.com/photo-1616473479575-b8e38b2e21a3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/931.gif",
        duration: 30,
        desc: "Robot Arms is a dynamic warm-up exercise that improves shoulder mobility and stability while activating the upper body muscles.",
        howTo: [
          "Stand with your feet shoulder-width apart and arms extended to your sides at shoulder height.",
          "Rotate your arms in a circular motion, mimicking a robot's movements.",
          "Continue for the duration of the exercise.",
        ],
        commonMistake: [
          "Avoid using momentum; move your arms in a controlled manner.",
        ],
        tips: ["Keep your core engaged to stabilize your body."],
      },
      {
        title: "Commando Plank from Knees",
        image:
          "https://images.unsplash.com/photo-1616473479575-b8e38b2e21a3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/932.gif",
        duration: 20,
        desc: "The Commando Plank from Knees is an effective core strengthening exercise that targets the abdominal muscles and shoulders.",
        howTo: [
          "Start in a kneeling plank position with your hands directly under your shoulders.",
          "Lower one arm at a time to the ground, then return to the starting position.",
          "Alternate arms for the duration of the exercise.",
        ],
        commonMistake: [
          "Avoid sagging your hips; maintain a straight line from head to knees.",
        ],
        tips: ["Engage your core throughout the exercise."],
      },
      {
        title: "United Bicep",
        image:
          "https://images.unsplash.com/photo-1596512501961-3f9db0a76720?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/933.gif",
        duration: 30,
        desc: "The United Bicep exercise strengthens the biceps and forearms, enhancing grip strength and arm definition.",
        howTo: [
          "Stand with your feet shoulder-width apart, holding weights in each hand.",
          "Curl the weights toward your shoulders while keeping your elbows close to your body.",
          "Lower the weights back to the starting position and repeat.",
        ],
        commonMistake: [
          "Avoid swinging the weights; use controlled movements.",
        ],
        tips: ["Focus on squeezing your biceps at the top of the curl."],
      },
    ],
    setFour: [
      {
        title: "Crunches",
        image:
          "https://images.unsplash.com/photo-1627331868917-5ef7335016e2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/934.gif",
        duration: 30,
        desc: "Crunches are a fundamental core exercise that targets the abdominal muscles, helping to strengthen and define the core.",
        howTo: [
          "Lie on your back with your knees bent and feet flat on the ground.",
          "Place your hands behind your head and lift your shoulder blades off the floor.",
          "Engage your core and squeeze your abs as you lift, then slowly lower back down.",
        ],
        commonMistake: [
          "Avoid pulling on your neck; keep your elbows wide and engage your core.",
        ],
        tips: [
          "Focus on slow and controlled movements for maximum effectiveness.",
        ],
      },
      {
        title: "Elbows to Knees Crunch",
        image:
          "https://images.unsplash.com/photo-1615465398972-810b484e3371?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/935.gif",
        duration: 30,
        desc: "The Elbows to Knees Crunch is an effective variation that targets the obliques and lower abdominal muscles.",
        howTo: [
          "Lie on your back with your knees bent and feet flat on the floor.",
          "Bring your elbows towards your knees as you lift your shoulders off the ground.",
          "Engage your core and hold the position briefly before lowering back down.",
        ],
        commonMistake: [
          "Avoid straining your neck; keep your movements controlled.",
        ],
        tips: [
          "Focus on bringing your elbows towards your knees for better engagement.",
        ],
      },
      {
        title: "Slow Mountain Climbers",
        image:
          "https://images.unsplash.com/photo-1575758452148-491f4e25d626?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/936.gif",
        duration: 30,
        desc: "Slow Mountain Climbers are a great way to engage your core while also improving cardiovascular endurance.",
        howTo: [
          "Start in a high plank position with your hands under your shoulders.",
          "Slowly bring one knee towards your chest, then return it to the starting position.",
          "Alternate legs, maintaining a steady pace throughout.",
        ],
        commonMistake: [
          "Avoid raising your hips too high; keep your body in a straight line.",
        ],
        tips: ["Breathe steadily and engage your core during the movement."],
      },
    ],
    coolDown: [
      {
        title: "Lunge with Internal Rotation (Right)",
        image:
          "https://images.unsplash.com/photo-1612399521232-60b51e72ba8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/937.gif",
        duration: 20,
        desc: "The Lunge with Internal Rotation stretches and strengthens the lower body while enhancing hip mobility.",
        howTo: [
          "Step forward with your right leg into a lunge position.",
          "Rotate your torso toward your right leg, engaging your core.",
          "Return to standing and repeat on the opposite side.",
        ],
        commonMistake: [
          "Avoid letting your knee extend beyond your toes during the lunge.",
        ],
        tips: ["Maintain a straight back and engage your core throughout."],
      },
      {
        title: "Lunge with Internal Rotation (Left)",
        image:
          "https://images.unsplash.com/photo-1612399521232-60b51e72ba8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/937.gif",
        duration: 20,
        desc: "The Lunge with Internal Rotation (Left) focuses on the left leg while improving flexibility and strength.",
        howTo: [
          "Step forward with your left leg into a lunge position.",
          "Rotate your torso toward your left leg, engaging your core.",
          "Return to standing and repeat.",
        ],
        commonMistake: [
          "Avoid letting your knee extend beyond your toes during the lunge.",
        ],
        tips: ["Maintain a straight back and engage your core throughout."],
      },
      {
        title: "Cobra",
        image:
          "https://images.unsplash.com/photo-1584671459021-225c9c9e7f38?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        video: "https://cdn.jefit.com/assets/img/exercises/gifs/938.gif",
        duration: 20,
        desc: "The Cobra pose is a gentle stretch that opens up the chest and stretches the spine, promoting flexibility.",
        howTo: [
          "Lie face down on the ground with your palms under your shoulders.",
          "Press into your palms and lift your chest off the ground, keeping your hips down.",
          "Hold the position and breathe deeply.",
        ],
        commonMistake: [
          "Avoid overextending your back; keep your shoulders relaxed.",
        ],
        tips: ["Focus on stretching your chest and keeping your neck neutral."],
      },
    ],
  },
];

const PlanWorkout = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectTarget, setSelectTarget] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [customVisible, setCustomModalVisible] = useState(false);
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [indata, setIndata] = useState();

  const {
    data: userActivity,
    refetch,
    isLoading: isActivityLoading,
  } = useGetUserActivityQuery();
  const [createPlaylist, isCreating] = useCreatePlaylistMutation();
  const [updateActivity, isUpdating] = useUpadateUserActivityMutation();

  const handleModalVisible = (item) => {
    setModalVisible(!modalVisible);
    setSelectedExercise(item);
    handleInstruction(item.instructions);
  };

  const handleInstruction = (instruction) => {
    console.log(typeof instruction);
    if (!instruction) {
      setIndata([]);
      return;
    }

    try {
      const instructions = instruction
        .slice(1, -1)
        .split("', '")
        .map((ins) => ins.replace(/^'/, "").replace(/'$/, "").trim());

      setIndata(instructions);
    } catch (error) {
      console.error("Error parsing instructions:", error);
      setIndata([instruction]);
    }
  };

  const handleCustomActivity = () => {
    setCustomModalVisible(true);
  };

  const handleSaveCalories = async () => {
    console.log("Calories Burned Updated:", caloriesBurned);
    await updateActivity({
      calorieIntake:
        Number(userActivity?.activity?.calorieIntake) + Number(caloriesBurned),
    }).unwrap();
    refetch();
    setCaloriesBurned(0);
    setModalVisible(false);
  };

  const {
    data: playlist,
    refetch: playRefetch,
    isLoading: isPlaylistLoading,
  } = useGetAllPlaylistQuery();

  console.log(playlist);
  const toggleBookmark = (item) => {
    console.log(item);
    setIsBookmarked((prev) => !prev);
    createPlaylist({ data: item }).unwrap();
    playRefetch();
  };
  // playRefetch();

  const target = [
    "lats",
    "spine",
    "upper back",
    "traps",
    "cardiovascular system",
    "pectorals",
    "serratus anterior",
    "forearms",
    "calves",
    "levator scapulae",
    "delts",
    "triceps",
    "biceps",
    "quads",
    "glutes",
    "hamstrings",
    "adductors",
    "abductors",
    "abs",
  ];

  const {
    data: reData,
    error,
    isLoading: reIsLoading,
  } = useGetExeQuery({
    target_input: selectTarget,
    k: 15,
  });

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };
  const progress = 1;
  const size = 185;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  if (isPlaylistLoading || isActivityLoading)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Loading ...
        </Text>
      </View>
    );

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.background,
          }}
        >
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                borderBottomColor: "#acacac47",
                paddingBottom: 3,
                borderBottomWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <AntDesign name="arrowleft" size={20} color={colors.icon} />
              </TouchableOpacity>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 20,
                  fontWeight: "semibold",
                  textAlign: "center",
                  marginVertical: 16,
                }}
              >
                Today's activity
              </Text>
              <TouchableOpacity onPress={openBottomSheet}>
                <AntDesign name="calendar" size={20} color={colors.icon} />
              </TouchableOpacity>
            </View>

            {/* {reIsLoading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            )} */}

            <View
              style={{
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
                backgroundColor: colors.background,
                paddingVertical: 25,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Svg width={size} height={size}>
                  <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="#ffffff"
                      strokeWidth={strokeWidth}
                      fill="none"
                    />
                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="#eaeaeb"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      // strokeDasharray={circumference}
                      strokeDashoffset={170}
                      fill="none"
                    />
                    <Circle
                      cx={size / 2}
                      cy={size / 2}
                      r={radius}
                      stroke="#66BB6A"
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      fill="none"
                    />
                  </G>
                </Svg>
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 44,
                      fontWeight: 500,
                      color: colors.text,
                    }}
                  >
                    {(userActivity?.activity?.calorieIntake).toFixed(1)}
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                    }}
                  >
                    of 600 kcal
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: colors.text,
                      }}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                marginHorizontal: 15,
                gap: 10,
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: dark ? "#46454592" : "#dcdcdc93",
                paddingTop: 30,
              }}
            >
              <View
                style={{
                  // marginHorizontal: 20,
                  // marginTop: 30,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    // padding: 10,
                    marginBottom: 10,
                    color: colors.text,
                  }}
                >
                  Completed Activities
                </Text>
                <TouchableOpacity
                  onPress={handleCustomActivity}
                  style={{
                    backgroundColor: "#d8d8d894",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    // marginHorizontal: 20,
                    paddingVertical: 13,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    Log a Custom Activity
                  </Text>
                  <Ionicons name="add" size={20} />
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  marginBottom: 20,
                }}
              >
                {target.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor:
                        selectTarget === item ? colors.primary : colors.opacity,
                      padding: 10,
                      borderRadius: 20,
                      margin: 5,
                    }}
                    onPress={() => setSelectTarget(item)}
                  >
                    <Text
                      style={{
                        color:
                          selectTarget === item
                            ? "white"
                            : dark
                            ? "white"
                            : "black",
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View>
                {reData &&
                  reData?.exeData?.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => handleModalVisible(item)}
                      key={index}
                      style={{
                        backgroundColor: dark ? "#343434f1" : "#d8d8d894",
                        borderRadius: 15,
                        padding: 5,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: 15,
                        marginVertical: 8,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 12,
                            marginVertical: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              marginTop: 9,
                              marginVertical: 10,
                              fontWeight: 600,
                              color: colors.text,
                            }}
                          >
                            {(item?.name).toUpperCase()}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              // justifyContent: "space-between",
                              marginTop: 5,
                              marginRight: 20,
                              marginVertical: 10,
                              gap: 30,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <Ionicons
                                name="body"
                                size={18}
                                color={colors.text}
                              />
                              <Text
                                style={{
                                  color: dark ? "#9c9c9cd3" : "#414141bb",
                                }}
                              >
                                {item?.bodyPart}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <Ionicons
                                name="barbell-outline"
                                size={18}
                                color={colors.text}
                              />
                              <Text
                                style={{
                                  color: dark ? "#9c9c9cd3" : "#414141bb",
                                }}
                              >
                                {item?.equipment}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <FontAwesome5
                                name="burn"
                                size={18}
                                color={colors.text}
                              />
                              <Text
                                style={{
                                  color: dark ? "#9c9c9cd3" : "#414141bb",
                                }}
                              >
                                {item?.estimatedCaloriesBurned}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      <FontAwesome6
                        name="angle-right"
                        size={20}
                        color={dark ? "#9c9c9cd3" : "#414141bb"}
                      />
                    </TouchableOpacity>
                  ))}
              </View>

              {activity?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: dark ? "#343434f1" : "#d8d8d894",
                    borderRadius: 15,
                    padding: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 10,
                      }}
                    />
                    <View
                      style={{
                        marginLeft: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 9,
                          fontWeight: 600,
                          color: colors.text,
                        }}
                      >
                        {item?.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 5,
                          width: "60%",
                        }}
                      >
                        <Text
                          style={{
                            color: dark ? "#9c9c9cd3" : "#414141bb",
                          }}
                        >
                          {item?.duration} min
                        </Text>
                        <Text
                          style={{
                            color: dark ? "#9c9c9cd3" : "#414141bb",
                          }}
                        >
                          {item?.focusZones}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <FontAwesome6
                    name="angle-right"
                    size={20}
                    color={dark ? "#9c9c9cd3" : "#414141bb"}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <Modal
            visible={modalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <ScrollView>
                  <Text style={styles.header}>{selectedExercise?.name}</Text>
                  <Text style={styles.subHeader}>
                    Target Muscle: {selectedExercise?.target}
                  </Text>
                  <Text style={styles.subHeader}>
                    Body Part: {selectedExercise?.bodyPart}
                  </Text>
                  <Text style={styles.subHeader}>
                    Equipment: {selectedExercise?.equipment}
                  </Text>
                  <Text style={styles.subHeader}>
                    Calories Burned: {selectedExercise?.estimatedCaloriesBurned}{" "}
                    kcal
                  </Text>
                  <Text style={styles.instructionsHeader}>Instructions:</Text>

                  {indata?.map((instruction, index) => (
                    <Text key={index} style={styles.instruction}>
                      {index + 1}. {instruction}
                    </Text>
                  ))}
                </ScrollView>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.bookmarkButton}
                    onPress={() => toggleBookmark(selectedExercise)}
                  >
                    <Text style={styles.bookmarkText}>
                      {isBookmarked ? "Bookmarked" : "Bookmark"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <Modal visible={customVisible} animationType="slide" transparent>
            <TouchableWithoutFeedback
              onPress={() => {
                setCustomModalVisible(false);
                setCaloriesBurned(0);
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    width: "80%",
                    borderRadius: 10,
                    padding: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Update Calories Burned
                  </Text>

                  {/* Input Field */}
                  <TextInput
                    style={{
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderRadius: 8,
                      padding: 10,
                      marginBottom: 20,
                      backgroundColor: "#f9f9f9",
                    }}
                    placeholder="Enter calories burned"
                    keyboardType="numeric"
                    value={caloriesBurned}
                    onChangeText={setCaloriesBurned}
                  />

                  {/* Save Button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#007BFF",
                      padding: 10,
                      borderRadius: 8,
                      width: "100%",
                      alignItems: "center",
                    }}
                    onPress={handleSaveCalories}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <BottomSheetModal
            snapPoints={["20%", "50%"]}
            ref={bottomSheetRef}
            index={1}
            backdropComponent={BottomSheetBackdrop}
            handleComponent={() => <View />}
          >
            <View
              style={{
                marginTop: 15,
              }}
            >
              <CalendarPicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </View>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const CalendarPicker = ({ selectedDate, setSelectedDate }) => {
  const renderCustomArrow = (direction) => {
    return <Text style={styles.arrow}>{direction === "left" ? "<" : ">"}</Text>;
  };
  const { colors } = useTheme();

  const today = new Date().toISOString().split("T")[0];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Calendar
        current={today}
        minDate={"2020-01-01"}
        maxDate={today}
        onDayPress={(day) => {
          console.log("selected day", day);
          setSelectedDate(day.dateString);
        }}
        monthFormat={"MMMM yyyy"}
        hideExtraDays={true}
        disableMonthChange={true}
        hideArrows={false}
        renderArrow={renderCustomArrow}
        enableSwipeMonths={true}
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        markedDates={{
          [today]: {
            selected: true,
            selectedColor: colors.secondary,
          },
          ...(selectedDate && {
            [selectedDate]: {
              marked: true,
            },
          }),
        }}
        renderHeader={(date) => {
          const header = date.toString("MMMM yyyy");
          return (
            <View style={styles.header}>
              <Text style={styles.headerText}>{header}</Text>
            </View>
          );
        }}
        style={{
          height: 350,
          width: 380,
        }}
        theme={{
          arrowColor: "black",
          textSectionTitleColor: "black",
          selectedDayBackgroundColor: "green",
          selectedDayTextColor: "white",
          todayTextColor: "red",
          dayTextColor: "black",
          textDisabledColor: "gray",
          dotColor: "green",
          selectedDotColor: "red",
          monthTextColor: "black",
          indicatorColor: "black",
          textDayFontFamily: "monospace",
          textMonthFontFamily: "monospace",
          textDayHeaderFontFamily: "monospace",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
};

export default PlanWorkout;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    marginBottom: 5,
  },
  instructionsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  instruction: {
    fontSize: 14,
    marginVertical: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  bookmarkButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
  },
  bookmarkText: {
    color: "black",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 18,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 32,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "gray",
  },
});
