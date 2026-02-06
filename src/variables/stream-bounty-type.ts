import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { StreamBountyPayload } from "../stream-bounty-types";
import { VARIABLE_PREFIX } from "../constants";
import { getAllEvents } from "../events";

export const StreamBountyTypeVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}Type`,
        description: "The message type for the Stream Bounty message.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based", "advanced" ],
        triggers: {
            event: [
                ...getAllEvents()
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as StreamBountyPayload)?.type;
    }
};