import { http } from 'msw';

let nodes = [
  { id: 1, parent: 0, name: "Root", isFolder: true },
  { id: 2, parent: 1, name: "Documents", isFolder: true },
  { id: 3, parent: 1, name: "Pictures", isFolder: true },
  { id: 4, parent: 2, name: "Resume.pdf", isFolder: false },
  { id: 5, parent: 3, name: "Vacation.png", isFolder: false },
];

export const handlers = [
  http.get('/api/files', ({ request }) => {
    const url = new URL(request.url);
    const parent = Number(url.searchParams.get('parent') || 1);
    return new Response(JSON.stringify(nodes.filter(n => n.parent === parent)), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
  http.post('/api/folder', async ({ request }) => {
    const { parent, name } = await request.json() as any;
    const id = Date.now();
    const node = { id, parent, name, isFolder: true };
    nodes.push(node);
    return new Response(JSON.stringify(node), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
  http.post('/api/file', async ({ request }) => {
    const { parent, name } = await request.json() as any;
    const id = Date.now();
    const node = { id, parent, name, isFolder: false };
    nodes.push(node);
    return new Response(JSON.stringify(node), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
  http.patch('/api/node/:id', async ({ params, request }) => {
    const { id } = params;
    const { name } = await request.json() as any;
    nodes = nodes.map(n => n.id === Number(id) ? { ...n, name } : n);
    return new Response('{}', { status: 200 });
  }),
  http.delete('/api/node/:id', ({ params }) => {
    const { id } = params;
    nodes = nodes.filter(n => n.id !== Number(id));
    return new Response('{}', { status: 200 });
  }),
  http.post('/api/node/:id/copy', ({ params }) => {
    const { id } = params;
    const node = nodes.find(n => n.id === Number(id));
    if (!node) return new Response('{}', { status: 404 });
    const newId = Date.now();
    const copy = { ...node, id: newId, name: node.name + '_복사본' };
    nodes.push(copy);
    return new Response(JSON.stringify(copy), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
  http.post('/api/node/:id/move', async ({ params, request }) => {
    const { id } = params;
    const { parent } = await request.json() as any;
    nodes = nodes.map(n => n.id === Number(id) ? { ...n, parent } : n);
    return new Response('{}', { status: 200 });
  }),
  http.post('/api/upload', async ({ request }) => {
    const formData = await request.formData();
    const parent = Number(formData.get('parent'));
    const file = formData.get('file');
    if (!file || typeof file === 'string') return new Response('{}', { status: 400 });
    const id = Date.now();
    // For mock: create a URL for preview (in real, would be a server URL)
    const url = `https://via.placeholder.com/80x60?text=${encodeURIComponent((file as File).name)}`;
    const node = { id, parent, name: (file as File).name, isFolder: false, url };
    nodes.push(node);
    return new Response(JSON.stringify(node), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
  http.get('/api/folders/all', () => {
    return new Response(
      JSON.stringify(nodes.filter(n => n.isFolder)),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
]; 