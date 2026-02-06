import {
    ALL_EVENTS_CALLED_EVENT_ID,
    GAME_ENDED_EVENT_ID,
    GAME_STARTED_EVENT_ID,
    PLAYER_JOINED_EVENT_ID,
    VOTE_STARTED_EVENT_ID,
    EXTRA_CARD_WITH_BITS_EVENT_ID,
    EVENT_CALLED_EVENT_ID,
    BINGO_REGISTERED_EVENT_ID,
    EXTRA_VOTE_WITH_BITS_EVENT_ID,
    VOTE_ENDED_EVENT_ID
} from "./constants";

export const StreamBountyMessagePayloadEventMap = {
    "GAME_STARTED": GAME_STARTED_EVENT_ID,
    "EVENT_CALLED": EVENT_CALLED_EVENT_ID,
    "PLAYER_JOINED": PLAYER_JOINED_EVENT_ID,
    "BINGO_REGISTERED": BINGO_REGISTERED_EVENT_ID,
    "EXTRA_CARD_WITH_BITS": EXTRA_CARD_WITH_BITS_EVENT_ID,
    "VOTE_STARTED": VOTE_STARTED_EVENT_ID,
    "EXTRA_VOTE_WITH_BITS": EXTRA_VOTE_WITH_BITS_EVENT_ID,
    "VOTE_ENDED": VOTE_ENDED_EVENT_ID,
    "GAME_ENDED": GAME_ENDED_EVENT_ID,
    "ALL_EVENTS_CALLED": ALL_EVENTS_CALLED_EVENT_ID,
}

type StreamBountyGameStartedEvent = {
    id: string;
    name: string;
    displayNumber: number;
    isCalled: boolean;
}

export type StreamBountyPlayerPayloadData = {
    playerId: string;
    playerName: string;
}

export type StreamBountyGameStartedPayload = {
    type: "GAME_STARTED";
    events: StreamBountyGameStartedEvent[];
    isSubOnly: boolean;
    randomCallOnly: boolean;
    bingoPatterns: number[];
}

export type StreamBountyBitsPayloadData = {
    bits: number;
}

export type StreamBountyEventCalledPayload = {
    type: "EVENT_CALLED";
    displayNumber: number;
    eventId: string;
    eventName: string;
}

export type StreamBountyPlayerJoinedPayload = StreamBountyPlayerPayloadData & {
    type: "PLAYER_JOINED";
}

export type StreamBountyBingoRegisteredPayload = StreamBountyPlayerPayloadData & {
    type: "BINGO_REGISTERED";
    rank: number;
}

export type StreamBountyExtraCardWithBitsPayload = StreamBountyPlayerPayloadData & StreamBountyBitsPayloadData & {
    type: "EXTRA_CARD_WITH_BITS";
}

export type StreamBountyVoteStartedPayload = {
    type: "VOTE_STARTED";
}

export type StreamBountyExtraVoteWithBitsPayload = StreamBountyPlayerPayloadData & StreamBountyBitsPayloadData & {
    type: "EXTRA_VOTE_WITH_BITS";
}

export type StreamBountyVoteEndedPayload = {
    type: "VOTE_ENDED";
}

export type StreamBountyGameEndedPayload = {
    type: "GAME_ENDED";
}

export type StreamBountyAllEventsCalledPayload = {
    type: "ALL_EVENTS_CALLED";
}

export type StreamBountyPayload =
    | StreamBountyGameStartedPayload
    | StreamBountyEventCalledPayload
    | StreamBountyPlayerJoinedPayload
    | StreamBountyBingoRegisteredPayload
    | StreamBountyExtraCardWithBitsPayload
    | StreamBountyVoteStartedPayload
    | StreamBountyExtraVoteWithBitsPayload
    | StreamBountyVoteEndedPayload
    | StreamBountyGameEndedPayload
    | StreamBountyAllEventsCalledPayload;
