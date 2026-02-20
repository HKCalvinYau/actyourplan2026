/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type D1Database = import('@cloudflare/workers-types').D1Database;
type Locale = import('./lib/i18n').Locale;

declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
      };
    };
    locale: Locale;
  }
}

