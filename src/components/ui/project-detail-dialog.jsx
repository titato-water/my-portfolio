import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

/** 이 폭(px) 이하에서는 전체 화면으로 연다. */
const MOBILE_QUERY = '(max-width:767px)';

/** 구역 제목 스타일 */
const sectionTitleSx = {
  color: 'accent.text',
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  mb: 1.5,
};

/**
 * ProjectDetailDialog 컴포넌트
 *
 * 프로젝트를 눌렀을 때 열리는 상세 창. 두 가지를 구분해서 보여준다.
 * - 사용된 기술 스택: 프로젝트에 쓰인 기술을 분류(프론트엔드, 백엔드 등)별 칩으로 표시
 * - 내가 활용한 스킬: 내가 직접 구현하거나 다룬 것(팀 프로젝트는 담당한 부분만)
 * 모바일에서는 전체 화면, 그 외에는 가운데 창으로 열린다. (포커스 이동, Esc, 바깥 클릭 닫기는 MUI Dialog가 처리)
 *
 * Props:
 * @param {object|null} project - 표시할 프로젝트 (DB 컬럼명 그대로: title, description, role, period, tech_groups, skills_used, detail_url, github_url, is_personal). null이면 닫힌 상태 [Required]
 * @param {function} onClose - 창을 닫을 때 호출 [Required]
 *
 * Example usage:
 * <ProjectDetailDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
 */
function ProjectDetailDialog({ project, onClose }) {
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const titleId = 'project-detail-title';

  /* 닫히는 애니메이션 동안에도 내용이 유지되도록 마지막으로 열었던 프로젝트를 기억한다. */
  const [lastProject, setLastProject] = React.useState(project);
  if (project && project !== lastProject) setLastProject(project);
  const shown = project ?? lastProject;

  if (!shown) return null;

  const techGroups = shown.tech_groups ?? [];
  const skillsUsed = shown.skills_used ?? [];

  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="sm"
      aria-labelledby={titleId}
      slotProps={{
        paper: {
          sx: { backgroundColor: 'background.default', backgroundImage: 'none', borderRadius: isMobile ? 0 : 2 },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
          px: { xs: 2.5, md: 4 },
          pt: { xs: 2.5, md: 3.5 },
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="overline" component="p" sx={{ color: 'accent.text', lineHeight: 1.6 }}>
            {shown.is_personal ? 'Personal' : 'Team'}
          </Typography>
          <Typography
            id={titleId}
            component="h2"
            sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 800, lineHeight: 1.2, color: 'text.primary' }}
          >
            {shown.title}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          aria-label="닫기"
          sx={{ width: 44, height: 44, mt: -0.5, mr: -1, color: 'text.secondary' }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <DialogContent sx={(theme) => ({ colorScheme: theme.palette.mode, px: { xs: 2.5, md: 4 }, pb: 2 })}>
        {shown.description && (
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1, wordBreak: 'keep-all' }}>
            {shown.description}
          </Typography>
        )}
        {(shown.role || shown.period) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, rowGap: 0.5, mb: 3 }}>
            {shown.role && (
              <Typography sx={{ fontSize: '0.95rem', fontWeight: 600, color: 'text.primary' }}>{shown.role}</Typography>
            )}
            {shown.period && (
              <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{shown.period}</Typography>
            )}
          </Box>
        )}

        {techGroups.length > 0 && (
          <Box component="section" aria-label="사용된 기술 스택" sx={{ mb: 4 }}>
            <Typography component="h3" sx={sectionTitleSx}>
              사용된 기술 스택
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {techGroups.map((group) => (
                <Box key={group.label}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.secondary', mb: 0.75 }}>
                    {group.label}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {group.items.map((item) => (
                      <Chip key={item} label={item} variant="outlined" sx={{ fontWeight: 600 }} />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {skillsUsed.length > 0 && (
          <Box component="section" aria-label="내가 활용한 스킬">
            <Typography component="h3" sx={sectionTitleSx}>
              내가 활용한 스킬
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {skillsUsed.map((skill) => (
                <Box
                  key={skill}
                  component="li"
                  sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.25, color: 'text.primary' }}
                >
                  <CheckRoundedIcon aria-hidden="true" sx={{ fontSize: 20, mt: '2px', color: 'accent.text', flexShrink: 0 }} />
                  <Typography sx={{ lineHeight: 1.6, wordBreak: 'keep-all' }}>{skill}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: { xs: 2.5, md: 4 }, pb: { xs: 2.5, md: 3 }, pt: 1, gap: 1, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {shown.detail_url && (
          <Button
            variant="contained"
            href={shown.detail_url}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewRoundedIcon />}
          >
            Live Demo
          </Button>
        )}
        {shown.github_url && (
          <Button
            variant="outlined"
            color="inherit"
            href={shown.github_url}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ProjectDetailDialog;
