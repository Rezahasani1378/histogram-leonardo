const express = require("express");
const app = express();
const { promises: fs } = require("fs");
const PORT = process.env.PORT || 3001;

const villageService = new (class {
  constructor() {
    this.FILE_NAME = "db.json";
  }

  _createDB() {
    return fs.writeFile(this.FILE_NAME, "{}");
  }

  async getVillages() {
    let data;

    try {
      data = await fs.readFile(this.FILE_NAME);
    } catch (e) {
      await this._createDB();
      data = {};
    }

    return JSON.parse(data.toString());
  }

  async setVillage(villageName, villageData) {
    const data = await this.getVillages();

    data[villageName] = villageData;

    await fs.writeFile(this.FILE_NAME, JSON.stringify(data));
  }
})();

app.use(express.json());
app.use(express.static("./build"));

app.get("/villages", async (req, res) => {
  const villages = await villageService.getVillages();

  res.json(villages);
});

app.post("/villages", async (req, res) => {
  try {
    const { name, data } = req.body;

    await villageService.setVillage(name, data);

    res.status(201).end();
  } catch (e) {
    res.status(400).end();
  }
});

app.listen(PORT, () => console.log(`running on port ${PORT}`));
