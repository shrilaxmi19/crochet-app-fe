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

import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control, setValue, watch } = useFormContext();
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const menuItem = watch(`menuItems.${index}`);

  // Function to fetch existing image URL
  const fetchExistingImageUrl = async () => {
    if (menuItem?.imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setExistingImageUrl(reader.result as string);
      };
      reader.readAsDataURL(menuItem.imageFile);
    } else if (menuItem?.imageUrl) {
      // If image URL exists in backend, set it directly
      setExistingImageUrl(menuItem.imageUrl);
    }
  };

  useEffect(() => {
    fetchExistingImageUrl(); // Fetch image URL on component mount
  }, [menuItem?.imageFile, menuItem?.imageUrl]);

  const handleImageChange = (file: File | null) => {
    if (file) {
      setValue(`menuItems.${index}.imageFile`, file, { shouldValidate: true });
      setExistingImageUrl(URL.createObjectURL(file)); // Set image preview
    } else {
      setValue(`menuItems.${index}.imageFile`, null, { shouldValidate: true });
      setExistingImageUrl(null); // Clear image preview
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
               <div className="w-full max-w-xs">
               <img
                 src={existingImageUrl}
                 alt="Menu Item Image"
                 className="rounded-md object-contain w-full h-auto"
                 style={{ maxHeight: "200px" }}
               />
             </div>
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
