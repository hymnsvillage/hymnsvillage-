'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { supabase } from '@/supabase/client'

// ✅ Define the Hymn type
type Hymn = {
  id: number
  title: string
  category: string
  author?: string
  lyrics?: string
  date?: string
  image?: string
  audioUrl?: string
  lyricsUrl?: string
}

export default function ManageHymns() {
  const [hymns, setHymns] = useState<Hymn[]>([])
  const router = useRouter()

 useEffect(() => {
  const fetchHymns = async () => {
    const { data, error } = await supabase.from('hymns').select('*')
    console.log('Fetched hymns:', data)
    console.log('Supabase error:', error)
    setHymns(data || [])
  }

  fetchHymns()
}, [])


  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('hymns').delete().eq('id', id)
    if (error) {
      console.error('Error deleting hymn:', error)
      return
    }
    setHymns((prev) => prev.filter((h) => h.id !== id))
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Manage Hymns</h2>
        <Button onClick={() => router.push('/dashboard/manage-hymns/create')}>
          <Plus className="mr-2 w-4 h-4" />
          Create Hymn
        </Button>
      </div>

      {/* Hymn List */}
      <div className="bg-white rounded-lg shadow-sm divide-y">
        {hymns.length === 0 ? (
          <p className="p-4 text-gray-500">No hymns found.</p>
        ) : (
          hymns.map((hymn) => (
            <div key={hymn.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{hymn.title}</p>
                <p className="text-sm text-gray-500 capitalize">{hymn.category}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/manage-hymns/edit/${hymn.id}`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(hymn.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
