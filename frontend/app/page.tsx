type Post = {
  id: number;
  title: string;
  content: string;
};

export default async function Home() {
  // GoのAPIからデータを取得
  // サーバーサイドで実行されるため、Next.jsが直接Goにリクエストを投げます
  const res = await fetch('http://localhost:8080/posts', { cache: 'no-store' });
  const posts: Post[] = await res.json();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>マイ・ブログ MVP</h1>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {posts.map((post) => (
          <article key={post.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </article>
        ))}
      </div>
    </main>
  );
}