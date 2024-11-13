import { useState } from "react";
import "./App.css";
import { Loader } from "./components/loader";
import { useGetVolumes } from "./queries/useGetVolumes";
import { Button } from "./components/ui/button";
import { BookCard } from "./components/book-card";

function App() {
  const [searchString] = useState<string>("Programming");
  const { data, isLoading, fetchNextPage } = useGetVolumes(searchString);

  const books = data?.pages?.flatMap((page) => page.items) ?? [];
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          <div className="min-h-screen bg-gradient-to-b  py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-16 text-center">Books</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book, index) => (
                  <BookCard key={book.id + index} book={book} />
                ))}
              </div>
            </div>
          </div>
          <Button className="mt-4" onClick={() => fetchNextPage()}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </>
      )}
    </>
  );
}

export default App;
