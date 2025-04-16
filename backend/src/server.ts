import app from "./app"

// Start server
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
