'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCookies } from '@/helper/setCookies';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export const CategoryForm = ({
  setIsAdding,
  setCategories,
}: {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [parentId, setParentId] = React.useState<string>('');
  const [name, setName] = React.useState('');
  const [form_slug, setSlug] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [alternativeText, setAlternativeText] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const router = useRouter();
  // image handler
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image_file = event.target.files?.[0];
    image_file && setFile(image_file);
    if (image_file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(image_file);
    }
  };
  //

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', form_slug);
    formData.append('description', description);
    file && formData.append('image', file);
    formData.append('alt', alternativeText);
    formData.append('parentId', parentId);
    console.log(await getCookies('token'));
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/categories/`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${await getCookies('token')}`,
          },
        }
      );
      const data = await response.json();
      if (data?.data?.id) {
        toast.success('Category added successfully!');
        setCategories((prev: any) => [data.data, ...prev]);
        setIsAdding(false);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong!');
      console.error(error);
    }
  };
  return (
    <>
      <div className='max-w-2xl mx-auto p-6 md:p-8'>
        <div className='space-y-4'>
          <div>
            <h1 className='text-2xl font-bold'>Create Category</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Fill out the form to add a new product to your store.
            </p>
          </div>
          <form className='grid gap-6' onSubmit={handleSubmit}>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Category Name</Label>
              <Input
                value={name as string}
                onChange={(e) => setName(e.target.value)}
                id='name'
                placeholder='Enter product name'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='slug'>Parent Id</Label>
              <Input
                value={parentId as string}
                onChange={(e) => setParentId(e.target.value)}
                id='slug'
                placeholder='Enter product name'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='slug'>Slug</Label>
              <Input
                value={form_slug as string}
                onChange={(e) => setSlug(e.target.value)}
                id='slug'
                placeholder='Enter product name'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                value={description as string}
                onChange={(e) => setDescription(e.target.value)}
                className='min-h-[120px]'
                id='description'
                placeholder='Enter product description'
              />
            </div>
            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='image'>Image</Label>
                <Input
                  onChange={handleImageChange}
                  accept='image/*'
                  id='image'
                  type='file'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='alt'>Alt</Label>
                <Input
                  value={alternativeText as string}
                  onChange={(e) => setAlternativeText(e.target.value)}
                  id='alt'
                  placeholder='Enter Alt for Image'
                  type='string'
                />
              </div>
              <div className='grid gap-2'>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt='Uploaded Image'
                    width={200}
                    height={200}
                    className=' h-20 w-20 object-cover rounded-lg'
                  />
                )}
              </div>
            </div>
            <Button className='w-full' type='submit'>
              Create Category
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
