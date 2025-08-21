// src/services/authApi.ts
import { v4 as uuidv4 } from "uuid";
import { Product } from "../types";

const API_URL = "http://localhost:3000";

interface AuthResult {
  username: string;
  token: string;
  userId: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface UserData {
  id: string;
  username: string;
  password?: string;
}

export async function signIn(
  username: string,
  password: string
): Promise<AuthResult> {
  const response = await fetch(`${API_URL}/users?username=${username}`);
  const users = await response.json();

  if (users.length === 0 || users[0].password !== password) {
    throw new Error("نام کاربری یا رمز عبور اشتباه است.");
  }

  const token = `mock-token-${users[0].id}-${Date.now()}`;
  return { username: users[0].username, token, userId: users[0].id };
}

export async function signUp(
  username: string,
  password: string
): Promise<AuthResult> {
  const checkUserResponse = await fetch(
    `${API_URL}/users?username=${username}`
  );
  const existingUsers = await checkUserResponse.json();

  if (existingUsers.length > 0) {
    throw new Error("این نام کاربری قبلاً استفاده شده است.");
  }

  const newUser: UserData = {
    id: uuidv4(),
    username,
    password,
  };

  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("خطا در ایجاد حساب کاربری.");
  }

  const token = `mock-token-${newUser.id}-${Date.now()}`;
  return { username: newUser.username, token, userId: newUser.id };
}

export async function getCart(userId: string): Promise<CartItem[] | null> {
  const response = await fetch(`${API_URL}/carts?userId=${userId}`);
  if (!response.ok) {
    return null;
  }
  const carts = await response.json();
  return carts.length > 0 ? carts[0].items : null;
}

export async function saveCart(userId: string, items: CartItem[]) {
  const checkCartResponse = await fetch(`${API_URL}/carts?userId=${userId}`);
  const existingCarts = await checkCartResponse.json();

  if (existingCarts.length > 0) {
    // If cart exists, update it
    const cartId = existingCarts[0].id;
    await fetch(`${API_URL}/carts/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items }),
    });
  } else {
    // If cart doesn't exist, create a new one
    await fetch(`${API_URL}/carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, items }),
    });
  }
}
