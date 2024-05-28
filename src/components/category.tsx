'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from '@/components/ui/table';
import { JSX, SVGProps, useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { getCookies } from '@/helper/setCookies';
import { toast } from 'sonner';
import { CategoryForm } from './form/category';

export function Category() {
  const [isAdding, setAdding] = React.useState(false);
  const [categories, setcategories] = React.useState([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
        );
        if (!response.ok) {
          // Handle non-2xx HTTP responses
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setcategories(data.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // edit
  async function editcategory(slug: string) {
    router.push(`/admin/parent-category/${slug}/edit`);
  }

  async function deletecategory(id: number) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getCookies('token')}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setcategories((prev: any) => {
          return prev.filter((item: any) => item.id !== id);
        });
        toast.success(data.message || 'Parent Category deleted successfully');
      } else {
        toast.error(data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className='flex flex-1  flex-col gap-4 p-4 md:gap-8 md:p-6'>
      <div className='border shadow-sm rounded-lg p-2'>
        <Button
          onClick={() => {
            setAdding(!isAdding);
          }}
          className='float-right'>
          {isAdding ? 'Cancel' : 'Add '}
        </Button>
      </div>
      {isAdding ? (
        <div className='border shadow-sm rounded-lg p-2'>
          <CategoryForm setIsAdding={setAdding} setCategories={setcategories} />
        </div>
      ) : (
        <div className='border shadow-sm rounded-lg p-2 max-h-[70vh] overflow-scroll'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>ID</TableHead>
                <TableHead className='min-w-[150px]'>Name</TableHead>
                <TableHead className='hidden md:table-cell'>Slug</TableHead>
                <TableHead className='hidden md:table-cell'>Parent Id</TableHead>
                <TableHead className='hidden md:table-cell'>Date</TableHead>
                <TableHead className='hidden sm:table-cell'>Status</TableHead>
                <TableHead className='text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map(
                (
                  category: {
                    id: number;
                    name: string;
                    slug: string;
                    date: string;
                    status: string;
                    createdAt: string;
                    parentId: number;
                  },
                  index
                ) => (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>
                      #{category.id}
                    </TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {category.slug}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {category.parentId}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>
                      {category.createdAt?.slice(0, 10)}
                    </TableCell>

                    <TableCell className='hidden sm:table-cell'>
                      {category.status}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size='icon' variant='ghost'>
                            <MoveHorizontalIcon className='w-4 h-4' />
                            <span className='sr-only'>Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={() => editcategory(category.slug)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deletecategory(category.id)}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function HomeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <polyline points='9 22 9 12 15 12 15 22' />
    </svg>
  );
}

function LineChartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M3 3v18h18' />
      <path d='m19 9-5 5-4-4-3 3' />
    </svg>
  );
}

function MoveHorizontalIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <polyline points='18 8 22 12 18 16' />
      <polyline points='6 8 2 12 6 16' />
      <line x1='2' x2='22' y1='12' y2='12' />
    </svg>
  );
}

function Package2Icon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z' />
      <path d='m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9' />
      <path d='M12 3v6' />
    </svg>
  );
}

function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='m7.5 4.27 9 5.15' />
      <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
      <path d='m3.3 7 8.7 5 8.7-5' />
      <path d='M12 22V12' />
    </svg>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}

function ShoppingCartIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <circle cx='8' cy='21' r='1' />
      <circle cx='19' cy='21' r='1' />
      <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
    </svg>
  );
}

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  );
}
