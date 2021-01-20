import mongoose from "mongoose"

export const Word = mongoose.model(
  "Word",
  {
    word: String,
    translation: String,
    date: String,
    currentFibonnaci: Number,
    nextFibonnaci: Number,
  },
  "Spanish"
)
