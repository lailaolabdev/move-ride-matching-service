import { Request } from 'express'
import { IRating, ratingModel } from '../models/rating'

// Create a new rating
export const createRatingService = async (req: Request): Promise<IRating> => {
  try {
    const { userId, rating } = req.body

    const newRating = await ratingModel.create({
      userId,
      rating
    })

    return newRating
  } catch (error) {
    console.log('Error creating rating:', error)
    throw error
  }
}

// Get all ratings (with optional pagination and filter)
export const getAllRatingsService = async (
  skip: number,
  limit: number,
  filter: any
): Promise<{ total: number; ratings: IRating[] }> => {
  try {
    const total = await ratingModel.countDocuments(filter)
    const ratings = await ratingModel.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    return { total, ratings }
  } catch (error) {
    console.log('Error retrieving ratings:', error)
    throw error
  }
}

// Get rating by ID
export const getRatingByIdService = async (id: string): Promise<IRating | null> => {
  try {
    return await ratingModel.findById(id)
  } catch (error) {
    console.log('Error retrieving rating by ID:', error)
    throw error
  }
}

// Update rating by ID
export const updateRatingService = async (req: Request): Promise<IRating | null> => {
  try {
    const { rating } = req.body
    const id = req.params.id

    const updatedRating = await ratingModel.findByIdAndUpdate(
      id,
      { rating },
      { new: true }
    )

    return updatedRating
  } catch (error) {
    console.log('Error updating rating:', error)
    throw error
  }
}

// Delete rating by ID
export const deleteRatingService = async (id: string): Promise<IRating | null> => {
  try {
    return await ratingModel.findByIdAndDelete(id)
  } catch (error) {
    console.log('Error deleting rating:', error)
    throw error
  }
}
