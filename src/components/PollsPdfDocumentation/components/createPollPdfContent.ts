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

import { Content } from 'pdfmake/interfaces';
import { SelectPollResults } from '../../../store';
import { createPollPdfContentHeader } from './createPollPdfContentHeader';
import { createPollPdfContentTable } from './createPollPdfContentTable';
import { createPollSpecifics } from './createPollSpecifics';
import { Context } from './types';

export function createPollPdfContent(opts: {
  pollResults: SelectPollResults[];
  context: Context;
}): Content {
  const { pollResults, context } = opts;

  return [
    pollResults.map((pollResult, i) => {
      return {
        stack: [
          createPollPdfContentHeader(i, pollResult, context),
          createPollSpecifics(pollResult, context),
          createPollPdfContentTable(pollResult, context),
        ],
        marginTop: 20,
        pageBreak: i < pollResults.length - 1 ? 'after' : undefined,
      };
    }),
  ];
}
