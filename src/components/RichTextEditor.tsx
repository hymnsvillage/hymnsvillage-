'use client';

import React, { useRef, useState } from 'react';
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


import { SuggestionOptions } from '@tiptap/suggestion';
import NextImage from 'next/image';

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Youtube as YoutubeIcon,
  Code,
  Highlighter,
  Quote,
  Minus,
  Eraser,
} from 'lucide-react';

type MentionItem = { id: number; label: string };

const mentionSuggestion: Partial<SuggestionOptions<MentionItem>> = {
  char: '@',
  items: ({ query }) => {
    const users: MentionItem[] = [
      { id: 1, label: 'Christiana' },
      { id: 2, label: 'JohnDoe' },
      { id: 3, label: 'JaneDev' },
    ];
    return users.filter(user =>
      user.label.toLowerCase().startsWith(query.toLowerCase())
    );
  },
  render: () => {
    let popup: HTMLDivElement | null = null;

    return {
      onStart: ({ items, clientRect }) => {
        popup = document.createElement('div');
        popup.className = 'mention-popup bg-white border rounded shadow p-2 absolute z-50';
        popup.innerHTML = items.map(item => `<div class="p-1 cursor-pointer hover:bg-gray-100">@${item.label}</div>`).join('');
        document.body.appendChild(popup);

        const rect = clientRect?.();
        if (popup && rect) {
          popup.style.top = `${rect.bottom + window.scrollY}px`;
          popup.style.left = `${rect.left + window.scrollX}px`;
        }
      },
      onUpdate: ({ items }) => {
        if (popup) {
          popup.innerHTML = items.map(item => `<div class="p-1 cursor-pointer hover:bg-gray-100">@${item.label}</div>`).join('');
        }
      },
      onExit: () => {
        popup?.remove();
        popup = null;
      },
    };
  },
};

const RichTextEditor = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Worship');
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [altText, setAltText] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, hardBreak: false }),
      Heading.configure({ levels: [1, 2, 3] }), // ✅ ADDED THIS
      CodeBlock,
      Underline,
      Youtube.configure({ width: 640, height: 360 }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CharacterCount.configure({ limit: 35000 }),
      Mention.configure({
        HTMLAttributes: { class: 'mention text-blue-500 font-semibold' },
        suggestion: mentionSuggestion,
      }),
      ImageExtension.configure({ inline: false, allowBase64: true }),
      Highlight,
      Placeholder.configure({
        placeholder: 'Start writing your article here...',
      }),
      HorizontalRule,
      Blockquote,
      HardBreak.configure({ keepMarks: false }),
    ],
    content: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFeaturedImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreview = () => {
    const content = editor?.getHTML();
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <html><head><title>${title}</title>
        <style>body{font-family:sans-serif;padding:20px;} img{max-width:100%;height:auto;} h1{margin-top:1rem;}</style></head><body>
        ${featuredImage
          ? `<div style="position:relative;text-align:center;">
              <img src="${featuredImage}" alt="${altText}" />
              <h1 style="position:absolute;bottom:1rem;left:50%;transform:translateX(-50%);color:white;background:rgba(0,0,0,0.6);padding:0.5rem 1rem;border-radius:0.5rem;">${title}</h1>
            </div>`
          : ''
        }
        ${content}
        </body></html>
      `);
      previewWindow.document.close();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Article Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of article"
              className="w-full border rounded-md p-3 text-sm shadow-sm"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Select Featured Image</label>
            <div
              className="w-full h-40 border border-dashed border-gray-400 rounded-md relative cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-sm z-0">
                <ImageIcon className="mb-1" />
                Click to choose image
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>
            {featuredImage && (
              <div className="mt-4">
                <NextImage
                  src={featuredImage}
                  alt={altText || 'Featured Image'}
                  width={640}
                  height={360}
                  className="rounded-md object-cover w-full"
                />
                <input
                  type="text"
                  placeholder="Alt text for image"
                  value={altText}
                  onChange={(e) => setAltText(e.target.value)}
                  className="mt-2 w-full border rounded-md p-2 text-sm"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium mb-2">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md p-3 text-sm shadow-sm"
            >
              <option value="Worship">Worship</option>
              <option value="Praise">Praise</option>
              <option value="Faith">Faith</option>
            </select>
          </div>
        </div>

        {/* Editor */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => editor?.chain().focus().toggleBold().run()} className="btn"><Bold size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="btn"><Italic size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className="btn"><UnderlineIcon size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleStrike().run()} className="btn"><Strikethrough size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleHighlight().run()} className="btn"><Highlighter size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()} className="btn"><Code size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleBlockquote().run()} className="btn"><Quote size={16} /></button>
            <button onClick={() => editor?.chain().focus().setHorizontalRule().run()} className="btn"><Minus size={16} /></button>
            <button onClick={() => editor?.chain().focus().setHardBreak().run()} className="btn">↵</button>
            <button onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()} className="btn"><Eraser size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="btn"><List size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="btn"><ListOrdered size={16} /></button>
            <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className="btn"><Heading2 size={16} /></button>
            <button onClick={() => editor?.chain().focus().setTextAlign('left').run()} className="btn"><AlignLeft size={16} /></button>
            <button onClick={() => editor?.chain().focus().setTextAlign('center').run()} className="btn"><AlignCenter size={16} /></button>
            <button onClick={() => editor?.chain().focus().setTextAlign('right').run()} className="btn"><AlignRight size={16} /></button>
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

          <div className="flex justify-end gap-4 pt-4">
            <button onClick={handlePreview} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md">Preview</button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
