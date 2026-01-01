// クライアントサイド側の記述。
// createClient関数は、呼び出したらブラウザでクライアントを作成する。
// クライアントはブラウザ上でsupabaseを操作するためのsdk(ソフトウェア開発キット)。
// 'use client'で使用することができる。
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () =>
  createBrowserClient(
    supabaseUrl!,
    supabaseKey!,
  );
