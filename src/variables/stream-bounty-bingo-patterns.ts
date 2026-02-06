import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { StreamBountyGameStartedPayload } from "../stream-bounty-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    GAME_STARTED_EVENT_ID,
} from "../constants";

export const StreamBountyBingoPatternsVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}BingoPatterns`,
        description: "The array of bingo patterns for the bingo game that has just started.",
        possibleDataOutput: [ "array" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${GAME_STARTED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as StreamBountyGameStartedPayload)?.bingoPatterns ?? [];
    }
};