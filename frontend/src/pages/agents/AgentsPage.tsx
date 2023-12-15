import "./Agents.css"
import JobCard from "./components/JobCard";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';

const agents = [
  {
    "type":"fetch",
    "name": "Fetch data worker",
    "description": "This worker fetches data from the web and stores them in database."
  },
  {
    "type":"load",
    "name": "Split data worker",
    "description": "This worker splits your fetched data into chunks."
  },
  {
    "type":"llm",
    "name": "LLM worker",
    "description": "This worker sends your data to LLM and stores them in database."
  },
  {
    "type":"Dummy",
    "name": "Dummy worker",
    "description": "This is a dummy worker description."
  }
]


const PageGrid = ()=>{
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={5} columnSpacing={{ xs: 2, sm: 4, md: 6 }}>
        {agents.map((agent, index)=>{return (
          <Grid xs={6} key={index}>
            <JobCard name={agent.name} type={agent.type} description={agent.description}/>
          </Grid>
        )})}
      </Grid>
    </Box>
  )
}

export default function AgentsPage() {
  return (
    <PageGrid/>
  )
}