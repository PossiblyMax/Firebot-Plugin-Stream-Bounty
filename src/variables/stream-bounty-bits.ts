import { ReplaceVariable } from "@crowbartools/firebot-custom-scripts-types/types/modules/replace-variable-manager";
import { StreamBountyBitsPayloadData } from "../stream-bounty-types";
import {
    VARIABLE_PREFIX,
    EVENT_SOURCE_ID,
    EXTRA_CARD_WITH_BITS_EVENT_ID,
    EXTRA_VOTE_WITH_BITS_EVENT_ID,
} from "../constants";

export const StreamBountyBitsVariable: ReplaceVariable = {
    definition: {
        handle: `${VARIABLE_PREFIX}Bits`,
        description: "The bits value of the extra card/vote.",
        possibleDataOutput: [ "number" ],
        categories: [ "trigger based" ],
        triggers: {
            event: [
                `${EVENT_SOURCE_ID}:${EXTRA_CARD_WITH_BITS_EVENT_ID}`,
                `${EVENT_SOURCE_ID}:${EXTRA_VOTE_WITH_BITS_EVENT_ID}`,
            ],
            manual: true
        }
    },
    evaluator: async (trigger) => {
        return (trigger.metadata?.eventData as StreamBountyBitsPayloadData)?.bits;
    }
};