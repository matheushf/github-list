import '@testing-library/jest-dom';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(__dirname, `../.env.${process.env.ENV}`);
dotenv.config({ path: envPath });

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };

const consoleMocks = {
  log: console.log,
  error: jest.fn(),
  table: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
};

(global as any).console = consoleMocks;
