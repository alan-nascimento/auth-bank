const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./database.json');
let userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const PORT = 8000;
const EXPIRES_IN = '12h';
const SECRET_KEY = '123456789';

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      user => user.email === email && user.password === password
    ) !== -1
  );
}

server.post('/auth/register', (req, res) => {
  console.log(req.body);

  const { email, password, name } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = 'This email is already in use';

    return res.status(status).json({ status, message });
  }

  fs.readFile('./users.json', (err, file) => {
    if (err) {
      const status = 401;
      const message = err;

      return res.status(status).json({ status, message });
    }

    let data = JSON.parse(file.toString());

    let last_item_id =
      data.users.length > 0 ? data.users[data.users.length - 1].id : 0;

    data.users.push({ id: last_item_id + 1, email, password, name });

    userdb = data;
  });

  const access_token = createToken({ email, password });
  console.log('Access Token:' + access_token);
  res.status(200).json({ access_token });
});

server.post('/auth/login', (req, res) => {
  console.log(`Login endpoint called, request body: ${req.body}`);

  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = 'Wrong email ou password!';

    return res.status(status).json({ status, message });
  }

  const access_token = createToken({ email, password });

  const user = {
    ...userdb.users.find(
      user => user.email === email && user.password === password
    )
  };

  delete user.password;

  console.log(`Access Token: ${access_token}`);
  console.log(`User: ${user}`);

  res.status(200).json({ access_token, user });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  const isInvalidToken =
    !req.headers.authorization ||
    req.headers.authorization.split(' ')[0] !== 'Bearer';

  if (isInvalidToken) {
    const status = 401;
    const message = 'Invalid token';

    return res.status(status).json({ status, message });
  }

  try {
    const verifyTokenResult = verifyToken(
      req.headers.authorization.split(' ')[1]
    );

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = 'Authentication token not found';

      return res.status(status).json({ status, message });
    }

    next();
  } catch (err) {
    const status = 401;
    const message = 'Revoked token';

    return res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
