const express = require("express")
const fileUpload = require("express-fileupload")
const Tesseract = require("tesseract.js")
const cors = require("cors");
const port = process.env.PORT || 5000;


const app = express()
app.use(fileUpload())
app.use(cors());
app.get("/", (_, res) => {
  res.send(`
    <form action='/upload' method='post' encType="multipart/form-data">
      <input type="file" name="sampleFile" />
      <input type='submit' value='Upload!' />
    </form>`)
})
app.get("/res", (req,res) => {
  res.send({message: "This message is from the backend :)"})
})
app.post("/upload", async (req, res) => {
  const { sampleFile } = req.files
  if (!sampleFile) return res.status(400).send("No files were uploaded.")
  try {
    const { data } = await Tesseract.recognize(sampleFile.data, "spa+eng", {
      logger: (m) => console.log(m),
    })
    res.send(`<pre>${data.text}</pre>`)
  } catch (error) {
    throw error
    res.send(error)
  }
})

app.listen(port, () => console.log("Backend server live on " + port));