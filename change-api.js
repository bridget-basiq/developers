const { exec } = require('child_process')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(express.json()) // to support JSON-encoded bodies
app.use(cors())
app.post('/', (req, res) => {
  exec(
    `git add . && git commit -m "fix(dev-portal): ${req.body.name} edits: ${req.body.description}"`.toLowerCase(),
    (error, stdout, stderr) => {
      if (error) {
        console.log(error)
        res.send(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(stderr)
        res.send(`stderr: ${stderr}`)
        return
      }

      console.log(stdout)
      res.send(`stdout: ${stdout}`)
    }
  )
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
