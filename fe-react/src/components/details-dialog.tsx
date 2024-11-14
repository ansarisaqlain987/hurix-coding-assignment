import { VolumeItems } from "@/queries/useGetVolumes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { BookOpen, Star } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedBook: VolumeItems | null;
}

export const DetailsDialog = ({ open, setOpen, selectedBook }: Props) => {
  console.log(selectedBook);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex h-64 w-full justify-center p-4">
              <img
                src={selectedBook?.volumeInfo.imageLinks?.thumbnail}
                alt={`Cover of ${selectedBook?.volumeInfo.title}`}
                className="transition-transform duration-300 hover:scale-105"
                height={200}
                width={180}
              />
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex justify-between items-start flex-col">
              <div>
                <div className="text-xl font-semibold ">
                  {selectedBook?.volumeInfo.title}
                </div>
                <div className="text-sm ">
                  by{" "}
                  <span className="font-semibold">
                    {selectedBook?.volumeInfo.authors?.join(", ")}
                  </span>
                </div>
              </div>
            </div>
            <div className="my-4">
              <p className="text-gray-700 text-justify">
                {selectedBook?.volumeInfo.description}
              </p>
              <div className="flex items-center mt-4 text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="mr-4">
                  {selectedBook?.volumeInfo.averageRating}
                </span>
                <BookOpen className="w-4 h-4 mr-1" />
                <span>{selectedBook?.volumeInfo.pageCount} pages</span>
              </div>
            </div>
            <div className="text-left mt-4">
              <Badge variant="secondary" className="text-xs">
                {selectedBook?.volumeInfo.categories?.join(", ")}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
