const express = require('express');
const session = require('express-session');
const path = require('path');
const {db} = require('./db/index');
const routes = require('./routes/index');
const sessionRoutes = require('./routes/sessionRoutes');

const port = process.env.PORT || 3000;

require('dotenv').config();

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({
  db,
  table: 'session',
  extendDefaults: (defaults, _session) => {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: _session.userId,
    }
  }
})

const app = express();

app.use(session({
  secret: 'a;ldf;alskdf',
  resave: false,
  saveUninitialized: true,
  store
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', sessionRoutes)
app.use('/', express.static(path.join(__dirname, '..', 'public')))

app.use('/api', routes);

db.sync();

app.listen(port, () => console.log(`listening on port ${port}`));

module.exports = app
