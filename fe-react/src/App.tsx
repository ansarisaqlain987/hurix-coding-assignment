import { useState } from "react";
import "./App.css";
import { Loader } from "./components/loader";
import { useGetVolumes, VolumeItems } from "./queries/useGetVolumes";
import { Button } from "./components/ui/button";
import { BookCard } from "./components/book-card";
import { DetailsDialog } from "./components/details-dialog";

function App() {
  const [selectedBook, setSelectedBook] = useState<VolumeItems | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, fetchNextPage } = useGetVolumes("Programming");

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
                  <BookCard
                    key={`book-${index}-${book.id}`}
                    book={book}
                    openModal={() => {
                      setSelectedBook(book);
                      setOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <Button className="mt-4" onClick={() => fetchNextPage()}>
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </>
      )}
      <DetailsDialog
        open={open}
        setOpen={setOpen}
        selectedBook={selectedBook}
      />
    </>
  );
}

export default App;
