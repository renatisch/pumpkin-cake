import FullFeaturedCrudGrid from './Table';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';


type Job = {
  completed: boolean
  enqued_at: Date
  error: string
  is_scheduled: boolean
  job_id: string
  started_at: Date
  completed_at: Date
  type: string
}

const instance = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  headers: {'contentType': 'application/json'}
});

export default function JobsPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    instance.get("jobs/").then((response) => {
        const fetchedJobs = response.data.jobs.map((job:Job, index:number)=>{
          if (job.completed === true){
            return (
              {id: index, job_id:  job.job_id, job_type: job.type, started_at: new Date(job.started_at), is_scheduled: job.is_scheduled, completed: job.completed, job_description: job.error}
            )
          }
          return (
            {id: index, job_id:  job.job_id, job_type: job.type, started_at: new Date(job.started_at), is_scheduled: job.is_scheduled, completed: job.completed, job_description: job.error}
          )
        })
        setRows(fetchedJobs);
    }).catch((e)=>{
      console.log(e)
    });
  }, []);

  return (
    <FullFeaturedCrudGrid rows={rows} setRows={setRows}/>
  )
}

