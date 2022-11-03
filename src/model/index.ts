/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export {
  isValidGroupEvent,
  migratePollGroupSchema,
  STATE_EVENT_POLL_GROUP,
} from './IGroup';
export type { GroupContent, IGroup, MemberContent, MemberRole } from './IGroup';
export {
  isValidPollEvent,
  migratePollSchema,
  PollType,
  ResultType,
  STATE_EVENT_POLL,
} from './IPoll';
export type { IPoll, IPollAnswer, PollGroup, VotingRight } from './IPoll';
export {
  isValidPollSettingsEvent,
  STATE_EVENT_POLL_SETTINGS,
} from './IPollSettings';
export type { IPollSettings } from './IPollSettings';
export { isValidVoteEvent, ROOM_EVENT_VOTE } from './IVote';
export type { IVote } from './IVote';
export { ROOM_EVENT_POLL_START } from './pollStartEvent';
export type { PollStartEvent } from './pollStartEvent';
export { isValidRoomNameEvent, STATE_EVENT_ROOM_NAME } from './roomNameEvent';
export type { RoomNameEvent } from './roomNameEvent';
