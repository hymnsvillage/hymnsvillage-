// app/(dashboard)/manage-hymns/create/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { supabase } from '@/supabase/client'

export default function CreateHymnPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    lyrics: '',
    language: '',
    audio_url: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase.from('hymns').insert([form])
    if (!error) router.push('/dashboard/manage-hymns')
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Hymn</h2>
      <input
        name="title"
        placeholder="Hymn Title"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        required
      />
      <textarea
        name="lyrics"
        placeholder="Lyrics"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded h-40"
        required
      />
      <input
        name="language"
        placeholder="Language"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />
      <input
        name="audio_url"
        placeholder="Audio URL"
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />
      <Button type="submit">Save Hymn</Button>
    </form>
  )
}
