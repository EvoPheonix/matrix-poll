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

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { unstable_useId as useId } from '@mui/utils';
import { t } from 'i18next';
import { ChangeEvent, Dispatch, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPollAnswer } from '../../model';

enum AnswerType {
  YesNoAbstain = 'YesNoAbstain',
  YesNo = 'YesNo',
  Custom = 'Custom',
}

const customAnswers: Array<IPollAnswer> = Array<IPollAnswer>();
const custom: string = 'test';

export function createAnswer(
  type: AnswerType = AnswerType.YesNoAbstain,
): IPollAnswer[] {
  switch (type) {
    case AnswerType.YesNo:
      return [
        {
          id: 'YesNo',
          label: t('pollForm.answer.yes', 'Yes'),
        },
        {
          id: '2',
          label: t('pollForm.answer.no', 'No'),
        },
      ];
    case AnswerType.Custom:
      return customAnswers;
    default:
      return [
        {
          id: 'YesNoAbstain',
          label: t('pollForm.answer.yes', 'Yes'),
        },
        {
          id: '2',
          label: t('pollForm.answer.no', 'No'),
        },
        {
          id: '3',
          label: t('pollForm.answer.abstain', 'Abstain'),
        },
      ];
  }
}

export type AnswerTypeFieldProps = {
  value: IPollAnswer[];
  onChange: Dispatch<IPollAnswer[]>;
};

export function AnswerTypeField({ value, onChange }: AnswerTypeFieldProps) {
  const { t } = useTranslation();
  const labelId = useId();
  let answerType = AnswerType.YesNoAbstain;
  switch (value[0]?.id) {
    case 'YesNoAbstain':
      answerType = AnswerType.YesNoAbstain;
      break;
    case 'YesNo':
      answerType = AnswerType.YesNo;
      break;
    default:
      answerType = AnswerType.Custom;
  }

  const [Custom, setCustom] = useState(custom ?? 'test');
  const [isDirty, setIsDirty] = useState(false);
  const formTitleId = useId();
  const customId = useId();
  const CustomError = Custom.length === 0;

  const handleChangeCustom = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    setCustom(e.target.value);
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const type = event.target.value as AnswerType;
      onChange(createAnswer(type));
    },
    [onChange],
  );

  const addOption = useCallback(() => {
    customAnswers.push({
      id: customAnswers?.length.toString() ?? 'Custom',
      label: Custom,
    });
  }, [Custom]);

  useEffect(() => {
    if (value.length === 0) {
      onChange(createAnswer(answerType));
    }
  }, [answerType, onChange, value]);

  return (
    <FormControl margin="dense">
      <FormLabel id={labelId}>
        {t('pollForm.answerTypes', 'Answer type')}
      </FormLabel>

      <RadioGroup
        aria-labelledby={labelId}
        name="answertypes"
        onChange={handleChange}
        value={answerType}
      >
        <FormControlLabel
          control={<Radio />}
          label={t('pollForm.answerType.yesNoAbstain', 'Yes | No | Abstain')}
          value={AnswerType.YesNoAbstain}
        />
        <FormControlLabel
          control={<Radio />}
          label={t('pollForm.answerType.yesNo', 'Yes | No')}
          value={AnswerType.YesNo}
        />
        <FormControlLabel
          control={<Radio />}
          label={t('pollForm.answerType.custom', 'Custom')}
          value={AnswerType.Custom}
        />
      </RadioGroup>
      {answerType === AnswerType.Custom && (
        <Box
          aria-labelledby={formTitleId}
          component="form"
          display="flex"
          flexWrap="wrap"
          p={1}
        >
          <TextField
            InputProps={{ required: true }}
            fullWidth
            helperText={
              isDirty &&
              CustomError &&
              t('pollForm.titleHelperText', 'A title is required')
            }
            id={customId}
            label={t('pollForm.Custom', 'Custom Answer (required)')}
            margin="dense"
            onChange={handleChangeCustom}
            value={Custom}
          />
          <Button fullWidth onClick={addOption} variant="contained">
            Add
          </Button>
        </Box>
      )}
    </FormControl>
  );
}
