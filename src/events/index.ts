import { EventSource } from "@crowbartools/firebot-custom-scripts-types/types/modules/event-manager";
import {
    PLUGIN_NAME,
    EVENT_SOURCE_ID,
    GAME_STARTED_EVENT_ID,
    EVENT_CALLED_EVENT_ID,
    PLAYER_JOINED_EVENT_ID,
    BINGO_REGISTERED_EVENT_ID,
    EXTRA_CARD_WITH_BITS_EVENT_ID,
    VOTE_STARTED_EVENT_ID,
    EXTRA_VOTE_WITH_BITS_EVENT_ID,
    VOTE_ENDED_EVENT_ID,
    GAME_ENDED_EVENT_ID,
    ALL_EVENTS_CALLED_EVENT_ID
} from "../constants";

export const StreamBountyEventSource: EventSource = {
    id: EVENT_SOURCE_ID,
    name: PLUGIN_NAME,
    events: [
        {
            id: GAME_STARTED_EVENT_ID,
            name: `${PLUGIN_NAME}: Game Started`,
            description: "When a new game starts on Stream Bounty"
        },
        {
            id: EVENT_CALLED_EVENT_ID,
            name: `${PLUGIN_NAME}: Event Called`,
            description: "When an event is called in Stream Bounty"
        },
        {
            id: PLAYER_JOINED_EVENT_ID,
            name: `${PLUGIN_NAME}: Player Joined`,
            description: "When a player joins a game in Stream Bounty"
        },
        {
            id: BINGO_REGISTERED_EVENT_ID,
            name: `${PLUGIN_NAME}: Bingo`,
            description: "When a player registers a bingo in Stream Bounty"
        },
        {
            id: EXTRA_CARD_WITH_BITS_EVENT_ID,
            name: `${PLUGIN_NAME}: Extra Card (from Bits)`,
            description: "When a player grabs an extra card with bits in Stream Bounty"
        },
        {
            id: VOTE_STARTED_EVENT_ID,
            name: `${PLUGIN_NAME}: Vote Started`,
            description: "When an auto-call voting round is started in Stream Bounty"
        },
        {
            id: EXTRA_VOTE_WITH_BITS_EVENT_ID,
            name: `${PLUGIN_NAME}: Extra Vote (from Bits)`,
            description: "When a player uses bits for an extra vote in Stream Bounty"
        },
        {
            id: VOTE_ENDED_EVENT_ID,
            name: `${PLUGIN_NAME}: Vote Ended`,
            description: "When an auto-call voting round ends in Stream Bounty"
        },
        {
            id: GAME_ENDED_EVENT_ID,
            name: `${PLUGIN_NAME}: Game Ended`,
            description: "When the current game ends in Stream Bounty"
        },
        {
            id: ALL_EVENTS_CALLED_EVENT_ID,
            name: `${PLUGIN_NAME}: All Events Called`,
            description: "When 'Call All Events' is used in Stream Bounty"
        }
    ]
}

export function getAllEvents(): string[] {
    return StreamBountyEventSource.events.reduce((out, e) => {
        out.push(`${EVENT_SOURCE_ID}:${e.id}`);
        return out;
    }, [] as string[]);
}

export function getEventsMatchingPrefix(prefix: string): string[] {
    return StreamBountyEventSource.events.reduce((out, e) => {
        if (e.id.startsWith(prefix)) {
            out.push(`${EVENT_SOURCE_ID}:${e.id}`);
        }
        return out;
    }, [] as string[]);
}