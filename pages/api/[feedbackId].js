import { getAllTestInstances } from "./feedback"

async function handler(req, res) {
    const feedbackId = req.query.feedbackId
    const allFeedback = await getAllTestInstances()

    // use double instead of triple equals cause comparing a string to a number
    const selectedFeedback = allFeedback.find((feedback) => feedback.id == feedbackId)
    console.log("IS THIS CORRECT", selectedFeedback)
    res.status(200).json(selectedFeedback)
}

export default handler
