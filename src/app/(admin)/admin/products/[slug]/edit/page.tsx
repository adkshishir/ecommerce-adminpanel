'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCookies } from '@/helper/setCookies';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const edit = ({ params }: { params: { slug: string } }) => {
  const paramsSlug = params.slug;
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [alternativeText, setAlternativeText] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [markedPrice, setMarkedPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [details, setDetails] = useState('');
  const [totalStocks, setTotalStocks] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [id, setId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${paramsSlug}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${await getCookies('token')}`,
          },
        }
      );
      const data = await response.json();
      setName(data?.data?.name || '');
      setSlug(data?.data?.slug || '');
      setDescription(data?.data?.description || '');
      setAdditionalInformation(data?.data?.additionalInformation || '');
      setMarkedPrice(data?.data?.markedPrice || '');
      setDiscount(data?.data?.discount || '');
      setDetails(data?.data?.details || '');
      setTotalStocks(data?.data?.totalStocks || '');
      setCategoryId(data?.data?.categoryId || '');
      setFile(data?.data?.image || null);
      setAlternativeText(data?.data?.media.alt || '');
      setId(data?.data?.id || '');
      setImageUrl(data?.data?.media.url || '');
    };
    fetchProduct();
  }, [paramsSlug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description);
    formData.append('image', file as Blob);
    formData.append('additionalInformation', additionalInformation);
    formData.append('markedPrice', markedPrice);
    formData.append('discount', discount);
    formData.append('details', details);
    formData.append('totalStocks', totalStocks);
    formData.append('categoryId', categoryId);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${id}`,
        {
          method: 'PUT',
          body: formData,
          headers: {
            Authorization: `Bearer ${await getCookies('token')}`,
          },
        }
      );
      const data = await response.json();
      if (data?.data?.id) {
        toast.success('Product updated successfully!');
        router.push('/admin/products');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong!');
    }
  };

  return (
    <>
      <div className=' w-9/12 max-h-[85vh] overflow-y-auto border rounded-lg my-3 mx-auto p-6 md:p-8'>
        <div className='space-y-4'>
          <div>
            <h1 className='text-3xl font-bold'>Create New Product</h1>
            <p className='text-gray-500 dark:text-gray-400'>
              Fill out the form to add a new product to your store.
            </p>
          </div>
          <form onSubmit={handleSubmit} className='grid  gap-6'>
            <div className='grid md:grid-cols-2 gap-2'>
              <div>
                <Label htmlFor='name'>Product Name</Label>
                <Input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id='name'
                  placeholder='Enter product name'
                />
              </div>
              <div>
                <Label htmlFor='name'>Marked Price</Label>
                <Input
                  type='number'
                  value={markedPrice}
                  onChange={(e) => setMarkedPrice(e.target.value)}
                  placeholder='Enter marked price'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='slug'>Slug</Label>
              <Input
                type='text'
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                id='slug'
                placeholder='Enter product slug'
              />
            </div>
            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='discount'>Discount</Label>
                <Input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  id='discount'
                  placeholder='Enter discount'
                  type='number'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='image'>Total Stocks</Label>
                <Input
                  id='image'
                  value={totalStocks}
                  onChange={(e) => setTotalStocks(e.target.value)}
                  placeholder='Enter total stocks'
                  type='number'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                className='min-h-[120px]'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id='description'
                placeholder='Enter product description'
              />
            </div>
            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='discount'>Details</Label>
                <Textarea
                  onChange={(e) => setDetails(e.target.value)}
                  value={details}
                  id='details'
                  placeholder='Enter Details'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='categoryId'>Category Id</Label>
                <Input
                  id='categoryId'
                  placeholder='Enter category id'
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  type='number'
                />
              </div>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='additional-information'>
                Additional Information
              </Label>
              <Textarea
                className='min-h-[120px]'
                id='additional-information'
                value={additionalInformation}
                onChange={(e) => setAdditionalInformation(e.target.value)}
                placeholder='Enter product additional information'
              />
            </div>

            <div className='grid sm:grid-cols-2 gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='image'>Image</Label>
                <Input
                  id='image'
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept='image/*'
                  placeholder='Enter image'
                  type='file'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='alternativeText'>Alt</Label>
                <Input
                  value={alternativeText}
                  onChange={(e) => setAlternativeText(e.target.value)}
                  id='alternativeText'
                  placeholder='Enter alternative text'
                  type='text'
                />
              </div>
            </div>
            <Image
              width={100}
              height={100}
              alt={alternativeText}
              className='bg-white rounded-lg object-cover '
              src={file ? URL.createObjectURL(file) : imageUrl}
            />

            <Button type='submit' className='w-full'>
              Create Product
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default edit;
