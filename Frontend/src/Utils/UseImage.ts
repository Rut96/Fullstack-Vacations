import axios from 'axios'
import { useEffect, useState } from 'react'
import { vacationService } from '../Services/VacationService'

export function useImage(fileName: string) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const response = await vacationService.getVacationImage(fileName)
                setImage(response.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        })();
    }, [fileName])

    return { loading, error, image, }
}