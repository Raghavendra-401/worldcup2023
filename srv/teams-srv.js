
const cds = require('@sap/cds');


module.exports = cds.service.impl(async function () {
    const { players } = cds.entities;

    this.on("READ", "Players", async (req, res) => {
        let data = await cds.run(req.query);
        data.forEach(element => {
            element.Role = element.Role == 'Wicket Keeper' ? element.Role + '👍' : element.Role;
        });
        return data;
    });
});