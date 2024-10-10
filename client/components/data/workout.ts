const workouts = [
  {
    title: "Fitness at Home",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subWorkout: [
      {
        name: "Full Body Burn Workout",
        duration: 16,
        description:
          "A basic push-up workout to strengthen your chest and arms.",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        calorieBurn: "72",
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
            duration: 30,
            desc: "Hula rotations are a great way to warm up your body before a workout. They help increase blood",
            howTo: [
              "Stand with your feet shoulder-width apart and your arms extended out to the sides.",
              "Rotate your hips in a circular motion, as if you were hula hooping.",
            ],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video:
              "https://i.pinimg.com/originals/27/62/a0/2762a04be78c7cd9acb113fb3025e7bf.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
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
        category: "Medium",
        warmUp: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
      {
        name: "Jumping Jacks",
        duration: 5,
        description: "A quick cardio workout to get your heart rate up.",
        image:
          "https://images.pexels.com/photos/4839736/pexels-photo-4839736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        calorieBurn: "40",
        focusZones: "Cardio",
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
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
      {
        name: "Stronger Body Workout",
        duration: 25,
        description: "A quick cardio workout to get your heart rate up.",
        image:
          "https://images.pexels.com/photos/4839736/pexels-photo-4839736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        calorieBurn: "128",
        focusZones: "Full Body",
        equipment: [
          {
            name: "Loop Band",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          {
            name: "Pilates Mat",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
        ],
        category: "Medium",
        warmUp: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
      {
        name: "Butt and Thigh Workout",
        duration: 23,
        description: "A quick cardio workout to get your heart rate up.",
        image:
          "https://images.pexels.com/photos/4839736/pexels-photo-4839736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        calorieBurn: "118",
        focusZones: "Full Body",
        equipment: [
          {
            name: "Pilates Mat",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
        ],
        category: "Advanced",
        warmUp: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
    ],
  },
  {
    title: "Morning Yoga",
    image:
      "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subWorkout: [
      {
        name: "Sun Salutation",
        duration: "10 minutes",
        description: "A series of yoga poses to energize your morning.",
        image: "https://example.com/sunsalutation.jpg",
        calorieBurn: 30,
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
            title: "Cat-Cow Pose",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Mountain Pose",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Forward Fold",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Chaturanga",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Upward Dog",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Downward Dog",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [],
        coolDown: [
          {
            title: "Child's Pose",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
      {
        name: "Warrior Sequence",
        duration: "15 minutes",
        description:
          "A sequence of warrior poses to build strength and balance.",
        image: "https://example.com/warriorsequence.jpg",
        calorieBurn: 45,
        focusZones: "Full Body",
        equipment: [
          {
            name: "Pilates Mat",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
        ],
        category: "Medium",
        warmUp: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
      {
        name: "Cool Down Stretch",
        duration: "5 minutes",
        description: "A gentle stretch to cool down after your yoga practice.",
        image: "https://example.com/cooldownstretch.jpg",
        calorieBurn: 15,
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
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
    ],
  },

  {
    title: "Cardio Blast",
    image:
      "https://images.unsplash.com/photo-1513351974182-1f36b4d965d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    subWorkout: [
      {
        name: "High Knees",
        duration: "10 minutes",
        description:
          "A high-intensity cardio workout to get your heart pumping.",
        image: "https://example.com/highknees.jpg",
        calorieBurn: 100,
        focusZones: "Legs",
        equipment: [
          {
            name: "Pilates Mat",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
        ],
        category: "Medium",
        warmUp: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
      {
        name: "Butt Kicks",
        duration: "5 minutes",
        description: "A quick cardio workout to warm up your legs.",
        image: "https://example.com/buttkicks.jpg",
        calorieBurn: 50,
        focusZones: "Legs",
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
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
      {
        name: "Jump Rope",
        duration: "15 minutes",
        description:
          "A fun cardio workout to improve your coordination and stamina.",
        image:
          "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        calorieBurn: 120,
        focusZones: "Full Body",
        equipment: [
          {
            name: "Pilates Mat",
            image:
              "https://images.pexels.com/photos/4498515/pexels-photo-4498515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
        ],
        category: "Medium",
        warmUp: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setOne: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setTwo: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setThree: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        setFour: [
          {
            title: "Push-ups",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Plank",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
        coolDown: [
          {
            title: "Hula Rotations (Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
          {
            title: "Hula Rotations (Counter-Clockwise)",
            image:
              "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            video: "https://cdn.jefit.com/assets/img/exercises/gifs/871.gif",
            duration: 30,
            desc: "",
            howTo: ["step 1", "step 2"],
            tips: ["Do this step"],
          },
        ],
      },
    ],
  },
];
export default workouts;
