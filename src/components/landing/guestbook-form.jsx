import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { supabase } from '../../lib/supabase.js';

const REGIONS = [
  '서울', '부산', '대구', '인천', '광주', '대전', '울산', '세종',
  '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주',
];

const AGE_GROUPS = ['10대', '20대', '30대', '40대', '50대', '60대 이상'];

const EMOJIS = ['😀', '😎', '🎉', '😍', '🤔', '👍'];

const INITIAL_FORM = {
  name: '',
  message: '',
  email: '',
  phone: '',
  region: '',
  age_group: '',
  emoji: '',
};

/**
 * GuestbookForm 컴포넌트
 *
 * 방명록 작성 폼. 이름/메시지는 필수, 나머지는 선택 입력이다.
 * 제출 성공 시 onSubmitted 콜백을 호출해 상위에서 목록을 새로고침할 수 있게 한다.
 *
 * Props:
 * @param {function} onSubmitted - 방명록 등록 성공 시 호출되는 콜백 [Optional]
 *
 * Example usage:
 * <GuestbookForm onSubmitted={refetchList} />
 */
function GuestbookForm({ onSubmitted }) {
  const [form, setForm] = React.useState(INITIAL_FORM);
  const [status, setStatus] = React.useState('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [fieldErrors, setFieldErrors] = React.useState({ name: '', message: '' });

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleEmojiSelect = (emoji) => () => {
    setForm((prev) => ({ ...prev, emoji: prev.emoji === emoji ? '' : emoji }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextFieldErrors = {
      name: form.name.trim() ? '' : '이름을 입력해주세요.',
      message: form.message.trim() ? '' : '메시지를 입력해주세요.',
    };
    if (nextFieldErrors.name || nextFieldErrors.message) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const { error } = await supabase.from('guestbook').insert({
      name: form.name.trim(),
      message: form.message.trim(),
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      region: form.region || null,
      age_group: form.age_group || null,
      emoji: form.emoji || null,
    });

    if (error) {
      setStatus('error');
      setErrorMessage('등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    setStatus('success');
    setForm(INITIAL_FORM);
    onSubmitted?.();
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 480,
        '& .MuiFormHelperText-root.Mui-error': {
          color: 'accent.main',
          fontSize: '0.8rem',
          mt: 0.5,
        },
        '& .MuiInput-underline.Mui-error:after': {
          borderBottomColor: 'accent.main',
        },
      }}
    >
      <TextField
        label="이름"
        required
        value={form.name}
        onChange={handleChange('name')}
        variant="standard"
        fullWidth
        error={Boolean(fieldErrors.name)}
        helperText={fieldErrors.name}
      />
      <TextField
        label="메시지"
        required
        value={form.message}
        onChange={handleChange('message')}
        variant="standard"
        fullWidth
        multiline
        minRows={2}
        error={Boolean(fieldErrors.message)}
        helperText={fieldErrors.message}
      />
      <TextField
        label="이메일 (선택, 비공개)"
        type="email"
        value={form.email}
        onChange={handleChange('email')}
        variant="standard"
        fullWidth
      />
      <TextField
        label="전화번호 (선택, 비공개)"
        value={form.phone}
        onChange={handleChange('phone')}
        variant="standard"
        fullWidth
      />
      <Box sx={{ display: 'flex', gap: 3 }}>
        <TextField
          select
          label="지역 (선택)"
          value={form.region}
          onChange={handleChange('region')}
          variant="standard"
          fullWidth
        >
          {REGIONS.map((region) => (
            <MenuItem key={region} value={region}>
              {region}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="나이대 (선택)"
          value={form.age_group}
          onChange={handleChange('age_group')}
          variant="standard"
          fullWidth
        >
          {AGE_GROUPS.map((ageGroup) => (
            <MenuItem key={ageGroup} value={ageGroup}>
              {ageGroup}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box>
        <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', mb: 1 }}>
          이모지 (선택)
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {EMOJIS.map((emoji) => (
            <Box
              key={emoji}
              component="button"
              type="button"
              onClick={handleEmojiSelect(emoji)}
              sx={{
                width: 40,
                height: 40,
                fontSize: '1.1rem',
                lineHeight: 1,
                border: '1px solid',
                borderColor: form.emoji === emoji ? 'accent.main' : 'divider',
                backgroundColor: 'transparent',
                color: 'text.primary',
                cursor: 'pointer',
                borderRadius: 1,
                transition: 'border-color 0.2s ease',
              }}
            >
              {emoji}
            </Box>
          ))}
        </Box>
      </Box>
      <Button
        type="submit"
        variant="outlined"
        disabled={status === 'submitting'}
        sx={{
          alignSelf: 'flex-start',
          mt: 1,
          borderColor: 'text.primary',
          color: 'text.primary',
          fontWeight: 700,
          letterSpacing: '0.05em',
          '&:hover': {
            borderColor: 'accent.main',
            color: 'accent.main',
            backgroundColor: 'transparent',
          },
        }}
      >
        {status === 'submitting' ? '등록 중...' : 'SUBMIT'}
      </Button>
      {status === 'success' && (
        <Typography sx={{ fontSize: '0.85rem', color: 'accent.main' }}>
          방명록이 등록되었습니다. 감사합니다!
        </Typography>
      )}
      {status === 'error' && (
        <Typography sx={{ fontSize: '0.85rem', color: 'accent.main' }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}

export default GuestbookForm;
