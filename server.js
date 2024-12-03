const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const directoryRoutes = require('./routes/directoryRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/directories', directoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
