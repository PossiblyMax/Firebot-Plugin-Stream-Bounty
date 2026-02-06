# Stream Bounty Plugin for Firebot

This plugin adds support for Stream Bounty events and related variables to Firebot.

## Prerequisites
- Firebot 5.65 or higher

## Setup

1. Copy the `firebot-stream-bounty.js` file into your Firebot profile's `scripts` folder (e.g. `%appdata%\Firebot\v5\profiles\Main Profile\scripts`)
2. Go to Settings > Scripts in Firebot
3. Click on "Manage Startup Scripts"
4. Click "Add New Script"
5. Select the `firebot-stream-bounty.js` file from the dropdown list
6. Click "Add & Configure"
7. Click the "Copy URL" button under "Webhook URL", then close both the script settings and the "Startup Scripts" modals
8. In your Stream Bounty extension configuration, under Bot Integration > Real-time Integration > Webhooks, paste the copied URL into the **Webhook URL** field, click "Set URL" and then enable which events you want Stream Bounty to send under the "Message Types"

## Events

New events:
- **Stream Bounty: Game Started**
- **Stream Bounty: Player Joined**
- **Stream Bounty: Event Called**
- **Stream Bounty: Extra Card (from Bits)**
- **Stream Bounty: Vote Started**
- **Stream Bounty: Extra Vote (from Bits)**
- **Stream Bounty: Vote Ended**
- **Stream Bounty: Bingo**
- **Stream Bounty: Game Ended**
- **Stream Bounty: All Events Called**

## New Variables

Any event in the above list may have specific variables created based on the data received, as well as:
- `$streamBountyType`

For Game Started:
- `$streamBountyIsSubOnly`
- `$streamBountyRandomCallOnly`
- `$streamBountyEvents` - Array of `{ id, name, displayNumber, isCalled }`
- `$streamBountyBingoPatterns` - Array of numbers

For Player Joined:
- `$streamBountyPlayerName`
- `$streamBountyPlayerId` (Twitch User ID)

For Event Called:
- `$streamBountyDisplayNumber`
- `$streamBountyEventId`
- `$streamBountyEventName`

For Extra Card (from Bits):
- `$streamBountyPlayerName`
- `$streamBountyPlayerId` (Twitch User ID)
- `$streamBountyBits`

For Vote Started:
- No extra variables

For Extra Vote (from Bits):
- `$streamBountyPlayerName`
- `$streamBountyPlayerId` (Twitch User ID)
- `$streamBountyBits`

For Vote Ended:
- No extra variables

For Bingo:
- `$streamBountyPlayerName`
- `$streamBountyPlayerId` (Twitch User ID)
- `$streamBountyRank`

For Game Ended:
- No extra variables

For All Events Called:
- No extra variables

## Special Thanks

This repo is based on the great work by zunderscore, check out his huge list of plugins for Firebot in Github!

[zunderscore's Repos](https://github.com/zunderscore?tab=repositories)

