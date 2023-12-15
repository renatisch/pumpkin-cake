import "./PageWrapper.css"
import { styled} from '@mui/material/styles';
import Container from '@mui/material/Container';
import { ReactNode } from "react";
import { Breadcrumbs, Typography, Card } from '@mui/material'
import Link from '@mui/material/Link';

const drawerWidth = 240;
type Props = {
    isOpen: boolean
    page: ReactNode
    pageTitle: string 
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    margin: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    marginTop: 50,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));


export default function PageWrapper({page,isOpen, pageTitle }: Props) {
  return (
    <Main open={isOpen}>
      <Container className='pageContainer'>
      <Container className="pageHeaderContainer" style={{ display:'flex', paddingLeft:0, paddingRight: 0}}>
          <Container className="headerContainer" style={{paddingLeft: 0, marginBottom: 2}}>
            <Typography className="pageTitle" variant="h5" fontWeight={700}>
              {pageTitle}
            </Typography>
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                {pageTitle}
              </Link>
              <Typography color="text.primary">Belts</Typography>
            </Breadcrumbs>
        </Container>
      </Container>
        <Card className="card" sx={{padding: 2}}>
          {page}
        </Card>
      </Container>
    </Main> 
  )
}