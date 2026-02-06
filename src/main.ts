import { Firebot, ScriptModules } from "@crowbartools/firebot-custom-scripts-types";
import { WebhookConfig } from "@crowbartools/firebot-custom-scripts-types/types/modules/webhook-manager";

import { StreamBountyEventSource } from "./events";
import { StreamBountyVariables } from "./variables";

import { StreamBountyMessagePayloadEventMap, StreamBountyPayload } from "./stream-bounty-types";

import {
    PLUGIN_ID,
    PLUGIN_NAME,
    EVENT_SOURCE_ID,
} from "./constants";

const packageInfo = require("../package.json");

let logger: ScriptModules["logger"];
let eventManager: ScriptModules["eventManager"];
let replaceVariableManager: ScriptModules["replaceVariableManager"];
let webhookManager: ScriptModules["webhookManager"];

const logDebug = (msg: string, ...meta: any[]) => logger.debug(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logInfo = (msg: string, ...meta: any[]) => logger.info(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logWarn = (msg: string, ...meta: any[]) => logger.warn(`[${PLUGIN_NAME}] ${msg}`, ...meta);
const logError = (msg: string, ...meta: any[]) => logger.error(`[${PLUGIN_NAME}] ${msg}`, ...meta);

const processWebhook = ({ config, payload }: { config: WebhookConfig, payload: StreamBountyPayload }) => {
    logDebug(`Got webhook for ${config.name}`);
    if (config.name !== PLUGIN_NAME) {
        logDebug(`Received unknown webhook event for ${config.name}. Ignoring.`);
        return;
    }

    logDebug(`Webhook type: ${payload.type}`);

    const eventName = StreamBountyMessagePayloadEventMap[payload.type];
    if (eventName == null) {
        logWarn(`Received unknown event type: ${payload.type}. Skipping.`);
        return;
    }
    
    logDebug(`Triggering event ${eventName}`);
    eventManager.triggerEvent(EVENT_SOURCE_ID, eventName, payload);
};

const script: Firebot.CustomScript<{
    copyWebhookUrl: void;
}> = {
    getScriptManifest: () => ({
        name: PLUGIN_NAME,
        description: packageInfo.description,
        author: packageInfo.author,
        version: packageInfo.version,
        firebotVersion: "5",
        startupOnly: true,
        initBeforeShowingParams: true
    }),
    getDefaultParameters: () => ({
        copyWebhookUrl: {
            type: "button",
            title: "Webhook URL",
            description: "Copy this URL then go to your Stream Bounty extension configuration in Twitch. Under Bot Integration > Real-time Integration > Webhooks, paste the copied URL into the **Webhook URL** field, click \"Set URL\" and then enable which events you want Stream Bounty to send under the \"Message Types\".",
            backendEventName: `${PLUGIN_ID}:copy-webhook-url`,
            buttonText: "Copy URL",
            icon: "fa-copy",
            sync: true
        }
    }),
    run: ({ modules }) => {
        ({ logger, eventManager, replaceVariableManager, webhookManager } = modules);

        logInfo(`Starting ${PLUGIN_NAME} plugin...`);

        if (webhookManager == null) {
            logError(`Cannot start ${PLUGIN_NAME} plugin. You must be on Firebot 5.65 or higher.`);
            return;
        }

        logDebug("Registering events...");
        eventManager.registerEventSource(StreamBountyEventSource);

        logDebug("Registering variables...");
        for (const variable of StreamBountyVariables) {
            replaceVariableManager.registerReplaceVariable(variable);
        }

        logDebug("Registering frontend listener");
        const frontendCommunicator = modules.frontendCommunicator;
        frontendCommunicator.on(`${PLUGIN_ID}:copy-webhook-url`, () => {
            frontendCommunicator.send("copy-to-clipboard", { 
                text: webhookManager.getWebhookUrl(PLUGIN_NAME),
            });
        });

        logDebug("Registering webhook listener...");
        webhookManager.on("webhook-received", processWebhook);

        logDebug("Checking for webhook...");
        let webhook = webhookManager.getWebhook(PLUGIN_NAME);

        if (webhook == null) {
            logDebug("Webhook not found. Registering...");

            webhook = webhookManager.saveWebhook(PLUGIN_NAME);
        }

        if (webhook == null) {
            logError("Something went wrong while registering webhook. Exiting.");
            return;
        }

        logDebug("Webhook registered");
        logInfo("Plugin ready. Listening for events.");
    },
    stop: (uninstalling: boolean) => {
        logDebug(`Stopping ${PLUGIN_NAME} plugin`);

        logDebug("Stopping webhook listener");
        webhookManager.removeListener("webhook-received", processWebhook);

        if (uninstalling === true) {
            logDebug("Removing webhook...");

            webhookManager.deleteWebhook(PLUGIN_NAME);

            logInfo("Plugin uninstalled");
        } else {
            logInfo("Plugin stopped");
        }
    }
}

export default script;