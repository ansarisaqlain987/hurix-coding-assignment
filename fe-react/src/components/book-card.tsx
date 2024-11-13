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

export const BookCard: FC<PropsWithChildren<{ book: VolumeItems }>> = ({
  book,
}) => {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-64 w-full justify-center">
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={`Cover of ${book.volumeInfo.title}`}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="flex-grow">
        <div className="flex justify-between items-start flex-col">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {book.volumeInfo.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              by {book.volumeInfo.authors?.join(", ")}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-xs">
            {book.volumeInfo.categories?.join(", ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 line-clamp-3">
          {book.volumeInfo.description}
        </p>
        <div className="flex items-center mt-4 text-sm text-gray-600">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <span className="mr-4">{book.volumeInfo.averageRating}</span>
          <BookOpen className="w-4 h-4 mr-1" />
          <span>{book.volumeInfo.pageCount} pages</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end bg-gray-50">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Read More
        </button>
      </CardFooter>
    </Card>
  );
};
