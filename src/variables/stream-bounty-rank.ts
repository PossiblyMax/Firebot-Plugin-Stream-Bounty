import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { StreamBountyBingoRegisteredPayload } from "../stream-bounty-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    BINGO_REGISTERED_EVENT_ID,
} from "../constants";

export const StreamBountyRankVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}Rank`,
        description: "The rank (first = 1, second = 2, etc.) of the player who just got BINGO!",
        possibleDataOutput: [ "number" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${BINGO_REGISTERED_EVENT_ID}`,
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as StreamBountyBingoRegisteredPayload)?.rank;
    }
};