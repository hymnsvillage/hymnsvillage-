'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/supabase/client'
import { Button } from '@/components/ui/button'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Image from 'next/image'

export default function CreateHymnPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    author: '',
    lyrics: '',
    category: 'English',
    image: '',
    audioUrl: '',
    lyricsUrl: '',
  })

  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [localImageFile, setLocalImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Underline,
      Strike,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight,
      ListItem,
      BulletList,
      OrderedList,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setForm((prev) => ({ ...prev, lyrics: editor.getHTML() }))
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
      setLocalImageFile(file)
    }
  }

  const uploadImage = async () => {
    if (!localImageFile) return null
    const fileExt = localImageFile.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase.storage
      .from('hymns')
      .upload(`images/${fileName}`, localImageFile)

    if (error) {
      setError('Failed to upload image')
      return null
    }

    const { data: publicUrlData } = supabase.storage.from('hymns').getPublicUrl(`images/${fileName}`)
    return publicUrlData?.publicUrl || null
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    const imageUrl = await uploadImage()
    if (!imageUrl) {
      setLoading(false)
      return
    }

    const payload = { ...form, image: imageUrl }

    const { error } = await supabase.from('hymns').insert([payload])
    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard/manage-hymns')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      <h2 className="text-lg font-semibold mb-6 text-zinc-800">Create hymns</h2>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col gap-6">
          <div>
            <label className="text-sm text-gray-700 mb-1 block">Title of hymn</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="name of hymn"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">Select hymn image</label>
            <label className="w-full border border-dashed border-gray-300 rounded-md h-[160px] flex items-center justify-center text-gray-400 hover:bg-gray-50 cursor-pointer relative">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm">Click to choose image</span>
                </div>
              )}
              <input type="file" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">Select Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm text-gray-700 bg-white"
            >
              <option value="English">Category | English</option>
              <option value="Efik">Category | Efik</option>
              <option value="Ibibio">Category | Ibibio</option>
            </select>
          </div>

          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm"
          />
          <input
            type="text"
            name="audioUrl"
            value={form.audioUrl}
            onChange={handleChange}
            placeholder="Audio URL"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm"
          />
          <input
            type="text"
            name="lyricsUrl"
            value={form.lyricsUrl}
            onChange={handleChange}
            placeholder="Lyrics PDF URL"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm"
          />
        </div>

        <div className="md:w-2/3 border rounded-md p-4">
          <div className="flex flex-wrap items-center gap-2 mb-4 border-b pb-2">
            <select
              onChange={(e) => {
                const level = parseInt(e.target.value) as 1 | 2 | 3
                editor?.chain().focus().toggleHeading({ level }).run()
              }}
              value=""
              className="border text-sm px-2 py-1 rounded"
            >
              <option value="" disabled>Heading</option>
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
            </select>

            <button onClick={() => editor?.chain().focus().toggleBold().run()} className="font-bold px-2 py-1 text-sm">B</button>
            <button onClick={() => editor?.chain().focus().toggleStrike().run()} className="line-through px-2 py-1 text-sm">S</button>
            <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className="underline px-2 py-1 text-sm">U</button>
            <span className="w-px h-5 bg-gray-300 mx-1" />
            <button onClick={() => editor?.chain().focus().setTextAlign('left').run()} className="text-sm px-2">A⬅</button>
            <button onClick={() => editor?.chain().focus().setTextAlign('center').run()} className="text-sm px-2">A⬍</button>
            <button onClick={() => editor?.chain().focus().setTextAlign('right').run()} className="text-sm px-2">A➡</button>
            <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 text-sm">• List</button>
            <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="px-2 py-1 text-sm">1. List</button>
            <button onClick={() => editor?.chain().focus().toggleHighlight().run()} className="px-2 py-1 text-sm bg-yellow-200">🖍</button>
          </div>

          <EditorContent editor={editor} className="min-h-[300px] text-sm text-gray-700" />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button variant="outline" onClick={() => setShowPreview(true)}>Preview</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Hymn'}
        </Button>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-xl">
            <h3 className="text-xl font-semibold mb-4">{form.title}</h3>
            {previewImage && (
              <Image src={previewImage} alt="Preview" width={600} height={300} className="rounded mb-4" />
            )}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: form.lyrics }} />
            <p className="mt-4 text-sm text-gray-600">Category: {form.category}</p>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPreview(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
