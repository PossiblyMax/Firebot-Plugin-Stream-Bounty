import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { StreamBountyPlayerPayloadData } from "../stream-bounty-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    PLAYER_JOINED_EVENT_ID,
    EXTRA_CARD_WITH_BITS_EVENT_ID,
    EXTRA_VOTE_WITH_BITS_EVENT_ID,
    BINGO_REGISTERED_EVENT_ID,
} from "../constants";

export const StreamBountyPlayerNameVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}PlayerName`,
        description: "The player name of the player that has just joined/used bits/registered bingo.",
        possibleDataOutput: [ "text" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${PLAYER_JOINED_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${EXTRA_CARD_WITH_BITS_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${EXTRA_VOTE_WITH_BITS_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${BINGO_REGISTERED_EVENT_ID}`
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as StreamBountyPlayerPayloadData)?.playerName ?? "";
    }
};