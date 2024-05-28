'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCookies } from '@/helper/setCookies';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

const page = (params: any) => {
  const slug = params.params.slug;
  const [name, setName] = React.useState('');
  const [form_slug, setSlug] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [file, setFile] = React.useState<File | null>(null);
  const [alternativeText, setAlternativeText] = React.useState('');
  const router = useRouter();
  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await fetch(
    //       process.env.NEXT_PUBLIC_BASE_URL + `/api/parent-categories/${slug}`
    //     );
    //       const data = await response.json();
    //     if (data?.data?.id) {
    //       setName(data.data.name);
    //       setSlug(data.data.slug);
    //       setDescription(data.data.description);
    //       setAlternativeText(data.data.alternativeText);
    //     } else {
    //       toast.error('Something went wrong!');
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // })();
  }, []);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('image', file as File);
    formData.append('alt', alternativeText);
    fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/parent-categories/${slug}`, {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getCookies('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.id) {
          toast.success('Category updated successfully!');
          router.push('/admin/parent-category');
        } else {
          toast.error('Something went wrong!');
        }
      })
      .catch((error) => {
        toast.error(error.message || 'Something went wrong!');
        console.error(error);
      });
  };
  return (
    <>
      <div className='max-w-2xl mx-auto p-6 md:p-8'>
        <div className='space-y-4'>
          <div>
            <h1 className='text-2xl font-bold'>Update Parent Category</h1>
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
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
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
            </div>
            <Button className='w-full' type='submit'>
              Update Product
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
