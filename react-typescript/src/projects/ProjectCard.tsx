import React from 'react'
import { Project } from './Project'
import { Link } from 'react-router-dom';

const formatDescription = (description: string):string => { // กำหนดให้โชว์แค่ 60 ตัวอักษร
    return description.substring(0 , 60) + "...";
}

type ProjectCardProps = {
    project: Project
    onEdit: (project: Project) => void
}


function ProjectCard(props: ProjectCardProps) {

    const {project , onEdit} = props;

    const handleEditClick = (projectBeingEdited: Project) => {
         onEdit(projectBeingEdited);
    }

  return (
    <div className='card'>
        <img src={project.imageUrl} alt={project.name} />
        <section className='section dark'>
                <Link to={"/projects/" + project.id}>
                    <h5 className='strong'>
                        <strong>
                            {project.name}
                        </strong>
                    </h5>
                </Link>
                    <p>{formatDescription(project.description)}</p>
                    <p>Budget: {project.budget.toLocaleString()}</p>
           
                <button onClick={() => handleEditClick(project)} className='bordered'>
                    <span className='icon-edit'></span>
                    Edit
                </button>
        </section>
    </div>
  )
}

export default ProjectCard