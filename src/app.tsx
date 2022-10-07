// Twind
import { trpc } from "./trpc/trpc.ts";
import { TwindProvider } from "./twind/TwindProvider.tsx";
import { tw } from "twind";

const Posts = () => {
  const posts = trpc.post.get.useQuery();
  return (
    <div>
      <h1 className={tw`text-blue-500`}>Posts</h1>
      {posts.data
        ? (
          <ul>
            {posts.data.map((post) => <li key={post.name}>{post.name}</li>)}
          </ul>
        )
        : <div>Loading...</div>}
    </div>
  );
};

export default function App() {
  return (
    <TwindProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <title>Ultra</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body>
          <main>
            <Posts />
          </main>
        </body>
      </html>
    </TwindProvider>
  );
}
