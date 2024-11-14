import { VolumeItems } from "@/queries/useGetVolumes";
import { Star, BookOpen } from "lucide-react";
import { FC, PropsWithChildren } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export const BookCard: FC<
  PropsWithChildren<{ book: VolumeItems; openModal: () => void }>
> = ({ book, openModal }) => {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="flex h-64 w-full justify-center p-4">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={`Cover of ${book.volumeInfo.title}`}
          className="transition-transform duration-300 hover:scale-105"
          height={200}
          width={180}
        />
      </div>
      <CardHeader className="flex-grow  text-left">
        <div className="flex justify-between items-start flex-col">
          <div>
            <CardTitle className="text-xl font-semibold ">
              {book.volumeInfo.title}
            </CardTitle>
            <CardDescription className="text-sm ">
              by{" "}
              <span className="font-semibold">
                {book.volumeInfo.authors?.join(", ")}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-gray-700 line-clamp-3 text-justify">
            {book.volumeInfo.description}
          </p>
          <div className="flex items-center mt-4 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="mr-4">{book.volumeInfo.averageRating}</span>
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{book.volumeInfo.pageCount} pages</span>
          </div>
        </div>
        <div className="text-left mt-4">
          <Badge variant="secondary" className="text-xs">
            {book.volumeInfo.categories?.join(", ")}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end bg-gray-50">
        <Button onClick={() => openModal()}>Read More</Button>
      </CardFooter>
    </Card>
  );
};
