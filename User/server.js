const express = require('express');
const cors = require('cors');
const app = express();


require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
require('./config/db_conn');
const port = process.env.PORT_USER || 9001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/users", require("./routes/userRouter"))



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
