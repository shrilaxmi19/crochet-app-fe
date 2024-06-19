import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control, setValue } = useFormContext();
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve imageUrl from localStorage on component mount
    const savedImageUrl = localStorage.getItem(`menuItems.${index}.imageUrl`);
    console.log(savedImageUrl, "kk");
    
    if (savedImageUrl) {
      setExistingImageUrl(savedImageUrl);
      setValue(`menuItems.${index}.imageUrl`, savedImageUrl);
    }
  }, [index, setValue]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        // Save imageUrl to localStorage
        localStorage.setItem(`menuItems.${index}.imageUrl`, imageUrl);
        setExistingImageUrl(imageUrl);
        setValue(`menuItems.${index}.imageUrl`, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-end gap-2">
        <FormField
          control={control}
          name={`menuItems.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Name <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cheese Pizza"
                  className="bg-white"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`menuItems.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Price (₹) <FormMessage />
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="8.00" className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={removeMenuItem}
          className="bg-red-500 max-h-fit"
        >
          Remove
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="space-y-2">
          <div>
            <h2 className="text-xl font-semibold">Image</h2>
            <FormDescription>
              Add an image for this menu item. Adding a new image will overwrite the existing one.
            </FormDescription>
          </div>
          <div className="flex flex-col gap-8 md:w-[50%]">
            {existingImageUrl && (
              <AspectRatio ratio={16 / 9}>
                <img
                  src={existingImageUrl}
                  alt="Menu Item Image"
                  className="rounded-md object-cover h-full w-full"
                />
              </AspectRatio>
            )}
            <FormField
              control={control}
              name={`menuItems.${index}.imageFile`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(event) => {
                        const file = event.target.files ? event.target.files[0] : null;
                        field.onChange(file);
                        handleImageChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemInput;
