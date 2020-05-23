/* eslint-disable no-console */
import { app, server } from '../src/server/server'

const port = 4000

app.listen(port, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
})
