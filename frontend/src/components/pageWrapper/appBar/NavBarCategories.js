import AcUnitIcon from '@mui/icons-material/AcUnit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import SchemaIcon from '@mui/icons-material/Schema';
import HistoryIcon from '@mui/icons-material/History';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const NavBarCategories = [
    {
      item: "Search",
      isPrimary: true,
      icons: {
        primary:<ContentPasteSearchIcon color='primary'/>,
        secondary: <ContentPasteSearchIcon/>
      },
      path: "/search"
    },
    {
        item: "Jobs",
        isPrimary: true,
        icons: {
          primary:<TaskAltIcon color='primary'/>,
          secondary: <TaskAltIcon/>
        },
        path: "/jobs"
    },
    {
      item: "Web agents",
      isPrimary: true,
      icons: {
        primary:<AcUnitIcon color='primary'/>,
        secondary: <AcUnitIcon/>
      },
      path: "/agents"
  },
    {
        item: "Loaders",
        isPrimary: true,
        icons: {
          primary:<UploadFileIcon color='primary'/>,
          secondary: <UploadFileIcon/>
        },
        path: "/loaders"
    },
    {
        item: "LLMs",
        isPrimary: true,
        icons: {
          primary:<AlignHorizontalLeftIcon color='primary'/>,
          secondary: <AlignHorizontalLeftIcon/>
        },
        path: "/llms"
    },
    {
        item: "Schemas",
        isPrimary: true,
        icons: {
          primary:<SchemaIcon color='primary'/>,
          secondary: <SchemaIcon/>
        },
        path: "/schemas"
    },
    {
        item: "History",
        isPrimary: false,
        icons: {
          primary:<HistoryIcon color='primary'/>,
          secondary: <HistoryIcon/>
        },
        path: "/history"
    },
  ]
  
export {NavBarCategories}