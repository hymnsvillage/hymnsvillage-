'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';
import CharacterCount from '@tiptap/extension-character-count';
import Mention from '@tiptap/extension-mention';
import ImageExtension from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Blockquote from '@tiptap/extension-blockquote';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import CreatableSelect from 'react-select/creatable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import slugify from 'slugify';
import NextImage from 'next/image';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough, List, ListOrdered,
  Heading2, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Youtube as YoutubeIcon,
  Code, Highlighter, Quote, Minus, Eraser, Eye
} from 'lucide-react';


type OptionType = { value: string; label: string };
type Category = { id: string; name: string };
type Tag = { id: string; name: string };

const RichTextEditor = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [category, setCategory] = useState<OptionType | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<OptionType[]>([]);
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, hardBreak: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      CodeBlock, Underline,
      Youtube.configure({ width: 640, height: 360 }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount.configure({ limit: 35000 }),
      Mention.configure({
        HTMLAttributes: { class: 'mention text-blue-500 font-semibold' },
        suggestion: {
          char: '@',
          items: ({ query }) => [
            { id: 1, label: 'Christiana' },
            { id: 2, label: 'JohnDoe' },
          ].filter(user => user.label.toLowerCase().includes(query.toLowerCase())),
        }
      }),
      ImageExtension.configure({ inline: false, allowBase64: true }),
      Highlight,
      Placeholder.configure({ placeholder: 'Start writing your article here...' }),
      HorizontalRule, Blockquote, HardBreak.configure({ keepMarks: false })
    ],
    content: '',
  });

 useEffect(() => {
  const fetchData = async () => {
    try {
      const [catRes, tagRes] = await Promise.all([
        axios.get('/api/blog/category'),
         axios.get('/api/blog/tag'),
      ]);

      setCategories(Array.isArray(catRes.data?.data?.categories) ? catRes.data.data.categories : []);

      setTags(Array.isArray(tagRes.data?.data?.tags) ? tagRes.data.data.tags : []);

    } catch (error) {
      console.error('Error fetching categories/tags', error);
      setCategories([]);
      setTags([]);
    }
  };
  fetchData();
}, []);


  useEffect(() => {
    setSlug(slugify(title, { lower: true, strict: true }));
    setMetaTitle(title);
  }, [title]);

   
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onloadend = () => {
    setFeaturedImage(reader.result as string);
  };
  reader.readAsDataURL(file);
};


  const handleCreateCategory = async (inputValue: string) => {
    try {
      const res = await axios.post('/api/blog/category', { name: inputValue });
      const newCat = res.data;
      setCategories(prev => [...prev, newCat]);
      setCategory({ value: newCat.id, label: newCat.name });
      toast.success('Category created');
    } catch {
      toast.error('Failed to create category');
    }
  };

  const handleCreateTag = async (inputValue: string) => {
    try {
      const res = await axios.post('/api/blog/tag', { name: inputValue });
      const newTag = res.data;
      setTags(prev => [...prev, newTag]);
      setSelectedTags(prev => [...prev, { value: newTag.id, label: newTag.name }]);
      toast.success('Tag created');
    } catch {
      toast.error('Failed to create tag');
    }
  };

 const handleSubmit = async () => {
  if (!title || !editor) return toast.error('Title and content are required');

  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('slug', slug);
    formData.append('content', editor.getHTML());
    formData.append('metaTitle', metaTitle);
    formData.append('metaDescription', metaDescription);
    formData.append('canonicalUrl', canonicalUrl);
    formData.append('altText', altText);

    // Only append if category exists
    if (category?.value) {
      formData.append('categoryId', category.value);
    }

    // Only append if tags are selected
    selectedTags.forEach((tag, index) => {
      formData.append(`tagIds[${index}]`, tag.value);
    });

    // Append image file if selected
    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];
    if (file) {
      formData.append('file', file);
    }

    await axios.post('/api/blog', formData);

    toast.success('Post created successfully');

    // Reset form
    setTitle('');
    setSlug('');
    setMetaTitle('');
    setMetaDescription('');
    setCanonicalUrl('');
    editor.commands.clearContent();
    setCategory(null);
    setSelectedTags([]);
    setFeaturedImage(null);
    setAltText('');
    if (fileInput?.value) fileInput.value = '';
  } catch (err) {
    console.error(err);
    toast.error('Failed to create post');
  }
};


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toolbarButtons: [string, () => React.JSX.Element, any?][] = [
    ['toggleBold', () => <Bold size={16} />],
    ['toggleItalic', () => <Italic size={16} />],
    ['toggleUnderline', () => <UnderlineIcon size={16} />],
    ['toggleStrike', () => <Strikethrough size={16} />],
    ['toggleHighlight', () => <Highlighter size={16} />],
    ['toggleCodeBlock', () => <Code size={16} />],
    ['toggleBlockquote', () => <Quote size={16} />],
    ['setHorizontalRule', () => <Minus size={16} />],
    ['setHardBreak', () => <>↵</>],
    ['unsetAllMarks.clearNodes', () => <Eraser size={16} />],
    ['toggleBulletList', () => <List size={16} />],
    ['toggleOrderedList', () => <ListOrdered size={16} />],
    ['toggleHeading', () => <Heading2 size={16} />, { level: 2 }],
    ['setTextAlign', () => <AlignLeft size={16} />, 'left'],
    ['setTextAlign', () => <AlignCenter size={16} />, 'center'],
    ['setTextAlign', () => <AlignRight size={16} />, 'right']
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Create Blog Post</h1>
        <button onClick={() => setShowPreview(!showPreview)} className="text-blue-600 hover:underline flex items-center">
          <Eye className="w-4 h-4 mr-1" /> {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      {showPreview && (
        <div
          className="prose max-w-none border p-4 rounded-md bg-gray-50 mb-4"
          dangerouslySetInnerHTML={{ __html: editor?.getHTML() ?? '' }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post Title" className="w-full border p-3 rounded-md" />
          <input type="text" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="Meta Title" className="w-full border p-3 rounded-md" />
          <textarea value={metaDescription} onChange={e => setMetaDescription(e.target.value)} placeholder="Meta Description" className="w-full border p-3 rounded-md" rows={2} />
          <input type="text" value={canonicalUrl} onChange={e => setCanonicalUrl(e.target.value)} placeholder="Canonical URL (optional)" className="w-full border p-3 rounded-md" />

          <div onClick={() => fileInputRef.current?.click()} className="border border-dashed p-4 text-center cursor-pointer bg-gray-50">
            <ImageIcon className="mx-auto mb-2" /> Click to upload
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImagePreview} />

          </div>

          {featuredImage && (
            <div className="mt-2">
              <NextImage src={featuredImage} alt={altText || 'Preview'} width={640} height={360} className="rounded-md w-full object-cover" />
              <input value={altText} onChange={e => setAltText(e.target.value)} className="w-full mt-2 border p-2 rounded-md" placeholder="Alt text" />
            </div>
          )}

         <CreatableSelect
               isClearable
                onChange={setCategory}
               onCreateOption={handleCreateCategory}
                options={(categories || []).map(c => ({ value: c.id, label: c.name }))}
                value={category}
              placeholder="Select or create category"
            />

            <CreatableSelect
                isMulti
                onChange={(newValue) => setSelectedTags(newValue as OptionType[])}
                onCreateOption={handleCreateTag}
                options={(tags || []).map(t => ({ value: t.id, label: t.name }))}
                value={selectedTags}
                placeholder="Select or create tags"
              />

        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2">
            {toolbarButtons.map(([command, Icon, value]) => (
              <button
                key={command + (value ?? '')}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => (editor?.chain().focus() as any)[command](value).run()}
                className="btn"
              >
                {Icon()}
              </button>
            ))}
            <button onClick={() => fileInputRef.current?.click()} className="btn"><ImageIcon size={16} /></button>
            <button onClick={() => {
              const url = prompt('Paste YouTube URL');
              if (url) editor?.chain().focus().setYoutubeVideo({ src: url }).run();
            }} className="btn"><YoutubeIcon size={16} /></button>
          </div>

          <EditorContent editor={editor} className="min-h-[300px] border p-4 rounded-md bg-gray-50" />

          <div className="text-sm text-gray-500">
            {editor?.storage.characterCount.characters()}/35,000 characters
          </div>

          <div className="flex justify-end">
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Save Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
