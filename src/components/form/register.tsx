'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setCookies } from '@/helper/setCookies';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const [name, setName] = React.useState<string | ''>('');
  const [email, setEmail] = React.useState<string | ''>('');
  const [password, setPassword] = React.useState<string | ''>('');
  const router = useRouter();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // TODO: Add logic to submit form
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success('Register successfully');
        await setCookies('token', data.data.token);
        router.push('/');
      } else {
        toast.error(data.error || 'Something went wrong!');
      }
    } catch (error:any) {
      toast.error(error.message || 'Something went wrong!');
      console.error(error);
    }
  };
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Get in Touch With US </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='name'
                placeholder='your name'
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='email'>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
                placeholder='your email'
              />
            </div>

            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='password'>Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id='password'
                placeholder='your password'
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button className='w-full' onClick={handleSubmit}>
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
