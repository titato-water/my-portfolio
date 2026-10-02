import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

/**
 * ProfileCard 컴포넌트
 *
 * 프로필 사진과 이름, 학력/전공/경력을 보여주는 기본 정보 카드.
 * 사진이 없으면 임시 프로필(아이콘)을 표시한다.
 *
 * Props:
 * @param {string} name - 이름 [Required]
 * @param {string} education - 학력 [Optional, 기본값: '']
 * @param {string} major - 전공 [Optional, 기본값: '']
 * @param {string} experience - 경력 [Optional, 기본값: '']
 * @param {string} photo - 프로필 사진 주소 [Optional, 기본값: '']
 * @param {string} role - 이름 아래에 표시할 직함/소개 한 줄 [Optional, 기본값: '']
 *
 * Example usage:
 * <ProfileCard name="황상빈" role="Front-end Developer" education="OO고등학교 졸업" major="무전공" experience="신입" />
 */
function ProfileCard({
  name,
  education = '',
  major = '',
  experience = '',
  photo = '',
  role = '',
}) {
  const infoItems = [
    { label: '학력', value: education },
    { label: '전공', value: major },
    { label: '경력', value: experience },
  ].filter((item) => item.value);

  return (
    <Box
      component="section"
      aria-label="기본 정보"
      sx={{
        borderTop: '4px solid',
        borderTopColor: 'accent.main',
        borderRadius: 1,
        backgroundColor: 'background.paper',
        p: { xs: 3, md: 5 },
      }}
    >
      <Grid container spacing={{ xs: 3, md: 5 }} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' } }}>
          <Avatar
            src={photo || undefined}
            alt={`${name} 프로필 사진`}
            sx={{
              width: { xs: 96, md: 160 },
              height: { xs: 96, md: 160 },
              backgroundColor: 'background.default',
              color: 'accent.main',
              border: '2px solid',
              borderColor: 'accent.main',
            }}
          >
            <PersonOutlineRoundedIcon sx={{ fontSize: { xs: 56, md: 96 } }} />
          </Avatar>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.5rem' },
              fontWeight: 800,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              color: 'text.primary',
              mb: role ? 1 : { xs: 2, md: 3 },
            }}
          >
            {name}
          </Typography>
          {role && (
            <Typography
              sx={{
                fontSize: { xs: '0.95rem', md: '1.15rem' },
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'accent.main',
                mb: { xs: 2, md: 3 },
              }}
            >
              {role}
            </Typography>
          )}
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {infoItems.map((item) => (
              <Grid key={item.label} size={{ xs: 12, sm: 6, md: item.label === '학력' ? 6 : 3 }}>
                <Typography variant="overline" sx={{ color: 'accent.main', lineHeight: 1.6 }}>
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.5,
                    color: 'text.primary',
                  }}
                >
                  {item.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfileCard;
