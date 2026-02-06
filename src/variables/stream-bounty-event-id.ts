import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { StreamBountyEventCalledPayload } from "../stream-bounty-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    EVENT_CALLED_EVENT_ID,
} from "../constants";

export const StreamBountyEventIdVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}EventId`,
        description: "The internal event ID of the event that has just been called in game.",
        possibleDataOutput: [ "number" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${EVENT_CALLED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as StreamBountyEventCalledPayload)?.eventId ?? 0;
    }
};