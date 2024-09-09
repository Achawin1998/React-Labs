import React, { SyntheticEvent, useState } from 'react'
import { Project } from './Project';

type ProjectFromProps = {
    project: Project;
    onSave: (project: Project) => void
    onCancel: () => void;
}

function ProjectForm({ project: initialProject , onSave , onCancel }: ProjectFromProps) {

    const [project, setProject] = useState(initialProject);
    const [error , setError] = useState({
        name: '',
        description: '',
        budget: ''
    })



    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        if (!isValid()) return // lab 16
        onSave(project) // นำ ค่าจาก useState มาใส่เพื่อให้มันอัปเดทค่าตลอด
    }

    const handleChange = (event: any) => {
        const {type , name , value , checked} = event.target
        let updatedValue = type === 'checkbox' ? checked : value;

        if (type === 'number') {
            updatedValue = Number(updatedValue) // ทำ string ให้กลายเป็น เลขจำนวนเต็ม
        }

        const change = {  // รับค่าจาก input รับสิ่งที่พิมพ์มา
            [name]: updatedValue,    
        }

        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({ ...p , ...change})
            return updatedProject
        })

        setError(() => validate(updatedProject)); // lab 16
    }

    const validate = (project:Project) => {
        let errors: any = { name: '' , description:'' , budget: ''}

        if (project.name.length === 0) {
            errors.name = 'Name is required'
        } else if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters'
        } else if (project.description.length === 0) {
            errors.description = 'Description is required'
        } else if (project.budget === 0) {
            errors.budget = 'Budget must be more than $0'
        }

        return errors;
    }

    const isValid = () => {
        return (
            error.name.length === 0 && 
            error.description.length === 0 && 
            error.budget.length === 0
        )
    }

    
  return (
    <form className='input-group vertical' onSubmit={handleSubmit}>
        <label htmlFor="name">Project Name</label>
        <input type="text" name='name' placeholder='Enter   name' value={project.name} onChange={handleChange} />
        {error.name.length > 0 && (
            <div className='card error'>
                <p>{error.name}</p>
            </div>
        )
        }

        <label htmlFor="description">Project Description</label>
        <textarea name="description" placeholder='Enter description' value={project.description} onChange={handleChange}></textarea>
        {error.description.length > 0 && (
            <div className='card error'>
                <p>{error.description}</p>
            </div>
        )
        }

        <label htmlFor="budget">Project Budget</label>
        <input type="number" name='budget' value={project.budget} onChange={handleChange} placeholder='Enter budget'/>
        {error.budget.length > 0 && (
            <div className='card error'>
                <p>{error.budget}</p>
            </div>
        )
        }


        <label htmlFor="isActive">Active</label>
        <input type="checkbox" name='isActive' checked={project.isActive} onChange={handleChange}/>
        <div className='input-group'>
            <button className='primary bordered medium'>Save</button>
            <button type='button' className='bordered medium' onClick={onCancel}>Cancel</button>
        </div>
    </form>
  )
}

export default ProjectForm