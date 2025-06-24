import fs from "node:fs/promises";
import path from "node:path";
import type { Route } from "next";
import Link from "next/link";

const HomePage = () => (
  <main className="space-y-6 p-6">
    <hgroup className="space-y-2">
      <h1 className="font-bold text-4xl">Hi</h1>
      <p>
        This is my WIP component library inspired by shadcn/ui, but using Base
        UI as the foundation
      </p>
      <p>
        I made this because I&apos;m very particular about my CSS and I wanted
        to set components up the way I like :]
      </p>
      <p>
        This project might turn into that shadcn registry thing they have so I
        don&apos;t have to set up the infra lol, but we&apos;ll see
      </p>
      <p className="text-muted-foreground text-xs">
        Anyway, how did you end up here...?
      </p>
    </hgroup>
    <AvailableComponents />
  </main>
);

const AvailableComponents = async () => {
  const filePath = path.join(process.cwd(), "src/components/ui");

  try {
    const files = await fs.readdir(filePath);
    const componentFiles = files.filter(
      (file) => file.endsWith(".tsx") || file.endsWith(".ts"),
    );

    return (
      <div>
        <h2>Available Components</h2>
        {componentFiles.length > 0 ? (
          <ul>
            {componentFiles.map((file) => {
              const componentName = file.split(".")[0];

              return (
                <li key={file}>
                  <Link
                    href={`/docs/components/${componentName}` as Route}
                    className="capitalize"
                  >
                    {componentName}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No components found.</p>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h2>Available Components</h2>
        <p>
          Error reading components directory:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }
};

export default HomePage;
