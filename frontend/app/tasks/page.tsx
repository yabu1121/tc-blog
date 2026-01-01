// app/tasks/page.tsx
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  const supabase = await createClient();
  
  // 1. Supabaseから現在のセッション（JWT）を取得
  const { data: { session } } = await supabase.auth.getSession();

  // 2. GoバックエンドAPIを叩く
  const response = await fetch('http://localhost:8080/api/tasks', {
    headers: {
      'Authorization': `Bearer ${session?.access_token}`,
    },
  });
  
  const tasks = await response.json();

  return (
    <ul>
      {tasks.map((task: any) => <li key={task.id}>{task.title}</li>)}
    </ul>
  );
}