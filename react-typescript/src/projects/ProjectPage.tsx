import React, { useEffect, useState } from 'react'
import { projectAPI } from './projectAPI'
import ProjectDetail from './ProjectDetail'
import { Project } from './Project'
import { Link, useParams } from 'react-router-dom'

function ProjectPage() {

    const [loading , setLoading] = useState(false);
    const [project , setProject] = useState<Project | null>(null);
    const [error , setError] = useState<string | null>(null);
    const params = useParams();
    const id = Number(params.id);

    useEffect(() => {
        setLoading(true)
        projectAPI
        .find(id)
        .then((data) => {
            setProject(data);
            setLoading(false)   
        })
        .catch((error) => {
            setError(error)
            setLoading(false)
        })
    } , [id])


  return (
    <div>
        <>

            <Link to={"/projects"} className='button'>
                Go Back
            </Link>

            <h1>Project Detail</h1>

            {loading && (
                <div className='center-page'>
                    <span className='spinner primary'></span>
                    <p>LOading...</p>
                </div>
            )}

            {error && (
                <div className='row'>
                    <div className='card large error'>
                        <section>
                            <p>
                                <span className='icon-alert inverse'></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}

            {project && <ProjectDetail project={project} />}

            
        </>
    </div>
  )
}

export default ProjectPage