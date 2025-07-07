'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import React, { use } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>()
    // the name project should match in the approuter
    const createProject = api.project.createProject.useMutation()
    const refetch = useRefetch()

    function onSubmit(data: FormInput) {
        // window.alert(JSON.stringify(data, null, 2))
        createProject.mutate({
            name: data.projectName,
            githubUrl: data.repoUrl,
            githubToken: data.githubToken
        }, {
            onSuccess: () => {
                toast.success('Project created successfully')
                refetch()
                reset()
            },
            onError: (error) => {
                toast.error('Failed to create project')
            }
        })
        return true
    }

    return (
    <div className='flex items-center gap-12 h-full justify-center'>
        <img src='/logo.png' className='h-56 w-auto'></img>
        <div>
            <div>
                <h1 className='font-semibold text-2xl'>Link your GitHub Repository</h1>
                <p className='text-sm text-muted-foreground'>Link your repository to Talk2Repo</p>
            </div>
            <div className='h-4'></div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        {...register('projectName', { required: true })}
                        placeholder='Enter your project name' 
                    />
                    <div className='h-2'></div>
                    <Input
                        {...register('repoUrl', { required: true })}
                        placeholder='Enter your repository URL'
                        type='url'
                        required 
                    />
                    <div className='h-2'></div>
                    <Input
                        {...register('githubToken')}
                        placeholder='GitHub token if it is a private repository' 
                    />
                    <div className='h-4'></div>
                    <Button type='submit' disabled={createProject.isPending}>Create Project</Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreatePage