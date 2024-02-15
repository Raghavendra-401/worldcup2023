
const cds = require('@sap/cds');
const axios = require('axios');
const {
    AlertNotificationClient,
    EntityType,
    BasicAuthentication,
    RegionUtils,
    Severity,
    Category
} = require('@sap_oss/alert-notification-client');

module.exports = cds.service.impl(async function () {
    const db = await cds.connect.to('db');
    const { BattingStats, players } = db.entities;

    this.on("READ", "Players", async (req, res) => {
        let data = await cds.run(req.query);
        data.forEach(element => {
            element.Role = element.Role == 'Wicket Keeper' ? element.Role + '🧤' : element.Role + '🏏';
        });
        return data;
    });

    this.on("alertNotification", async (req, res) => {
        let data =  await db.run(SELECT.from`MY_WORLDCUP_BATTINGSTATS`.where ({Player:"Rohit Sharma"}));
        const client_ID = "3b3dfd62-9ff1-4f83-9304-f50b32f1b8fd";
        const client_Secret = "Jw7nNtIxvvrElDXRAGssz4tGLr0rZAD+";

        const client = new AlertNotificationClient({
            authentication: new BasicAuthentication({
                username: client_ID,
                password: client_Secret
            }),
            region: RegionUtils.US10
        });

        client.sendEvent({
            body: 'Hello to Alert Notification Service',
            subject: 'Alert Notification Testing',
            eventType: 'consumeInStore',
            severity: Severity.INFO,
            category: Category.NOTIFICATION,
            resource: {
                resourceName: 'test-resource',
                resourceType: 'application',
                resourceInstance: '123456',
                tags: {
                    detailsLink: 'https://example.details.com'
                }
            },
            eventTimestamp: 1602787032,
            priority: 1
        }).then(event => {
            // Wait for the event to be processed and stored, in most of the cases it will take less time than 5 seconds, but just to be on the safe side
            setTimeout(() => {
                client.getMatchedEvent(event.id)
                    .then((consumedEvent) => {
                        console.log(consumedEvent)
                        let msg = `Alert Notification successfully sent`;
                        return msg;
                    }) // Print the consumed event
                    .catch((error) => {
                        console.log(error);
                        let msg = `ALERT SEND FAILED`;
                        return msg;
                    });
            }, 5000)
        }).catch((error) => {
            console.log(error);
            return `Error Occured`
        });
    })
});