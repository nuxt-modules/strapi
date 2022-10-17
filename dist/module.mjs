import { fileURLToPath } from 'url';
import { defu } from 'defu';
import { resolve } from 'pathe';
import { defineNuxtModule, addPlugin, extendViteConfig } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "@nuxtjs/strapi",
    configKey: "strapi",
    compatibility: {
      nuxt: "^3.0.0-rc.8"
    }
  },
  defaults: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
    prefix: "/api",
    version: "v4",
    cookie: {},
    auth: {},
    cookieName: "strapi_jwt"
  },
  setup(options, nuxt) {
    if (!options.url) {
      throw new Error("Missing `STRAPI_URL` in `.env`");
    }
    nuxt.options.runtimeConfig.public.strapi = defu(nuxt.options.runtimeConfig.public.strapi, {
      url: options.url,
      prefix: options.prefix,
      version: options.version,
      cookie: options.cookie,
      auth: options.auth,
      cookieName: options.cookieName
    });
    nuxt.options.runtimeConfig.strapi = defu(nuxt.options.runtimeConfig.strapi, {
      url: options.url,
      prefix: options.prefix,
      version: options.version,
      cookie: options.cookie,
      auth: options.auth,
      cookieName: options.cookieName
    });
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);
    addPlugin(resolve(runtimeDir, "strapi.plugin"));
    nuxt.hook("imports:dirs", (dirs) => {
      dirs.push(resolve(runtimeDir, "composables"));
      dirs.push(resolve(runtimeDir, `composables-${options.version}`));
    });
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.include.push("qs");
    });
  }
});

export { module as default };
