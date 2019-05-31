const express = require('express');
const history = require('connect-history-api-fallback');

const PORT = 8080;
const app = express();

app.use(history());
app.use(express.static('dist'));

app.listen(PORT, () => {
   console.log('Server is running on ', PORT);
});
