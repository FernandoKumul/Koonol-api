import express from 'express';

declare module 'express' {
  interface Request {
    user?: {
      userId: string;
      userName: string;
      rolId: string;
      rolName: string;
    };
  }
}