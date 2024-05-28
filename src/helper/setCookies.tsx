'use server';
import { cookies } from 'next/headers';

export async function setCookies(name: string, value: string) {
  cookies().set({
    name: name,
    value: value,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'strict',
    secure: true,
    httpOnly: true,
    // domain: 'localhost:3000',
  });
}

export async function getCookies(name: string) {
  return cookies().get(name)?.value;
}
// export async function deleteCookies(name: string) {
//   cookies().delete(name);
// }
