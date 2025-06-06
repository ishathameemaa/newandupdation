const News = require('../../model/newsModel.js')
const dbConnect = require("../../lib/dbConnect.js");

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const news = new News(req.body);
      const savedNews = await news.save();
      return res.status(201).json(savedNews);
    } catch (error) {
      return res.status(400).json({ message: "Error creating news", error });
    }
  }

  if (req.method === "GET") {
    try {
      const newsList = await News.find().sort({ createdAt: -1 });
      return res.status(200).json(newsList);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching news", error });
    }
  }

  if (req.method === "PUT") {
    const { id } = req.query;  // Very Important for Next.js API Route
    try {
      const updatedNews = await News.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedNews) {
        return res.status(404).json({ message: "News not found" });
      }
      return res.status(200).json(updatedNews);
    } catch (error) {
      return res.status(400).json({ message: "Error updating news", error });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;  // Very Important for Next.js API Route
    try {
      const deletedNews = await News.findByIdAndDelete(id);
      if (!deletedNews) {
        return res.status(404).json({ message: "News not found" });
      }
      return res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error deleting news", error });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
