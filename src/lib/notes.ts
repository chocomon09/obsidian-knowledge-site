import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content');

export type NoteMeta = {
  slug: string;
  title: string;
  created_at?: string;
  updated_at?: string;
  type?: string;
  tags?: string[];
  kind?: string;
  status?: string;
  folder: 'outputs' | 'compound';
};

export type Note = NoteMeta & {
  content: string;
};

export function getAllNotes(): NoteMeta[] {
  const notes: NoteMeta[] = [];
  
  const folders: ('outputs' | 'compound')[] = ['outputs', 'compound'];
  
  for (const folder of folders) {
    const folderPath = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(folderPath)) continue;
    
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      const slug = file.replace(/\.md$/, '');
      
      notes.push({
        slug,
        title: data.title || slug,
        created_at: data.created_at ? (data.created_at instanceof Date ? data.created_at.toISOString().split('T')[0] : String(data.created_at)) : '',
        updated_at: data.updated_at ? (data.updated_at instanceof Date ? data.updated_at.toISOString().split('T')[0] : String(data.updated_at)) : '',
        type: data.type || '',
        tags: data.tags || [],
        kind: data.kind || '',
        status: data.status || '',
        folder
      });
    }
  }
  
  return notes.sort((a, b) => {
    if (a.created_at && b.created_at) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return 0;
  });
}

export function getNoteBySlug(slug: string): Note | null {
  const folders: ('outputs' | 'compound')[] = ['outputs', 'compound'];
  
  for (const folder of folders) {
    const filePath = path.join(CONTENT_DIR, folder, `${slug}.md`);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        slug,
        title: data.title || slug,
        created_at: data.created_at ? (data.created_at instanceof Date ? data.created_at.toISOString().split('T')[0] : String(data.created_at)) : '',
        updated_at: data.updated_at ? (data.updated_at instanceof Date ? data.updated_at.toISOString().split('T')[0] : String(data.updated_at)) : '',
        type: data.type || '',
        tags: data.tags || [],
        kind: data.kind || '',
        status: data.status || '',
        folder,
        content
      };
    }
  }
  
  return null;
}
