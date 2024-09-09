import React, { useEffect, useState } from 'react'
import { MOCK_PROJECTS } from './MockProjects'
import ProjectList from './ProjectList'
import { Project } from './Project'
import { projectAPI } from './projectAPI'


function ProjectsPage() {

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading , setLoading] = useState(false);
  const [error ,setError] = useState<string | undefined>(undefined);

  // ทำ pagination
  const [currentPage , setCurrentPage] = useState(1)

  const handleMoreCLick = () => {
    setCurrentPage((currentPage) => currentPage + 1)
  }


  // fetch api
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);

        
        if (currentPage === 1) {
          setProjects(data)
        } else { // ถ้าไม่เท่ากับ 1 จะให้ส่งข้อมูลทั้งหมดทั้งตัวเก่า และ ตัวใหม่
          setProjects((projects) => [...projects , ...data])
        }
        
      } catch (error) {
        if (error instanceof Error) { // เช็ค error ว่าตรงกับ error มั้ย
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
    loadProjects()
  } , [currentPage])

  const saveProject = (project: Project) => {
    // let updatedProjects = projects.map((p: Project) => {
    //   return p.id === project.id ? project : p // ถ้า save ก็เอาเป็นค่าใหม่ซึ่งคือตัว ที่ 2 ชื่อ project ถ้าไม่ได้เซฟ ก็เป็นค่าเดิมคือตัว p
    // })
    // setProjects(updatedProjects)

    projectAPI
      .put(project)
      .then((updateProject) => {
        let updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updateProject) : p
        })
        setProjects(updatedProjects);
      })
      .catch((error) => {
        if (error instanceof Error) {
          setError(error.message)
        }
      })
  }

  return (
    <>
        <h1>From Projects Page</h1>

        {error && (
          <div className='row'>
            <div className="card large error">
              <section>
                <p>
                  <span className='icon-alert inverse'></span>
                  {error}
                </p>
              </section>
            </div>
          </div>
        )}


        <ProjectList onSave={saveProject} projects={projects} />

        {!loading && !error && (
          <div className='row'>
            <div className='col-sm-12'>
              <div className="button-group fluid">
                <button className='button default' onClick={handleMoreCLick}>
                  More...
                </button>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className='center-page'>
            <span className='spiner primary'></span>
            <p>Loading...</p>
          </div>
        )}
    </>
  )
}

export default ProjectsPage