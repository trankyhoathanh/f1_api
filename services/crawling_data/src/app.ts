import { ApplicationExpress } from './express_application'

const app = new ApplicationExpress()
app.config = {
  port: 3000
}
app
  .ExecuterApp()
  .then(() => {
    console.log('Executer succeed')
  })
  .catch((error) => {
    console.log(error)
  })
