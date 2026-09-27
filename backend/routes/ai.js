const express = require('express')
const router = express.Router()

router.post('/ask', async (req, res) => {
  const { question } = req.body
  const q = question.toLowerCase()

  let answer = ""

  if (q.includes('shoulder')) {
    answer = "Avoid shoulder press, bench press, and overhead exercises. Do light cardio and leg workouts."
  } 
  else if (q.includes('back pain')) {
    answer = "Avoid deadlifts and heavy squats. Try walking, stretching and core exercises."
  }
  else if (q.includes('knee pain')) {
    answer = "Avoid running and heavy leg press. Prefer cycling and light hamstring stretches."
  }
  else if (q.includes('weight loss')) {
    answer = "Focus on cardio, skipping, cycling and high-rep light weight exercises."
  }
  else if (q.includes('muscle gain')) {
    answer = "Do compound exercises like bench press, squats, deadlifts with high protein diet."
  }
  else if (q.includes('diet')) {
    answer = "Take high protein foods like eggs, paneer, dal, banana shake and drink plenty of water."
  }
  else {
    answer = "Do a mix of cardio and strength training. Maintain proper diet and rest for best results."
  }

  res.json({ answer })
})

module.exports = router